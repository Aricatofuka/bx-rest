/**
 * Параметры `pull.application.push.add`.
 *
 * @see https://apidocs.bitrix24.com/settings/interactivity/pull-application-push-add.html
 */
export interface iBXRestParamPullApplicationPushAdd {
  /**
   * Получатели. По документации портал не проверяет параметр: без него метод ответит успехом,
   * но уведомление никуда не уйдёт. Поэтому в типе он обязательный.
   */
  USER_ID: number | string | number[]
  /** Текст уведомления, до 4 КБ. Пустой текст или `0` портал отклонит с ошибкой `TEXT_ERROR`. */
  TEXT: string
  /** Абсолютный адрес картинки для уведомления. */
  AVATAR?: string
}
