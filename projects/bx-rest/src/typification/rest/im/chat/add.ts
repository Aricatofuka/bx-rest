export interface iBXRestParamImChatAdd {
  TYPE?: 'OPEN' | 'CHAT' // по умолчанию CHAT
  TITLE?: string
  DESCRIPTION?: string
  COLOR?: string
  MESSAGE?: string
  USERS: number[]
  AVATAR?: string
  ENTITY_TYPE?: string
  ENTITY_ID?: number
  OWNER_ID?: number
}
