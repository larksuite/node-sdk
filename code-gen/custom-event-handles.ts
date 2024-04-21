interface FiledValue {
    fieldId: string
    fieldValue: string
}
interface RecordEdited {
  action: 'record_edited'
  after_value: FiledValue[]
  before_value: FiledValue[]
  record_id: string
}
interface RecordAdded {
  action: 'record_added'
  after_value: FiledValue[]
  record_id: string
}
interface RecordDeleted {
  action: 'record_deleted'
  before_value: FiledValue[]
  record_id: string
}
type RecordChanged = RecordEdited | RecordAdded | RecordDeleted
interface FeishuUser {
  open_id: string
  union_id: string
  user_id: string
}
export interface ICustomEventHandles {
    'drive.file.bitable_record_changed_v1'?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        action_list: RecordChanged[],
        file_token: string // 多维表格 token
        file_type: 'bitable', // 文件类型，即 bitable
        operator_id: FeishuUser // 操作人,
        subscriber_id_list: FeishuUser[] // 订阅的用户列表,
        table_id: string // 发生变更的数据表 ID
    }) => Promise<any> | any;
  }