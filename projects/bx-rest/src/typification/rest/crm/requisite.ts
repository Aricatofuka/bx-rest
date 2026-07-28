import { iBXRestPagination } from '../base/api-pagination-bx'
import { iBXRestYesNo } from '../base/yes-no'

export type iBXRestCrmRequisiteId = number | string
export type iBXRestCrmRequisiteSortDirection = 'ASC' | 'DESC' | 'asc' | 'desc'

/** Формальное описание поля, возвращаемое методами `*.fields`. */
export interface iBXRestCrmRequisiteFieldDescription extends Record<string, any> {
  type: string
  isRequired: boolean
  isReadOnly: boolean
  isImmutable: boolean
  isMultiple: boolean
  isDynamic: boolean
  title: string
}

export type iBXRestCrmRequisiteFieldsDescription =
  Record<string, iBXRestCrmRequisiteFieldDescription>

/** Значения реквизита компании или контакта. Набор `RQ_*` зависит от страны шаблона. */
export interface iBXRestCrmRequisiteFields extends Record<string, any> {
  ENTITY_TYPE_ID?: number
  ENTITY_ID?: iBXRestCrmRequisiteId
  PRESET_ID?: iBXRestCrmRequisiteId
  NAME?: string
  CODE?: string
  XML_ID?: string
  ORIGINATOR_ID?: string
  ACTIVE?: iBXRestYesNo
  ADDRESS_ONLY?: iBXRestYesNo
  SORT?: number
  RQ_NAME?: string
  RQ_FIRST_NAME?: string
  RQ_LAST_NAME?: string
  RQ_SECOND_NAME?: string
  RQ_COMPANY_ID?: string
  RQ_COMPANY_NAME?: string
  RQ_COMPANY_FULL_NAME?: string
  RQ_COMPANY_REG_DATE?: string
  RQ_DIRECTOR?: string
  RQ_ACCOUNTANT?: string
  RQ_CEO_NAME?: string
  RQ_CEO_WORK_POS?: string
  RQ_CONTACT?: string
  RQ_EMAIL?: string
  RQ_PHONE?: string
  RQ_FAX?: string
  RQ_IDENT_TYPE?: string
  RQ_IDENT_DOC?: string
  RQ_IDENT_DOC_SER?: string
  RQ_IDENT_DOC_NUM?: string
  RQ_IDENT_DOC_PERS_NUM?: string
  RQ_IDENT_DOC_DATE?: string
  RQ_IDENT_DOC_ISSUED_BY?: string
  RQ_IDENT_DOC_DEP_CODE?: string
  RQ_INN?: string
  RQ_KPP?: string
  RQ_USRLE?: string
  RQ_IFNS?: string
  RQ_OGRN?: string
  RQ_OGRNIP?: string
  RQ_OKPO?: string
  RQ_OKTMO?: string
  RQ_OKVED?: string
  RQ_EDRPOU?: string
  RQ_DRFO?: string
  RQ_KBE?: string
  RQ_IIN?: string
  RQ_BIN?: string
  RQ_ST_CERT_SER?: string
  RQ_ST_CERT_NUM?: string
  RQ_ST_CERT_DATE?: string
  RQ_VAT_PAYER?: string
  RQ_VAT_ID?: string
  RQ_VAT_CERT_SER?: string
  RQ_VAT_CERT_NUM?: string
  RQ_VAT_CERT_DATE?: string
  RQ_RESIDENCE_COUNTRY?: string
  RQ_BASE_DOC?: string
  RQ_REGON?: string
  RQ_KRS?: string
  RQ_PESEL?: string
  RQ_LEGAL_FORM?: string
  RQ_SIRET?: string
  RQ_SIREN?: string
  RQ_CAPITAL?: string
  RQ_RCS?: string
  RQ_CNPJ?: string
  RQ_STATE_REG?: string
  RQ_MNPL_REG?: string
  RQ_CPF?: string
}

export interface iBXRestCrmRequisite extends iBXRestCrmRequisiteFields {
  ID: iBXRestCrmRequisiteId
  DATE_CREATE?: string
  DATE_MODIFY?: string
  CREATED_BY_ID?: iBXRestCrmRequisiteId
  MODIFY_BY_ID?: iBXRestCrmRequisiteId
}

export interface iBXRestParamCrmRequisiteAdd {
  /** Обязательные поля нового реквизита и значения из выбранного шаблона. */
  fields: iBXRestCrmRequisiteFields & {
    ENTITY_TYPE_ID: 3 | 4
    ENTITY_ID: iBXRestCrmRequisiteId
    PRESET_ID: iBXRestCrmRequisiteId
    NAME: string
  }
}

