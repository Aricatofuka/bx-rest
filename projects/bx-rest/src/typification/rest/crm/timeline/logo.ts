import { iBXRestCrmTimelineMedia } from './common'

/** Результат добавления или получения логотипа лог-записи. */
export interface iBXRestCrmTimelineLogoResult {
  logo: iBXRestCrmTimelineMedia
}

/** Результат получения списка доступных логотипов. */
export interface iBXRestCrmTimelineLogoListResult {
  logos: iBXRestCrmTimelineMedia[]
}
