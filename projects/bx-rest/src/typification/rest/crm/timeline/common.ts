/** Допустимое направление сортировки в методах таймлайна CRM. */
export type iBXRestCrmTimelineSortOrder = 'ASC' | 'DESC' | 'asc' | 'desc'

/**
 * Файл для загрузки в комментарий таймлайна.
 *
 * Первый элемент — имя файла, второй — его содержимое в Base64.
 */
export type iBXRestCrmTimelineAttachedFile = [fileName: string, base64Content: string]

/** Описание пользовательской иконки или логотипа лог-записи. */
export interface iBXRestCrmTimelineMedia {
  /** Уникальный код ресурса. */
  code: string
  /** `true` для встроенного ресурса Битрикс24, `false` для добавленного приложением. */
  isSystem: boolean
  /** Путь к загруженному файлу; для системного ресурса обычно пустая строка. */
  fileUri: string
}

/** Параметр метода, принимающего код иконки или логотипа. */
export interface iBXRestParamCrmTimelineMediaGet {
  /** Код ресурса. Список кодов возвращают методы `list`. */
  code: string
}

/** Параметры добавления пользовательской иконки или логотипа. */
export interface iBXRestParamCrmTimelineMediaAdd extends iBXRestParamCrmTimelineMediaGet {
  /** Содержимое PNG-файла в Base64. */
  fileContent: string
}

/** Результат операции над дополнительными контентными блоками. */
export interface iBXRestCrmTimelineSuccessResult {
  success: true
}