export interface iBXRestParamCrmRequisiteUpdate {
  /** Идентификатор изменяемого реквизита. */
  id: iBXRestCrmRequisiteId
  /** Изменяемые поля, включая пользовательские `UF_CRM_*`. */
  fields: iBXRestCrmRequisiteFields
}

export interface iBXRestParamCrmRequisiteGet {
  id: iBXRestCrmRequisiteId
}

export type iBXRestParamCrmRequisiteDelete = iBXRestParamCrmRequisiteGet

export interface iBXRestParamCrmRequisiteList extends iBXRestPagination {
  /** Поля результата. Для пользовательских полей укажите нужные `UF_CRM_*` явно. */
  select?: string[]
  filter?: Record<string, any>
  order?: Record<string, iBXRestCrmRequisiteSortDirection>
}

/** Адрес CRM. Адрес уникален по сочетанию `TYPE_ID`, `ENTITY_TYPE_ID` и `ENTITY_ID`. */
export interface iBXRestCrmAddressFields extends Record<string, any> {
  TYPE_ID?: number
  ENTITY_TYPE_ID?: number
  ENTITY_ID?: iBXRestCrmRequisiteId
  ADDRESS_1?: string
  ADDRESS_2?: string
  CITY?: string
  POSTAL_CODE?: string
  REGION?: string
  PROVINCE?: string
  COUNTRY?: string
  COUNTRY_CODE?: string
  LOC_ADDR_ID?: iBXRestCrmRequisiteId
  /** Служебное поле, автоматически заполняемое Bitrix24. */
  ANCHOR_TYPE_ID?: number
  /** Служебное поле, автоматически заполняемое Bitrix24. */
  ANCHOR_ID?: iBXRestCrmRequisiteId
}

export type iBXRestCrmAddressKey = iBXRestCrmAddressFields & {
  TYPE_ID: number
  ENTITY_TYPE_ID: number
  ENTITY_ID: iBXRestCrmRequisiteId
}

export interface iBXRestParamCrmAddressAdd {
  fields: iBXRestCrmAddressKey
}

export interface iBXRestParamCrmAddressUpdate {
  /** Составной ключ адреса и новые значения его полей. */
  fields: iBXRestCrmAddressKey
}

export interface iBXRestParamCrmAddressDelete {
  /** Составной ключ удаляемого адреса. */
  fields: iBXRestCrmAddressKey
}

export interface iBXRestParamCrmAddressList extends iBXRestPagination {
  select?: string[]
  filter?: Record<string, any>
  order?: Record<string, iBXRestCrmRequisiteSortDirection>
  /** Поддерживается API адресов, хотя стандартный размер страницы равен 50. */
  limit?: number
}

/** Поля банковского реквизита. Конкретный набор `RQ_*` зависит от страны. */
export interface iBXRestCrmRequisiteBankDetailFields extends Record<string, any> {
  ENTITY_ID?: iBXRestCrmRequisiteId
  COUNTRY_ID?: iBXRestCrmRequisiteId
  NAME?: string
  CODE?: string
  XML_ID?: string
  ACTIVE?: iBXRestYesNo
  SORT?: number
  RQ_BANK_NAME?: string
  RQ_BANK_ADDR?: string
  RQ_BANK_CODE?: string
  RQ_BANK_ROUTE_NUM?: string
  RQ_BIK?: string
  RQ_CODEB?: string
  RQ_CODEG?: string
  RQ_RIB?: string
  RQ_MFO?: string
  RQ_ACC_NAME?: string
  RQ_ACC_NUM?: string
  RQ_ACC_TYPE?: string
  RQ_AGENCY_NAME?: string
  RQ_IIK?: string
  RQ_ACC_CURRENCY?: string
  RQ_COR_ACC_NUM?: string
  RQ_IBAN?: string
  IBAN?: string
  RQ_SWIFT?: string
  SWIFT?: string
  RQ_BIC?: string
  BIC?: string
  COMMENTS?: string
  ORIGINATOR_ID?: string
}

export interface iBXRestCrmRequisiteBankDetail
  extends iBXRestCrmRequisiteBankDetailFields {
  ID: iBXRestCrmRequisiteId
  DATE_CREATE?: string
  DATE_MODIFY?: string
  CREATED_BY_ID?: iBXRestCrmRequisiteId
  MODIFY_BY_ID?: iBXRestCrmRequisiteId
}

