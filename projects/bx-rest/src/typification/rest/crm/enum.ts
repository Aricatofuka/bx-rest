/** Характеристики поля, возвращаемые методами описания полей CRM. */
export interface iBXRestCrmFieldDescription {
  /** Тип данных поля. */
  type: string
  /** Является ли поле обязательным. */
  isRequired: boolean
  /** Доступно ли поле только для чтения. */
  isReadOnly: boolean
  /** Является ли поле неизменяемым. */
  isImmutable: boolean
  /** Является ли поле множественным. */
  isMultiple: boolean
  /** Является ли поле динамическим. */
  isDynamic: boolean
  /** Отображаемое название поля. */
  title: string
}

/** Описание полей стандартного элемента перечисления CRM. */
export interface iBXRestCrmEnumFields {
  ID: iBXRestCrmFieldDescription
  NAME: iBXRestCrmFieldDescription
  SYMBOL_CODE: iBXRestCrmFieldDescription
  SYMBOL_CODE_SHORT: iBXRestCrmFieldDescription
}

/** Стандартный элемент перечисления CRM. */
export interface iBXRestCrmEnumItem {
  /** Идентификатор элемента. */
  ID: number
  /** Название элемента. */
  NAME: string
  /** Символьный код, если он задан для этого перечисления. */
  SYMBOL_CODE: string | null
  /** Краткий символьный код, если он задан для этого перечисления. */
  SYMBOL_CODE_SHORT: string | null
}

/** Тип объекта, к которому можно привязать заказ. */
export interface iBXRestCrmOrderOwnerType {
  /** Атрибут типа объекта. */
  attribute: string
  /** Код типа объекта. */
  code: string
  /** Идентификатор типа объекта для `ownerTypeId` методов `crm.orderentity.*`. */
  id: number
  /** Название типа объекта. */
  name: string
}
