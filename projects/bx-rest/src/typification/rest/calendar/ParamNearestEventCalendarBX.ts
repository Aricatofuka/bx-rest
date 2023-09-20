import { BXRestCalendarType } from './base/type'

export interface ParamNearestEventCalendarBX {
  type: BXRestCalendarType	// Тип календаря
  ownerId?: number, //	Идентификатор владельца календаря
  days?: number, // Число дней для выборки (по умолчанию - 60).
  forCurrentUser?: boolean // Вывод списка событий для текущего пользователя.
  maxEventsCount?: number, // Максимальное число выводимых событий.
  detailUrl?: string	// url для календаря.
}
