import { iBXRestPagination } from '../base/api-pagination-bx'
import { iBXRestYesNo } from '../base/yes-no'

export type iBXRestCrmObject = Record<string, unknown>
export type iBXRestCrmFields = Record<string, unknown>
export type iBXRestCrmParams = Record<string, unknown>

/**
 * Тип поля в ответе `crm.item.fields`. Портал может вернуть и другой тип,
 * например зарегистрированный приложением через `userfieldtype.add`.
 */
export type iBXRestCrmItemFieldType =
  | 'integer'
  | 'double'
  | 'string'
  | 'text'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'money'
  | 'url'
  | 'address'
  | 'file'
  | 'location'
  | 'user'
  | 'employee'
  | 'enumeration'
  | 'iblock_section'
  | 'iblock_element'
  | 'crm'
  | 'crm_status'
  | 'crm_category'
  | 'crm_currency'
  | 'crm_company'
  | 'crm_contact'
  | 'crm_lead'
  | 'crm_deal'
  | 'crm_quote'
  | 'crm_entity'
  | 'crm_multifield'
  | (string & {})

/** Настройки поля. Состав зависит от типа, поэтому описан только ключ, который задокументирован. */
export interface iBXRestCrmItemFieldSettings {
  /** У поля связи — `entityTypeId` родителя (`parentId1098` → 1098, `companyId` → 4). */
  parentEntityTypeId?: number
  [setting: string]: unknown
}

/** Описание одного поля элемента CRM. */
export interface iBXRestCrmItemField {
  type: iBXRestCrmItemFieldType
  title: string
  isRequired: boolean
  isReadOnly: boolean
  isImmutable: boolean
  isMultiple: boolean
  isDynamic: boolean
  upperName: string
  settings?: iBXRestCrmItemFieldSettings
  /** У поля `crm_status` — справочник значений для `crm.status.list`, например `DYNAMIC_1268_STAGE_52`. */
  statusType?: string
  isDeprecated?: boolean
}

/** Ответ `crm.item.fields`. Ключ — идентификатор поля. */
export interface iBXRestCrmItemFieldsResult {
  fields: Record<string, iBXRestCrmItemField>
}

/**
 * Элемент CRM в методах `crm.item.*`. Описаны поля, общие для типов объектов; какие из них придут,
 * зависит от типа объекта, настроек смарт-процесса и `select`. Остальное, включая `parentId<entityTypeId>`
 * и пользовательские поля `ufCrm...`, доступно по индексу: их набор у каждого портала свой.
 *
 * Значения приходят как есть: `stageId` — код стадии, `companyId` — идентификатор, поле типа `money` —
 * строка `1500.00|RUB`. Названия нужно получать отдельно.
 */
export interface iBXRestCrmItem {
  /** В `crm.item.list` при заданном `select` приходит, только если указан в нём. */
  id?: number
  xmlId?: string
  /** Нет у контактов: у них имя в `name`, `secondName` и `lastName`. */
  title?: string
  /** Есть только у лидов и контактов, как и `secondName` и `lastName`. Незаполненное значение приходит как `null`. */
  name?: string | null
  secondName?: string | null
  lastName?: string | null
  assignedById?: number
  createdBy?: number
  updatedBy?: number
  movedBy?: number
  createdTime?: string
  updatedTime?: string
  movedTime?: string
  categoryId?: number
  stageId?: string
  previousStageId?: string
  begindate?: string
  closedate?: string
  /** У контактов устарел, там нужен `companyIds`. */
  companyId?: number
  /** Есть только у контактов. */
  companyIds?: number[]
  /** @deprecated Используйте `contactIds`. */
  contactId?: number
  contactIds?: number[]
  opportunity?: number
  taxValue?: number
  currencyId?: string
  observers?: number[]
  [field: string]: unknown
}

/** Ответ `crm.item.add`, `crm.item.get` и `crm.item.update`. `select` у них нет, поэтому `id` приходит всегда. */
export interface iBXRestCrmItemResult {
  item: iBXRestCrmItem & { id: number }
}

/**
 * Смарт-процесс в методах `crm.type.*`. Остальное, например `relations` и `linkedUserFields`
 * в ответе `crm.type.get`, доступно по индексу.
 */
export interface iBXRestCrmType {
  id: number
  title: string
  code?: string
  entityTypeId: number
  customSectionId?: number | null
  isCategoriesEnabled?: iBXRestYesNo
  isStagesEnabled?: iBXRestYesNo
  isBeginCloseDatesEnabled?: iBXRestYesNo
  isClientEnabled?: iBXRestYesNo
  isUseInUserfieldEnabled?: iBXRestYesNo
  isLinkWithProductsEnabled?: iBXRestYesNo
  isMycompanyEnabled?: iBXRestYesNo
  isDocumentsEnabled?: iBXRestYesNo
  isSourceEnabled?: iBXRestYesNo
  isObserversEnabled?: iBXRestYesNo
  isRecyclebinEnabled?: iBXRestYesNo
  isAutomationEnabled?: iBXRestYesNo
  isBizProcEnabled?: iBXRestYesNo
  isSetOpenPermissions?: iBXRestYesNo
  isPaymentsEnabled?: iBXRestYesNo
  isCountersEnabled?: iBXRestYesNo
  createdBy?: number
  updatedBy?: number
  createdTime?: string
  updatedTime?: string
  [field: string]: unknown
}

/** Ответ `crm.type.add`, `crm.type.get`, `crm.type.getByEntityTypeId` и `crm.type.update`. */
export interface iBXRestCrmTypeResult {
  type: iBXRestCrmType
}

export interface iBXRestParamCrmEntityType {
  entityTypeId: number
}

export interface iBXRestParamCrmTypeId {
  id: number
}

export interface iBXRestParamCrmTypeAdd {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmTypeUpdate extends iBXRestParamCrmTypeId {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmTypeList extends iBXRestPagination {
  order?: Record<string, 'ASC' | 'DESC'>
  filter?: iBXRestCrmFields
}

export interface iBXRestParamCrmCategoryId extends iBXRestParamCrmEntityType {
  id: number
}

export interface iBXRestParamCrmCategoryAdd extends iBXRestParamCrmEntityType {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmCategoryUpdate extends iBXRestParamCrmCategoryId {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmCategoryList extends iBXRestParamCrmEntityType, iBXRestPagination {
  order?: Record<string, 'ASC' | 'DESC'>
  filter?: iBXRestCrmFields
}

export interface iBXRestParamCrmItemId extends iBXRestParamCrmEntityType {
  id: number
  useOriginalUfNames?: 'Y' | 'N'
}

export interface iBXRestParamCrmItemFields extends iBXRestParamCrmEntityType {
  fields: iBXRestCrmFields
  useOriginalUfNames?: 'Y' | 'N'
}

export interface iBXRestParamCrmItemUpdate extends iBXRestParamCrmItemId {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmItemList extends iBXRestParamCrmEntityType, iBXRestPagination {
  select?: string[]
  filter?: iBXRestCrmFields
  order?: Record<string, 'ASC' | 'DESC'>
  useOriginalUfNames?: 'Y' | 'N'
}

export interface iBXRestParamCrmItemImport extends iBXRestParamCrmEntityType {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmItemBatchImport extends iBXRestParamCrmEntityType {
  items: iBXRestCrmFields[]
}
