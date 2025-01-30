import { iBXRestYesNo } from '../../base/yes-no'

export interface iBXRestCalendarEventAddParam {
  type:
    /**
     * календарь пользователя
     */
    'user'
    /**
     * календарь группы
     */
    | 'group'
    /**
     * календарь компании
     */
    | 'company_calendar'
  /**
   * Для календаря компании параметр ownerId имеет пустое значение ""
   */
  ownerId: number
  /**
   * Дата и время начала события.
   *
   * Можно указать дату без времени. Для этого передайте значение Y в параметре skip_time
   */
  from: Date
  /**
   * Дата окончания события.
   *
   * Можно указать дату без времени. Для этого передайте значение Y в параметре skip_time
   */
  to: Date
  /**
   * Дата и время в формате timestamp. Можно использовать вместо параметра from
   */
  from_ts?: number
  /**
   * Дата и время в формате timestamp. Можно использовать вместо параметра to
   */
  to_ts?: number
  /**
   * Идентификатор календаря
   */
  section: number
  /**
   * Название события
   */
  name: string
  /**
   * Передать значение даты без времени в параметрах from и to. Возможные значения:
   *
   * Y — использовать только дату
   * N — использовать дату и время
   * Формат даты по стандарту ISO-8601
   */
  skip_time?: iBXRestYesNo
  /**
   * Часовой пояс даты и времени начала события. По умолчанию — таймзона текущего пользователя.
   *
   * Значение нужно передавать в виде строки, например, Europe/Riga
   */
  timezone_from?: string
  /**
   * Часовой пояс даты и времени окончания события. Значение по умолчанию — таймзона текущего пользователя.
   *
   * Значение нужно передавать в виде строки, например, Europe/Riga
   */
  timezone_to?: string
  /**
   * Описание события
   */
  description?: string
  /**
   * Цвет фона события.
   *
   * Cимвол # в цвете необходимо передавать в формате unicode — %23
   */
  color?: string
  /**
   * Цвет текста события.
   *
   * Cимвол # в цвете необходимо передавать в формате unicode — %23
   */
  text_color?: string
  /**
   * Доступность на время события
   */
  accessibility?:
  /**
   * Занят
   */
    'busy'
    /**
     * Отсутствую
     */
    | 'absent'
    /**
     * Под вопросом
     */
    | 'quest'
    /**
     * Свободен
     */
    | 'free'
  /**
   * Важность события
   */
  importance?:
    'high'
    | 'normal'
    | 'low'
  /**
   * Отметка, что событие частное.
   */
  private_event?: iBXRestYesNo
  /**
   * Повторяемость события в виде объекта в терминах стандарта iCalendar.
   * Подробнее тут https://apidocs.bitrix24.ru/api-reference/calendar/calendar-event/calendar-event-add.html#rrule
   */
  rrule?: string
  is_meeting?: iBXRestYesNo
  location?: string
  /**
   * Список идентификаторов участников события. Если is_meeting = Y
   *
   * Подробнее тут https://apidocs.bitrix24.ru/api-reference/calendar/calendar-event/calendar-event-add.html#remind
   */
  remind?: { type: 'min' | 'hour' | 'day', count: number }[]
  /**
   * Список идентификаторов участников события. Если is_meeting = Y
   */
  attendees?: number[]
  /**
   * Идентификатор организатора события. Если is_meeting = Y
   */
  host?: number
  /**
   * Объект с параметрами встречи
   */
  meeting?: {
    text?: string
    open?: boolean
    notify?: boolean
    reinvite?: boolean
  }
}