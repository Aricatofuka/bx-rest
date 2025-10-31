// Interfaces for IM counters response
export interface iBXRestImCountersType {
  ALL: number
  CHAT: number
  DIALOG: number
  LINES: number
  NOTIFY: number
}

export interface iBXRestImCounters {
  CHAT: Record<string, number>
  DIALOG: Record<string, number>
  LINES: Record<string, number>
  TYPE: iBXRestImCountersType
}