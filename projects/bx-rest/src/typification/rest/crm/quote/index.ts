import { iBXRestPagination } from '../../base/api-pagination-bx'
import { iBXRestYesNo } from '../../base/yes-no'

export type iBXRestCrmQuoteSortDirection = 'ASC' | 'DESC' | 'asc' | 'desc'

/** Поля коммерческого предложения, принимаемые методами добавления и изменения. */
export interface iBXRestCrmQuoteFields extends Record<string, any> {
  /** Тема предложения. Для crm.quote.add поле обязательно. Максимум 255 символов. */
  TITLE?: string
  /** Стадия предложения из справочника QUOTE_STATUS. */
  STATUS_ID?: string
  /** Валюта суммы предложения. */
  CURRENCY_ID?: string
  /** Сумма предложения. */
  OPPORTUNITY?: number
  /** Идентификатор ответственного. */
  ASSIGNED_BY_ID?: number
  /** Идентификатор компании-клиента. */
  COMPANY_ID?: number
  /** Идентификаторы контактов клиента. При обновлении массив заменяется целиком. */
  CONTACT_IDS?: number[]
  /** Идентификатор своей компании, реквизиты которой используются как реквизиты продавца. */
  MYCOMPANY_ID?: number
  /** Доступно ли предложение всем пользователям. */
  OPENED?: iBXRestYesNo
  /** Идентификатор типа плательщика. */
  PERSON_TYPE_ID?: number
  /** Дата выставления предложения. */
  BEGINDATE?: Date | string
  /** Срок действия предложения. */
  CLOSEDATE?: Date | string
  /** Название клиента. Максимум 255 символов. */
  CLIENT_TITLE?: string
  /** Адрес клиента. Максимум 255 символов. */
  CLIENT_ADDR?: string
  /** Email клиента. Максимум 255 символов. */
  CLIENT_EMAIL?: string
  /** Телефон клиента. Максимум 255 символов. */
  CLIENT_PHONE?: string
  /** Комментарий. */
  COMMENTS?: string
}

export interface iBXRestParamCrmQuoteAdd {
  /** Поля нового предложения. TITLE является обязательным полем API. */
  fields: iBXRestCrmQuoteFields & { TITLE: string }
  params?: {
    /** Разрешает передавать системные поля импорта: DATE_CREATE, DATE_MODIFY и авторов. */
    IMPORT?: iBXRestYesNo
  }
}

export interface iBXRestParamCrmQuoteUpdate {
  /** Идентификатор предложения. */
  id: number | string
  /** Только изменяемые поля. */
  fields?: iBXRestCrmQuoteFields
  params?: {
    /** Создавать ли запись в истории изменений. По умолчанию Y. */
    REGISTER_HISTORY_EVENT?: iBXRestYesNo
  }
}

export interface iBXRestParamCrmQuoteGet {
  /** Идентификатор предложения. */
  id: number | string
}

export type iBXRestParamCrmQuoteDelete = iBXRestParamCrmQuoteGet

export interface iBXRestParamCrmQuoteList extends iBXRestPagination {
  /** Поля ответа. Поддерживаются маски `*` и `UF_*`. */
  select?: string[]
  /** Фильтр. В именах полей поддерживаются операторы =, !=, >, >=, <, <=, @, !@ и %. */
  filter?: Record<string, any>
  /** Порядок сортировки по полям. */
  order?: Record<string, iBXRestCrmQuoteSortDirection>
}

interface iBXRestCrmQuoteBase extends Record<string, any> {
  TITLE?: string
  STATUS_ID?: string
  CURRENCY_ID?: string
  QUOTE_NUMBER?: string
  COMMENTS?: string
  CONTENT?: string
  TERMS?: string
  CLIENT_TITLE?: string
  CLIENT_ADDR?: string
  CLIENT_CONTACT?: string
  CLIENT_EMAIL?: string
  CLIENT_PHONE?: string
  UTM_SOURCE?: string
  UTM_MEDIUM?: string
  UTM_CAMPAIGN?: string
  UTM_CONTENT?: string
  UTM_TERM?: string
}

/** Коммерческое предложение в локальном формате библиотеки. */
export interface iBXRestCrmQuote extends iBXRestCrmQuoteBase {
  ID: number
  OPPORTUNITY?: number
  TAX_VALUE?: number
  COMPANY_ID?: number
  CONTACT_ID?: number
  MYCOMPANY_ID?: number
  ASSIGNED_BY_ID?: number
  CREATED_BY_ID?: number
  MODIFY_BY_ID?: number
  LEAD_ID?: number
  DEAL_ID?: number
  PERSON_TYPE_ID?: number
  LOCATION_ID?: number
  LAST_ACTIVITY_BY?: number
  BEGINDATE?: Date
  CLOSEDATE?: Date
  ACTUAL_DATE?: Date
  DATE_CREATE?: Date
  DATE_MODIFY?: Date
  LAST_COMMUNICATION_TIME?: Date
  LAST_ACTIVITY_TIME?: Date
  OPENED?: boolean
  CLOSED?: boolean
}