export interface iBXRestParamCrmRequisiteBankDetailAdd {
  fields: iBXRestCrmRequisiteBankDetailFields & {
    ENTITY_ID: iBXRestCrmRequisiteId
    NAME: string
  }
}

export interface iBXRestParamCrmRequisiteBankDetailUpdate {
  id: iBXRestCrmRequisiteId
  fields: iBXRestCrmRequisiteBankDetailFields
}

export type iBXRestParamCrmRequisiteBankDetailGet = iBXRestParamCrmRequisiteGet
export type iBXRestParamCrmRequisiteBankDetailDelete = iBXRestParamCrmRequisiteGet

export interface iBXRestParamCrmRequisiteBankDetailList extends iBXRestPagination {
  select?: string[]
  filter?: Record<string, any>
  order?: Record<string, iBXRestCrmRequisiteSortDirection>
}

export type iBXRestCrmRequisiteUserFieldType =
  | 'string'
  | 'integer'
  | 'double'
  | 'boolean'
  | 'datetime'
  | 'date'
  | 'money'
  | 'url'
  | 'address'
  | 'enumeration'
  | 'file'
  | 'employee'
  | 'crm_status'
  | 'iblock_section'
  | 'iblock_element'
  | 'crm'
  | (string & {})

export type iBXRestCrmRequisiteUserFieldLabel =
  string | Record<string, string>

export interface iBXRestCrmRequisiteUserFieldEnumValue extends Record<string, any> {
  ID?: iBXRestCrmRequisiteId
  VALUE: string
  SORT?: number
  DEF?: iBXRestYesNo
  XML_ID?: string
  DEL?: iBXRestYesNo
}

/** Настройки пользовательского поля реквизита. */
export interface iBXRestCrmRequisiteUserFieldFields extends Record<string, any> {
  ENTITY_ID?: 'CRM_REQUISITE'
  FIELD_NAME?: string
  USER_TYPE_ID?: iBXRestCrmRequisiteUserFieldType
  XML_ID?: string
  SORT?: number
  MULTIPLE?: iBXRestYesNo
  MANDATORY?: iBXRestYesNo
  SHOW_FILTER?: 'N' | 'I' | 'E' | 'S'
  SHOW_IN_LIST?: iBXRestYesNo
  EDIT_IN_LIST?: iBXRestYesNo
  IS_SEARCHABLE?: iBXRestYesNo
  EDIT_FORM_LABEL?: iBXRestCrmRequisiteUserFieldLabel
  LIST_COLUMN_LABEL?: iBXRestCrmRequisiteUserFieldLabel
  LIST_FILTER_LABEL?: iBXRestCrmRequisiteUserFieldLabel
  ERROR_MESSAGE?: iBXRestCrmRequisiteUserFieldLabel
  HELP_MESSAGE?: iBXRestCrmRequisiteUserFieldLabel
  LIST?: iBXRestCrmRequisiteUserFieldEnumValue[]
  SETTINGS?: Record<string, any>
}

export interface iBXRestCrmRequisiteUserField
  extends iBXRestCrmRequisiteUserFieldFields {
  ID: iBXRestCrmRequisiteId
  ENTITY_ID: 'CRM_REQUISITE'
  FIELD_NAME: string
  USER_TYPE_ID: iBXRestCrmRequisiteUserFieldType
}

export interface iBXRestParamCrmRequisiteUserFieldAdd {
  fields: iBXRestCrmRequisiteUserFieldFields & {
    ENTITY_ID: 'CRM_REQUISITE'
    FIELD_NAME: string
    USER_TYPE_ID: iBXRestCrmRequisiteUserFieldType
  }
}

export interface iBXRestParamCrmRequisiteUserFieldUpdate {
  id: iBXRestCrmRequisiteId
  fields: iBXRestCrmRequisiteUserFieldFields
}

export type iBXRestParamCrmRequisiteUserFieldGet = iBXRestParamCrmRequisiteGet
export type iBXRestParamCrmRequisiteUserFieldDelete = iBXRestParamCrmRequisiteGet

export interface iBXRestParamCrmRequisiteUserFieldList {
  filter?: Record<string, any>
  order?: Record<string, iBXRestCrmRequisiteSortDirection>
}

