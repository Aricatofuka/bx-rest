import { iBXRestCalendarType } from '../base/type'

export interface iBXRestCalendarSectionAddParam {
  type: iBXRestCalendarType
  ownerId?: number
  name: string
  description: string
  color?: string
  text_color?: string
  access: string[]
}