/** Коммерческое предложение в формате ответа Bitrix24. */
export interface iBXRestCrmQuoteHttp extends iBXRestCrmQuoteBase {
  ID: string
  OPPORTUNITY?: string
  TAX_VALUE?: string
  COMPANY_ID?: string
  CONTACT_ID?: string
  MYCOMPANY_ID?: string
  ASSIGNED_BY_ID?: string
  CREATED_BY_ID?: string
  MODIFY_BY_ID?: string
  LEAD_ID?: string
  DEAL_ID?: string
  PERSON_TYPE_ID?: string
  LOCATION_ID?: string
  LAST_ACTIVITY_BY?: string
  BEGINDATE?: string
  CLOSEDATE?: string
  ACTUAL_DATE?: string
  DATE_CREATE?: string
  DATE_MODIFY?: string
  LAST_COMMUNICATION_TIME?: string
  LAST_ACTIVITY_TIME?: string
  OPENED?: iBXRestYesNo
  CLOSED?: iBXRestYesNo
}

export type iBXRestParamCrmQuoteProductRowsGet = iBXRestParamCrmQuoteGet

/** Товарная позиция, передаваемая в crm.quote.productrows.set. */
export interface iBXRestCrmQuoteProductRowInput {
  /** Идентификатор товара каталога. 0 означает произвольную позицию. */
  PRODUCT_ID?: number
  /** Наименование товарной позиции. */
  PRODUCT_NAME?: string
  /** Описание товарной позиции. */
  PRODUCT_DESCRIPTION?: string
  /** Итоговая стоимость единицы товара. */
  PRICE?: number
  /** Количество. */
  QUANTITY?: number
  /** Тип скидки: 1 — абсолютная, 2 — процентная. */
  DISCOUNT_TYPE_ID?: 1 | 2
  /** Скидка в процентах. */
  DISCOUNT_RATE?: number
  /** Абсолютная сумма скидки. */
  DISCOUNT_SUM?: number
  /** Ставка налога в процентах. */
  TAX_RATE?: number
  /** Включен ли налог в стоимость. */
  TAX_INCLUDED?: iBXRestYesNo
  /** Код единицы измерения. */
  MEASURE_CODE?: number
  /** Название единицы измерения. */
  MEASURE_NAME?: string
  /** Индекс сортировки. */
  SORT?: number
}

export interface iBXRestParamCrmQuoteProductRowsSet {
  /** Идентификатор предложения. */
  id: number | string
  /** Новый полный набор товарных позиций. Пустой массив удаляет все позиции. */
  rows?: iBXRestCrmQuoteProductRowInput[]
}

/** Товарная позиция предложения в локальном формате библиотеки. */
export interface iBXRestCrmQuoteProductRow extends Omit<iBXRestCrmQuoteProductRowInput, 'TAX_INCLUDED'> {
  ID: number
  OWNER_ID: number
  OWNER_TYPE: 'Q'
  ORIGINAL_PRODUCT_NAME?: string
  PRICE_EXCLUSIVE?: number
  PRICE_NETTO?: number
  PRICE_BRUTTO?: number
  PRICE_ACCOUNT?: string
  TAX_INCLUDED?: boolean
  CUSTOMIZED?: boolean
  XML_ID?: string
  TYPE?: number
  STORE_ID?: number
  RESERVE_ID?: number
  DATE_RESERVE_END?: Date
  RESERVE_QUANTITY?: number
}

/** Товарная позиция в необработанном формате ответа Bitrix24. */
export interface iBXRestCrmQuoteProductRowHttp extends Omit<iBXRestCrmQuoteProductRow, 'ID' | 'OWNER_ID' | 'CUSTOMIZED' | 'DATE_RESERVE_END' | 'TAX_INCLUDED'> {
  ID: string
  OWNER_ID: string
  CUSTOMIZED?: iBXRestYesNo
  TAX_INCLUDED?: iBXRestYesNo
  DATE_RESERVE_END?: string
}

export type iBXRestCrmQuoteUserFieldType =
  | 'string' | 'integer' | 'double' | 'boolean' | 'datetime' | 'date'
  | 'money' | 'url' | 'address' | 'enumeration' | 'file' | 'employee'
  | 'crm_status' | 'iblock_section' | 'iblock_element' | 'crm'
  | (string & {})

export type iBXRestCrmQuoteUserFieldLangMap = Record<string, string>
export type iBXRestCrmQuoteUserFieldLabel = string | iBXRestCrmQuoteUserFieldLangMap

