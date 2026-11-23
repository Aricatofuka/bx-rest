/** Parameters for `imbot.v2.Bot.get`; identify the bot by ID or code. */
export type iBXRestParamImBotBotGet =
  | { botId: number; code?: string; botToken?: string }
  | { botId?: number; code: string; botToken?: string }

export interface iBXRestParamImBotChatGet {
  botId: number
  botToken?: string
  dialogId: string
}

export interface iBXRestParamImBotCommandList {
  botId: number
  botToken?: string
}

export interface iBXRestParamImBotEventGet {
  botId: number
  botToken?: string
  offset?: number
  limit?: number
  withUserEvents?: boolean
}