/** Связь реквизитов покупателя и продавца с объектом CRM. */
export interface iBXRestCrmRequisiteLinkFields extends Record<string, any> {
  ENTITY_TYPE_ID: number | string
  ENTITY_ID: iBXRestCrmRequisiteId
  REQUISITE_ID?: iBXRestCrmRequisiteId
  BANK_DETAIL_ID?: iBXRestCrmRequisiteId
  MC_REQUISITE_ID?: iBXRestCrmRequisiteId
  MC_BANK_DETAIL_ID?: iBXRestCrmRequisiteId
}

export interface iBXRestParamCrmRequisiteLinkRegister {
  fields: iBXRestCrmRequisiteLinkFields
}

export interface iBXRestParamCrmRequisiteLinkGet {
  entityTypeId: number
  entityId: iBXRestCrmRequisiteId
}

export type iBXRestParamCrmRequisiteLinkUnregister =
  iBXRestParamCrmRequisiteLinkGet

export interface iBXRestParamCrmRequisiteLinkList {
  filter?: Record<string, any>
  order?: Record<string, iBXRestCrmRequisiteSortDirection>
}

/** Поля шаблона реквизитов. */
export interface iBXRestCrmRequisitePresetFields extends Record<string, any> {
  ENTITY_TYPE_ID?: 8
  COUNTRY_ID?: iBXRestCrmRequisiteId
  NAME?: string
  XML_ID?: string
  ACTIVE?: iBXRestYesNo
  SORT?: number
}

export interface iBXRestCrmRequisitePreset
  extends iBXRestCrmRequisitePresetFields {
  ID: iBXRestCrmRequisiteId
  DATE_CREATE?: string
  DATE_MODIFY?: string
  CREATED_BY_ID?: iBXRestCrmRequisiteId
  MODIFY_BY_ID?: iBXRestCrmRequisiteId
}

export interface iBXRestCrmRequisitePresetCountry {
  ID: number
  CODE: string
  TITLE: string
}

export interface iBXRestParamCrmRequisitePresetAdd {
  fields: iBXRestCrmRequisitePresetFields & {
    ENTITY_TYPE_ID: 8
    COUNTRY_ID: iBXRestCrmRequisiteId
    NAME: string
  }
}

export interface iBXRestParamCrmRequisitePresetUpdate {
  id: iBXRestCrmRequisiteId
  fields: iBXRestCrmRequisitePresetFields
}

export type iBXRestParamCrmRequisitePresetGet = iBXRestParamCrmRequisiteGet
export type iBXRestParamCrmRequisitePresetDelete = iBXRestParamCrmRequisiteGet

export interface iBXRestParamCrmRequisitePresetList extends iBXRestPagination {
  select?: string[]
  filter?: Record<string, any>
  order?: Record<string, iBXRestCrmRequisiteSortDirection>
}

export interface iBXRestCrmRequisitePresetReference {
  ID: iBXRestCrmRequisiteId
}

/** Настраиваемое поле внутри конкретного шаблона реквизитов. */
export interface iBXRestCrmRequisitePresetFieldFields extends Record<string, any> {
  FIELD_NAME?: string
  FIELD_TITLE?: string
  SORT?: number
  /** Устаревшее поле, сохраненное Bitrix24 для обратной совместимости. */
  IN_SHORT_LIST?: iBXRestYesNo
}

export interface iBXRestCrmRequisitePresetField
  extends iBXRestCrmRequisitePresetFieldFields {
  ID: iBXRestCrmRequisiteId
  FIELD_NAME: string
}

export interface iBXRestParamCrmRequisitePresetFieldAdd {
  preset: iBXRestCrmRequisitePresetReference
  fields: iBXRestCrmRequisitePresetFieldFields & {
    FIELD_NAME: string
  }
}

export interface iBXRestParamCrmRequisitePresetFieldUpdate {
  ID: iBXRestCrmRequisiteId
  preset: iBXRestCrmRequisitePresetReference
  fields: iBXRestCrmRequisitePresetFieldFields
}

export interface iBXRestParamCrmRequisitePresetFieldGet {
  ID: iBXRestCrmRequisiteId
  preset: iBXRestCrmRequisitePresetReference
}

export type iBXRestParamCrmRequisitePresetFieldDelete =
  iBXRestParamCrmRequisitePresetFieldGet

export interface iBXRestParamCrmRequisitePresetFieldList {
  preset: iBXRestCrmRequisitePresetReference
}

export type iBXRestParamCrmRequisitePresetFieldAvailableToAdd =
  iBXRestParamCrmRequisitePresetFieldList
