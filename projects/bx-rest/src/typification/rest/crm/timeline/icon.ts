import { iBXRestCrmTimelineMedia } from './common'

/** Результат добавления или получения иконки лог-записи. */
export interface iBXRestCrmTimelineIconResult {
  icon: iBXRestCrmTimelineMedia
}

/** Результат получения списка доступных иконок. */
export interface iBXRestCrmTimelineIconListResult {
  icons: iBXRestCrmTimelineMedia[]
}
