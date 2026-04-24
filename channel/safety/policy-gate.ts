import type {
    BotIdentity,
    NormalizedMessage,
    PolicyConfig,
    RejectReason,
} from '../types';

export interface PolicyDecision {
    allowed: boolean;
    reason?: RejectReason;
}

export class PolicyGate {
    private cfg: PolicyConfig;

    private bot?: BotIdentity;

    constructor(cfg: PolicyConfig | undefined, bot?: BotIdentity) {
        this.cfg = { ...(cfg ?? {}) };
        this.bot = bot;
    }

    evaluate(msg: NormalizedMessage): PolicyDecision {
        if (msg.chatType === 'group') return this.evaluateGroup(msg);
        return this.evaluateDm(msg);
    }

    private evaluateGroup(msg: NormalizedMessage): PolicyDecision {
        const allow = this.cfg.groupAllowlist;
        if (allow && allow.length > 0 && !allow.includes(msg.chatId)) {
            return { allowed: false, reason: 'group_not_allowed' };
        }
        const requireMention = this.cfg.requireMention ?? true;
        if (requireMention && !msg.mentionedBot) {
            return { allowed: false, reason: 'no_mention' };
        }
        if (msg.mentionAll && !(this.cfg.respondToMentionAll ?? false)) {
            return { allowed: false, reason: 'mention_all_blocked' };
        }
        return { allowed: true };
    }

    private evaluateDm(msg: NormalizedMessage): PolicyDecision {
        const mode = this.cfg.dmMode ?? 'open';
        if (mode === 'disabled') {
            return { allowed: false, reason: 'dm_disabled' };
        }
        if (mode === 'allowlist') {
            const allow = this.cfg.dmAllowlist ?? [];
            if (!allow.includes(msg.senderId)) {
                return { allowed: false, reason: 'sender_not_allowed' };
            }
        }
        // 'pair' mode is reserved for a future iteration; treat as open for now.
        return { allowed: true };
    }

    updateConfig(partial: Partial<PolicyConfig>): void {
        this.cfg = { ...this.cfg, ...partial };
    }

    getConfig(): Readonly<PolicyConfig> {
        return this.cfg;
    }

    setBotIdentity(bot: BotIdentity): void {
        this.bot = bot;
    }

    getBotIdentity(): BotIdentity | undefined {
        return this.bot;
    }
}