export interface iBXRestCrmQuoteUserFieldEnumValue {
  /** Идентификатор существующего варианта. */
  ID?: number | string
  /** Значение варианта. */
  VALUE: string
  /** Индекс сортировки. */
  SORT?: number
  /** Является ли вариантом по умолчанию. */
  DEF?: iBXRestYesNo
  /** Внешний код. */
  XML_ID?: string
  /** Удалить существующий вариант при обновлении. */
  DEL?: iBXRestYesNo
}

/** Поля для создания пользовательского поля предложения. */
export interface iBXRestCrmQuoteUserFieldAddFields {
  /** Тип данных пользовательского поля. */
  USER_TYPE_ID: iBXRestCrmQuoteUserFieldType
  /** Уникальный код (без префикса UF_CRM_). */
  FIELD_NAME: string
  /** Название по умолчанию для всех подписей. */
  LABEL?: string
  XML_ID?: string
  LIST_FILTER_LABEL?: iBXRestCrmQuoteUserFieldLabel
  LIST_COLUMN_LABEL?: iBXRestCrmQuoteUserFieldLabel
  EDIT_FORM_LABEL?: iBXRestCrmQuoteUserFieldLabel
  ERROR_MESSAGE?: iBXRestCrmQuoteUserFieldLabel
  HELP_MESSAGE?: iBXRestCrmQuoteUserFieldLabel
  MULTIPLE?: iBXRestYesNo
  MANDATORY?: iBXRestYesNo
  SHOW_FILTER?: iBXRestYesNo
  SETTINGS?: Record<string, any>
  LIST?: iBXRestCrmQuoteUserFieldEnumValue[]
  SORT?: number
  SHOW_IN_LIST?: iBXRestYesNo
  EDIT_IN_LIST?: iBXRestYesNo
  IS_SEARCHABLE?: iBXRestYesNo
}

export interface iBXRestParamCrmQuoteUserFieldAdd {
  fields: iBXRestCrmQuoteUserFieldAddFields
}

export type iBXRestCrmQuoteUserFieldUpdateFields = Partial<Omit<iBXRestCrmQuoteUserFieldAddFields, 'USER_TYPE_ID' | 'FIELD_NAME' | 'LABEL'>>

export interface iBXRestParamCrmQuoteUserFieldUpdate {
  id: number | string
  fields: iBXRestCrmQuoteUserFieldUpdateFields
}

export interface iBXRestParamCrmQuoteUserFieldGet {
  id: number | string
}

export type iBXRestParamCrmQuoteUserFieldDelete = iBXRestParamCrmQuoteUserFieldGet

export interface iBXRestParamCrmQuoteUserFieldList {
  /** Фильтр по параметрам пользовательского поля, включая LANG. */
  filter?: Record<string, any>
  /** Сортировка по ID, FIELD_NAME, USER_TYPE_ID, XML_ID или SORT. */
  order?: Record<string, iBXRestCrmQuoteSortDirection>
}

/** Пользовательское поле предложения в локальном формате библиотеки. */
export interface iBXRestCrmQuoteUserField {
  ID: number
  ENTITY_ID: 'CRM_QUOTE'
  FIELD_NAME: string
  USER_TYPE_ID: iBXRestCrmQuoteUserFieldType
  XML_ID?: string
  SORT: number
  MULTIPLE: boolean
  MANDATORY: boolean
  SHOW_FILTER: 'N' | 'I' | 'E' | 'S'
  SHOW_IN_LIST: boolean
  EDIT_IN_LIST: boolean
  IS_SEARCHABLE: boolean
  SETTINGS?: Record<string, any>
  LIST?: iBXRestCrmQuoteUserFieldEnumValue[]
  EDIT_FORM_LABEL?: iBXRestCrmQuoteUserFieldLabel
  LIST_COLUMN_LABEL?: iBXRestCrmQuoteUserFieldLabel
  LIST_FILTER_LABEL?: iBXRestCrmQuoteUserFieldLabel
  ERROR_MESSAGE?: iBXRestCrmQuoteUserFieldLabel
  HELP_MESSAGE?: iBXRestCrmQuoteUserFieldLabel
}

/** Пользовательское поле в необработанном формате ответа Bitrix24. */
export interface iBXRestCrmQuoteUserFieldHttp extends Omit<iBXRestCrmQuoteUserField, 'ID' | 'SORT' | 'MULTIPLE' | 'MANDATORY' | 'SHOW_IN_LIST' | 'EDIT_IN_LIST' | 'IS_SEARCHABLE'> {
  ID: string
  SORT: string
  MULTIPLE: iBXRestYesNo
  MANDATORY: iBXRestYesNo
  SHOW_IN_LIST: iBXRestYesNo
  EDIT_IN_LIST: iBXRestYesNo
  IS_SEARCHABLE: iBXRestYesNo
}
