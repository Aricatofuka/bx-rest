import { iBXRestPagination } from '../base/api-pagination-bx'
import { iBXRestParamSort } from '../base/sort'
import { iBXRestYesNo } from '../base/yes-no'
import { iBXRestCrmFieldDescription } from './enum'

/** Группа стадии: успех, провал или стадия в работе. */
export type iBXRestCrmStatusSemantics = 'S' | 'F' | ''

/** Поля нового элемента справочника CRM. */
export interface iBXRestCrmStatusAddFields {
  /** Символьный идентификатор справочника, например `DEAL_STAGE` или `SOURCE`. */
  ENTITY_ID: string
  /** Уникальный в рамках справочника код значения. */
  STATUS_ID: string
  /** Отображаемое название значения. */
  NAME: string
  /** Позиция значения в справочнике. По умолчанию 10. */
  SORT?: number
  /** Цвет стадии в формате hex, например `#39A8EF`. */
  COLOR?: string
  /** Группа стадии: `S` — успех, `F` — провал, пустая строка — в работе. */
  SEMANTICS?: iBXRestCrmStatusSemantics
}

/** Изменяемые поля элемента справочника CRM. */
export interface iBXRestCrmStatusUpdateFields {
  /** Новое отображаемое название. */
  NAME?: string
  /** Новая позиция в справочнике. */
  SORT?: number
  /** Новый цвет стадии в формате hex. */
  COLOR?: string
}

/** Параметры метода `crm.status.add`. */
export interface iBXRestParamCrmStatusAdd {
  /** Поля нового элемента справочника. */
  fields: iBXRestCrmStatusAddFields
}

/** Параметры метода `crm.status.update`. */
export interface iBXRestParamCrmStatusUpdate {
  /** Числовой идентификатор изменяемого элемента. */
  id: number
  /** Изменяемые поля элемента справочника. */
  fields: iBXRestCrmStatusUpdateFields
}

/** Параметры методов, принимающих идентификатор элемента справочника. */
export interface iBXRestParamCrmStatusId {
  /** Числовой идентификатор элемента справочника. */
  id: number
}

/** Параметры метода `crm.status.get`. */
export type iBXRestParamCrmStatusGet = iBXRestParamCrmStatusId

/** Параметры метода `crm.status.delete`. */
export interface iBXRestParamCrmStatusDelete extends iBXRestParamCrmStatusId {
  params?: {
    /** Разрешает удалить системный элемент справочника. По умолчанию `N`. */
    FORCED?: iBXRestYesNo
  }
}

/** Поля элемента справочника, доступные для сортировки и фильтрации. */
export type iBXRestCrmStatusField =
  | 'ID'
  | 'ENTITY_ID'
  | 'STATUS_ID'
  | 'SORT'
  | 'NAME'
  | 'NAME_INIT'
  | 'SYSTEM'
  | 'CATEGORY_ID'
  | 'COLOR'
  | 'SEMANTICS'
  | 'EXTRA'

/** Параметры метода `crm.status.list`. */
export interface iBXRestParamCrmStatusList extends iBXRestPagination {
  /** Порядок сортировки элементов по полям справочника. */
  order?: Partial<Record<iBXRestCrmStatusField, iBXRestParamSort>>
  /** Фильтр по полям справочника, включая REST-префиксы операторов. */
  filter?: Record<string, any>
}

/** Параметры метода `crm.status.entity.items`. */
export interface iBXRestParamCrmStatusEntityItems {
  /** Символьный идентификатор справочника, например `DEAL_STAGE` или `SOURCE`. */
  entityId: string
}

/** Дополнительные данные элемента справочника. */
export interface iBXRestCrmStatusExtra extends Record<string, any> {
  /** Семантика стадии в человекочитаемом формате. */
  SEMANTICS?: string
  /** Цвет стадии в формате hex. */
  COLOR?: string
}

interface iBXRestCrmStatusBase {
  /** Символьный идентификатор справочника. */
  ENTITY_ID: string
  /** Код значения, используемый в полях элементов CRM. */
  STATUS_ID: string
  /** Отображаемое название. */
  NAME: string
  /** Исходное системное название. */
  NAME_INIT: string
  /** Цвет стадии в формате hex. */
  COLOR: string
  /** Группа стадии. */
  SEMANTICS: iBXRestCrmStatusSemantics | null
  /** Дополнительные данные элемента. */
  EXTRA?: iBXRestCrmStatusExtra
}

/** Элемент справочника CRM в локальном формате библиотеки. */
export interface iBXRestCrmStatus extends iBXRestCrmStatusBase {
  /** Числовой идентификатор элемента. */
  ID: number
  /** Позиция элемента в справочнике. */
  SORT: number
  /** Является ли элемент системным. */
  SYSTEM: boolean
  /** Идентификатор воронки для статуса-стадии. */
  CATEGORY_ID: number | null
}

/** Элемент справочника CRM в формате ответа Bitrix24. */
export interface iBXRestCrmStatusHttp extends iBXRestCrmStatusBase {
  ID: string
  SORT: string
  SYSTEM: iBXRestYesNo
  CATEGORY_ID: string | null
}

/** Краткое представление элемента, возвращаемое `crm.status.entity.items`. */
export interface iBXRestCrmStatusEntityItem {
  /** Отображаемое название. */
  NAME: string
  /** Позиция элемента в справочнике. */
  SORT: number
  /** Код значения, используемый в полях элементов CRM. */
  STATUS_ID: string
}

/** Семантические границы справочника стадий. */
export interface iBXRestCrmStatusSemanticInfo {
  /** Код начальной стадии. */
  START_FIELD: string
  /** Код успешной финальной стадии. */
  FINAL_SUCCESS_FIELD: string
  /** Код неуспешной финальной стадии. */
  FINAL_UNSUCCESS_FIELD: string
  /** Позиция финальной стадии. */
  FINAL_SORT: number
}

interface iBXRestCrmStatusEntityTypeBase {
  /** Символьный идентификатор справочника для параметра `ENTITY_ID`. */
  ID: string
  /** Отображаемое название справочника. */
  NAME: string
  /** Тип объекта CRM, к которому относится справочник стадий. */
  ENTITY_TYPE_ID?: number
  /** Семантические границы стадий; некоторые типы API возвращают пустой массив. */
  SEMANTIC_INFO?: iBXRestCrmStatusSemanticInfo | []
  /** Префикс кода стадии воронки. */
  PREFIX?: string
  /** Область применения поля, соответствующая воронке. */
  FIELD_ATTRIBUTE_SCOPE?: string
  /** Активен ли тип справочника. */
  IS_ENABLED?: boolean
  /** Идентификатор родительского справочника. */
  PARENT_ID?: string
  /** Название воронки. */
  CATEGORY_NAME?: string
  /** Позиция воронки. */
  CATEGORY_SORT?: number
  /** Является ли воронка воронкой по умолчанию. */
  IS_DEFAULT_CATEGORY?: boolean
}

/** Описание типа справочника в локальном формате библиотеки. */
export interface iBXRestCrmStatusEntityType extends iBXRestCrmStatusEntityTypeBase {
  /** Идентификатор воронки. */
  CATEGORY_ID?: number
}

/** Описание типа справочника в формате ответа Bitrix24. */
export interface iBXRestCrmStatusEntityTypeHttp extends iBXRestCrmStatusEntityTypeBase {
  CATEGORY_ID?: number | string
}

/** Описание полей, возвращаемое методом `crm.status.fields`. */
export type iBXRestCrmStatusFields = Record<iBXRestCrmStatusField, iBXRestCrmFieldDescription>
