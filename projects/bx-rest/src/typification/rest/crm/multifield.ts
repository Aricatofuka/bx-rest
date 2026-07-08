import { iBXRestCrmFieldDescription } from './enum'

/** Описание полей элемента множественного поля CRM. */
export interface iBXRestCrmMultifieldFields {
  /** Идентификатор элемента множественного поля. */
  ID: iBXRestCrmFieldDescription
  /** Тип поля: телефон, email, мессенджер и другие. */
  TYPE_ID: iBXRestCrmFieldDescription
  /** Значение поля. */
  VALUE: iBXRestCrmFieldDescription
  /** Тип значения, например рабочий или мобильный телефон. */
  VALUE_TYPE: iBXRestCrmFieldDescription
}
