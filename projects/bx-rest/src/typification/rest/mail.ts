/** Parameters for mail methods that return a single item. */
export type iBXRestMailMailboxSelect =
  | 'id'
  | 'name'
  | 'email'
  | 'senderName'
  | (string & {})

export type iBXRestMailRecipientSelect =
  | 'id'
  | 'email'
  | 'name'
  | (string & {})

export type iBXRestMailMessageSelect =
  | 'id'
  | 'mailboxId'
  | 'mailboxEmail'
  | 'subject'
  | 'from'
  | 'to'
  | 'cc'
  | 'date'
  | 'isSeen'
  | 'hasAttachments'
  | 'url'
  | 'bindings'
  | 'body'
  | (string & {})

export interface iBXRestParamMailGet<TSelect extends string = string> {
  id: number
  select?: TSelect[]
}

/** Parameters for mail field-description methods. */
export type iBXRestMailFieldSelect =
  | 'name'
  | 'type'
  | 'title'
  | 'description'
  | 'validationRules'
  | 'requiredGroups'
  | 'filterable'
  | 'sortable'
  | 'editable'
  | 'multiple'
  | 'elementType'
  | (string & {})

export interface iBXRestParamMailFieldGet<
  TName extends string = string,
  TSelect extends string = string
> {
  name: TName
  select?: TSelect[]
}
