import { normalizeBotAdded } from '../bot-added';
import { normalizeCardAction } from '../card-action';
import { normalizeComment } from '../comment';
import { normalizeReaction } from '../reaction';

describe('normalizeCardAction', () => {
    test('real payload: ids nested in context', () => {
        const r = normalizeCardAction({
            context: { open_message_id: 'om_1', open_chat_id: 'oc_1' },
            operator: { open_id: 'ou_alice', union_id: 'on_a' },
            action: { value: { action: 'approve' }, tag: 'button' },
        });
        expect(r).not.toBeNull();
        expect(r!.messageId).toBe('om_1');
        expect(r!.chatId).toBe('oc_1');
        expect(r!.operator.openId).toBe('ou_alice');
        expect(r!.action.tag).toBe('button');
    });

    test('legacy fallback: ids at top level', () => {
        const r = normalizeCardAction({
            open_message_id: 'om_1',
            open_chat_id: 'oc_1',
            operator: { open_id: 'ou_alice', user_id: 'u_a', name: 'Alice' },
            action: { value: { foo: 1 }, tag: 'button', name: 'approve' },
        });
        expect(r).not.toBeNull();
        expect(r!.messageId).toBe('om_1');
        expect(r!.operator.name).toBe('Alice');
    });

    test('context takes precedence over top-level', () => {
        const r = normalizeCardAction({
            open_message_id: 'om_top',
            open_chat_id: 'oc_top',
            context: { open_message_id: 'om_ctx', open_chat_id: 'oc_ctx' },
            operator: { open_id: 'ou_alice' },
            action: { tag: 'button' },
        });
        expect(r!.messageId).toBe('om_ctx');
        expect(r!.chatId).toBe('oc_ctx');
    });

    test('returns null without required fields', () => {
        expect(normalizeCardAction({ open_message_id: 'om_1' })).toBeNull();
        expect(normalizeCardAction({ context: { open_message_id: 'om_1' } })).toBeNull();
        expect(normalizeCardAction({})).toBeNull();
    });

    test('default tag when missing', () => {
        const r = normalizeCardAction({
            context: { open_message_id: 'om_1', open_chat_id: 'oc_1' },
            operator: { open_id: 'ou_alice' },
            action: {},
        });
        expect(r!.action.tag).toBe('unknown');
    });
});

describe('normalizeReaction', () => {
    test('valid added event', () => {
        const r = normalizeReaction(
            {
                message_id: 'om_1',
                reaction_type: { emoji_type: 'OK' },
                user_id: { open_id: 'ou_alice', user_id: null },
                action_time: '1000000000000',
            },
            'added'
        );
        expect(r).not.toBeNull();
        expect(r!.action).toBe('added');
        expect(r!.emojiType).toBe('OK');
        expect(r!.actionTime).toBe(1000000000000);
        expect(r!.operator.userId).toBeUndefined();
    });

    test('removed event', () => {
        const r = normalizeReaction(
            {
                message_id: 'om_1',
                reaction_type: { emoji_type: 'LIKE' },
                user_id: { open_id: 'ou_alice' },
            },
            'removed'
        );
        expect(r!.action).toBe('removed');
    });

    test('returns null without operator', () => {
        expect(
            normalizeReaction(
                { message_id: 'om_1', reaction_type: { emoji_type: 'OK' } },
                'added'
            )
        ).toBeNull();
    });

    test('returns null without emoji type', () => {
        expect(
            normalizeReaction(
                { message_id: 'om_1', user_id: { open_id: 'ou_a' } },
                'added'
            )
        ).toBeNull();
    });
});

describe('normalizeBotAdded', () => {
    test('with Chinese i18n bot name', () => {
        const r = normalizeBotAdded({
            chat_id: 'oc_new',
            operator_id: { open_id: 'ou_alice' },
            i18n_names: { zh_cn: '测试bot', en_us: 'TestBot' },
        });
        expect(r!.botName).toBe('测试bot');
    });

    test('falls back to en_us then ja_jp', () => {
        expect(
            normalizeBotAdded({
                chat_id: 'oc_new',
                operator_id: { open_id: 'ou_alice' },
                i18n_names: { en_us: 'English Only' },
            })!.botName
        ).toBe('English Only');
    });

    test('prefers top-level name', () => {
        expect(
            normalizeBotAdded({
                chat_id: 'oc_new',
                operator_id: { open_id: 'ou_alice' },
                name: 'Top Level',
                i18n_names: { zh_cn: '不用这个' },
            })!.botName
        ).toBe('Top Level');
    });

    test('null user_id normalized to undefined', () => {
        const r = normalizeBotAdded({
            chat_id: 'oc_new',
            operator_id: { open_id: 'ou_alice', user_id: null },
            name: 'Bot',
        });
        expect(r!.operator.userId).toBeUndefined();
    });

    test('returns null without chatId', () => {
        expect(normalizeBotAdded({ operator_id: { open_id: 'ou_x' } })).toBeNull();
    });
});

describe('normalizeComment', () => {
    test('from notice_meta nested shape', () => {
        const r = normalizeComment({
            file_token: 'docx_xyz',
            file_type: 'docx',
            comment_id: 'cmt_1',
            notice_meta: {
                from_user_id: { open_id: 'ou_alice', user_id: 'u_a' },
                timestamp: '1700000000000',
                is_mentioned: true,
            },
        });
        expect(r!.fileToken).toBe('docx_xyz');
        expect(r!.mentionedBot).toBe(true);
        expect(r!.timestamp).toBe(1700000000000);
        expect(r!.operator.openId).toBe('ou_alice');
    });

    test('fallback to top-level user_id + action_time', () => {
        const r = normalizeComment({
            file_token: 'docx_xyz',
            file_type: 'docx',
            comment_id: 'cmt_1',
            user_id: { open_id: 'ou_alice' },
            action_time: '1700000000000',
            is_mention: false,
        });
        expect(r!.mentionedBot).toBe(false);
        expect(r!.operator.openId).toBe('ou_alice');
    });

    test('returns null without file_token', () => {
        expect(
            normalizeComment({
                file_type: 'docx',
                comment_id: 'cmt_1',
                notice_meta: { from_user_id: { open_id: 'ou_x' } },
            })
        ).toBeNull();
    });

    test('carries replyId when present', () => {
        const r = normalizeComment({
            file_token: 'docx_xyz',
            file_type: 'docx',
            comment_id: 'cmt_1',
            reply_id: 'reply_1',
            notice_meta: { from_user_id: { open_id: 'ou_x' } },
        });
        expect(r!.replyId).toBe('reply_1');
    });

    test('real payload: top-level is_mentioned + create_time', () => {
        const r = normalizeComment({
            comment_id: '7631464082675076055',
            is_mentioned: true,
            create_time: '1776838695000',
            notice_meta: {
                file_token: 'UQmCd8FQlo3pDOxZVVrc5eNVnpf',
                file_type: 'docx',
                from_user_id: {
                    open_id: 'ou_alice',
                    union_id: 'on_alice',
                    user_id: null,
                },
                notice_type: 'add_comment',
            },
            reply_id: '7631464082695392217',
        });
        expect(r).not.toBeNull();
        expect(r!.fileToken).toBe('UQmCd8FQlo3pDOxZVVrc5eNVnpf');
        expect(r!.fileType).toBe('docx');
        expect(r!.mentionedBot).toBe(true);
        expect(r!.timestamp).toBe(1776838695000);
        expect(r!.operator.openId).toBe('ou_alice');
        expect(r!.operator.userId).toBeUndefined();
        expect(r!.replyId).toBe('7631464082695392217');
    });
});
