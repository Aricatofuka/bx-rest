/**
 * Параметры `pull.application.event.add`.
 *
 * @see https://apidocs.bitrix24.com/settings/interactivity/pull-application-event-add.html
 */
export interface iBXRestParamPullApplicationEventAdd {
  /**
   * Команда события, по ней клиент различает события. Допустимы символы
   * `A-Z`, `a-z`, `0-9`, `_`, `:`, `|`, `.`, `-`.
   */
  COMMAND: string
  /** Параметры события, поля задаёте сами. Без них клиент получит пустой `params`. */
  PARAMS?: Record<string, unknown>
  /** Модуль события, по умолчанию `application`. Допустимы символы `a-z`, `0-9`, `.`, `_`. */
  MODULE_ID?: string
  /**
   * Получатели. Без параметра событие уходит в общий канал `shared`, с ним — в личные каналы
   * `private` указанных пользователей.
   *
   * Администратор может указать любых пользователей. Остальные — только себя и только строкой,
   * например `'577'`: число или массив портал отклонит с ошибкой `USER_ID_ACCESS_ERROR`.
   */
  USER_ID?: number | string | number[]
}
