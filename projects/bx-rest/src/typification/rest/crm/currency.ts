import { iBXRestYesNo } from '../base/yes-no'
import { iBXRestCrmFieldDescription } from './enum'

/** Направление сортировки списка валют. */
export type iBXRestCrmCurrencySortDirection = 'ASC' | 'DESC' | 'asc' | 'desc'

/** Параметры локализации валюты, передаваемые в Bitrix24. */
export interface iBXRestCrmCurrencyLocalizationFields {
  /** Число десятичных знаков дробной части. */
  DECIMALS: number
  /** Символ десятичного разделителя. */
  DEC_POINT?: string
  /** Шаблон отображения суммы и знака валюты. */
  FORMAT_STRING?: string
  /** Полное название валюты на выбранном языке. */
  FULL_NAME?: string
  /** Скрывать ли незначащие нули. */
  HIDE_ZERO?: iBXRestYesNo
  /** Пользовательский разделитель разрядов. */
  THOUSANDS_SEP?: string
  /** Код стандартного разделителя разрядов. */
  THOUSANDS_VARIANT?: string
}

/** Поля новой валюты. */
export interface iBXRestCrmCurrencyAddFields {
  /** Символьный идентификатор валюты по ISO 4217, например `RUB`. */
  CURRENCY: string
  /** Является ли валюта базовой. По умолчанию `N`. */
  BASE?: iBXRestYesNo
  /** Номинал валюты, обычно 1 или число, кратное 10. */
  AMOUNT_CNT: number
  /** Курс по отношению к базовой валюте. */
  AMOUNT: number
  /** Положение в списке валют. По умолчанию 100. */
  SORT?: number
  /** Локализации, сгруппированные по идентификатору языка. */
  LANG?: Record<string, iBXRestCrmCurrencyLocalizationFields>
}

/** Изменяемые поля существующей валюты. */
export type iBXRestCrmCurrencyUpdateFields = Partial<
  Omit<iBXRestCrmCurrencyAddFields, 'CURRENCY'>
>

/** Параметры метода `crm.currency.add`. */
export interface iBXRestParamCrmCurrencyAdd {
  /** Значения полей новой валюты. */
  fields: iBXRestCrmCurrencyAddFields
}

/** Параметры метода `crm.currency.update`. */
export interface iBXRestParamCrmCurrencyUpdate {
  /** Символьный идентификатор обновляемой валюты по ISO 4217. */
  ID: string
  /** Изменяемые значения полей валюты. */
  fields: iBXRestCrmCurrencyUpdateFields
}

/** Параметры методов, принимающих символьный идентификатор валюты. */
export interface iBXRestParamCrmCurrencyId {
  /** Символьный идентификатор валюты по ISO 4217. */
  id: string
}

/** Параметры метода `crm.currency.get`. */
export type iBXRestParamCrmCurrencyGet = iBXRestParamCrmCurrencyId

/** Параметры метода `crm.currency.delete`. */
export type iBXRestParamCrmCurrencyDelete = iBXRestParamCrmCurrencyId

/** Параметры метода `crm.currency.base.set`. */
export type iBXRestParamCrmCurrencyBaseSet = iBXRestParamCrmCurrencyId

/** Поля, по которым можно сортировать список валют. */
export type iBXRestCrmCurrencySortField =
  | 'CURRENCY'
  | 'AMOUNT_CNT'
  | 'AMOUNT'
  | 'SORT'
  | 'BASE'
  | 'FULL_NAME'
  | 'LID'
  | 'DATE_UPDATE'
  | Lowercase<
    | 'CURRENCY'
    | 'AMOUNT_CNT'
    | 'AMOUNT'
    | 'SORT'
    | 'BASE'
    | 'FULL_NAME'
    | 'LID'
    | 'DATE_UPDATE'
  >

/** Параметры метода `crm.currency.list`. */
export interface iBXRestParamCrmCurrencyList {
  /** Порядок сортировки по полям валюты. */
  order?: Partial<Record<iBXRestCrmCurrencySortField, iBXRestCrmCurrencySortDirection>>
}

/** Локализация валюты в локальном формате библиотеки. */
export interface iBXRestCrmCurrencyLocalization {
  FORMAT_STRING?: string
  FULL_NAME?: string
  DEC_POINT?: string
  THOUSANDS_SEP?: string | null
  DECIMALS: number
  THOUSANDS_VARIANT?: string
  HIDE_ZERO?: boolean
}

/** Локализация валюты в формате ответа Bitrix24. */
export interface iBXRestCrmCurrencyLocalizationHttp {
  FORMAT_STRING?: string
  FULL_NAME?: string
  DEC_POINT?: string
  THOUSANDS_SEP?: string | null
  DECIMALS: string
  THOUSANDS_VARIANT?: string
  HIDE_ZERO?: iBXRestYesNo
}

interface iBXRestCrmCurrencyBase {
  /** Символьный идентификатор валюты по ISO 4217. */
  CURRENCY: string
  /** Название валюты на текущем языке портала. */
  FULL_NAME: string
  /** Идентификатор текущего языка портала. */
  LID: string
  /** Шаблон отображения суммы и знака валюты. */
  FORMAT_STRING: string
  /** Символ десятичного разделителя. */
  DEC_POINT: string
  /** Разделитель разрядов. */
  THOUSANDS_SEP: string | null
}

/** Валюта в локальном формате библиотеки. */
export interface iBXRestCrmCurrency extends iBXRestCrmCurrencyBase {
  /** Номинал валюты. */
  AMOUNT_CNT: number
  /** Курс по отношению к базовой валюте. */
  AMOUNT: number
  /** Положение в списке валют. */
  SORT: number
  /** Является ли валюта базовой. */
  BASE: boolean
  /** Число десятичных знаков дробной части. */
  DECIMALS: number
  /** Дата последнего изменения валюты. */
  DATE_UPDATE: Date
  /** Локализации, сгруппированные по идентификатору языка. */
  LANG?: Record<string, iBXRestCrmCurrencyLocalization>
}

/** Валюта в формате ответа Bitrix24. */
export interface iBXRestCrmCurrencyHttp extends iBXRestCrmCurrencyBase {
  AMOUNT_CNT: string
  AMOUNT: string
  SORT: string
  BASE: iBXRestYesNo
  DECIMALS: string
  DATE_UPDATE: string
  LANG?: Record<string, iBXRestCrmCurrencyLocalizationHttp>
}

/** Описание полей валюты, возвращаемое методом `crm.currency.fields`. */
export interface iBXRestCrmCurrencyFields {
  CURRENCY: iBXRestCrmFieldDescription
  AMOUNT_CNT: iBXRestCrmFieldDescription
  AMOUNT: iBXRestCrmFieldDescription
  BASE: iBXRestCrmFieldDescription
  SORT: iBXRestCrmFieldDescription
  DATE_UPDATE: iBXRestCrmFieldDescription
  LID: iBXRestCrmFieldDescription
  FORMAT_STRING: iBXRestCrmFieldDescription
  FULL_NAME: iBXRestCrmFieldDescription
  DEC_POINT: iBXRestCrmFieldDescription
  THOUSANDS_SEP: iBXRestCrmFieldDescription
  DECIMALS: iBXRestCrmFieldDescription
  LANG: iBXRestCrmFieldDescription
}
