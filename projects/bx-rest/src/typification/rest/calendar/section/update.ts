import { iBXRestCalendarType } from '../base/type'

export interface iBXRestCalendarSectionUpdateParam {
  type: iBXRestCalendarType
  ownerId?: number
  name: string
  description: string
  color?: string
  text_color?: string
  access: string[]
}