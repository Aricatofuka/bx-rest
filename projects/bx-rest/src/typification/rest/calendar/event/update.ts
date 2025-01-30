import { iBXRestCalendarEventAddParam } from './add'

type iBXRestCalendarEventAddP = Omit<iBXRestCalendarEventAddParam, 'from' | 'to' | 'section'>
  & Partial<Pick<iBXRestCalendarEventAddParam, 'from' | 'to' | 'section'>>

export interface iBXRestCalendarEventUpdateParam extends iBXRestCalendarEventAddP{
  id: number
}
