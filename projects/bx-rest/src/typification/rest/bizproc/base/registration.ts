import { iBXRestYesNo } from '../../base/yes-no'

/** Строка или набор ее локализованных вариантов. */
export type iBXRestBizprocLocalizedString = string | Record<string, string>

/**
 * Тип документа в формате `[модуль, объект, тип документа]`.
 *
 * @example ['crm', 'CCrmDocumentDeal', 'DEAL']
 */
export type iBXRestBizprocDocumentType = [
  moduleId: string,
  entity: string,
  documentType: string
]

/** Правило доступности действия или робота для документа либо редакции Битрикс24. */
export type iBXRestBizprocRegistrationFilterRule = string | string[]

/** Ограничения видимости действия или робота. */
export interface iBXRestBizprocRegistrationFilter {
  /** Правила, для которых действие или робот отображается. */
  INCLUDE?: iBXRestBizprocRegistrationFilterRule[]
  /** Правила, для которых действие или робот скрывается. */
  EXCLUDE?: iBXRestBizprocRegistrationFilterRule[]
}

/** Базовые типы параметров действия или робота. */
export type iBXRestBizprocRegistrationPropertyType =
  | 'bool'
  | 'date'
  | 'datetime'
  | 'double'
  | 'file'
  | 'int'
  | 'select'
  | 'string'
  | 'text'
  | 'user'

/** Описание входного или выходного параметра действия либо робота. */
export interface iBXRestBizprocRegistrationProperty {
  /** Отображаемое имя параметра. */
  Name: iBXRestBizprocLocalizedString
  /** Описание параметра. */
  Description?: iBXRestBizprocLocalizedString
  /** Тип данных параметра. */
  Type: iBXRestBizprocRegistrationPropertyType | string
  /** Варианты значения для параметра типа `select`. */
  Options?: Record<string, string> | string[]
  /** Является ли параметр обязательным. */
  Required?: iBXRestYesNo
  /** Допускает ли параметр несколько значений. */
  Multiple?: iBXRestYesNo
  /** Значение по умолчанию. */
  Default?: unknown
}

/** Поля регистрации действия или робота приложения. */
export interface iBXRestBizprocRegistrationFields {
  /** URL обработчика на домене установленного приложения. */
  HANDLER: string
  /** Пользователь, чей токен будет передан обработчику. */
  AUTH_USER_ID?: number
  /** Должен ли бизнес-процесс ожидать ответ приложения. */
  USE_SUBSCRIPTION?: iBXRestYesNo
  /** Название действия или робота. */
  NAME: iBXRestBizprocLocalizedString
  /** Описание действия или робота. */
  DESCRIPTION?: iBXRestBizprocLocalizedString
  /** Входные параметры. */
  PROPERTIES?: Record<string, iBXRestBizprocRegistrationProperty>
  /** Выходные параметры. */
  RETURN_PROPERTIES?: Record<string, iBXRestBizprocRegistrationProperty>
  /** Тип документа, определяющий типы входных и выходных параметров. */
  DOCUMENT_TYPE?: iBXRestBizprocDocumentType
  /** Ограничения по типу документа и редакции Битрикс24. */
  FILTER?: iBXRestBizprocRegistrationFilter
  /** Включает дополнительные настройки во встройке приложения. */
  USE_PLACEMENT?: iBXRestYesNo
  /** URL обработчика встройки; обязателен при `USE_PLACEMENT: 'Y'`. */
  PLACEMENT_HANDLER?: string
}
