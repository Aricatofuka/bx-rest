import clone from 'just-clone'
import {
  iBXRestCrmCurrency,
  iBXRestCrmCurrencyHttp,
  iBXRestCrmCurrencyLocalization,
  iBXRestCrmCurrencyLocalizationHttp
} from '../../typification/rest/crm'
import { toBool, toDate, toNum } from '../../services/base'

export class BXRestMapCrmCurrency {
  /** Преобразует список валют из формата Bitrix24 в локальный формат библиотеки. */
  static list(value: iBXRestCrmCurrencyHttp[] | undefined): iBXRestCrmCurrency[] | undefined {
    return value?.map(item => BXRestMapCrmCurrency.get(item) as iBXRestCrmCurrency)
  }

  /** Преобразует валюту из формата Bitrix24 в локальный формат библиотеки. */
  static get(value: iBXRestCrmCurrencyHttp | undefined): iBXRestCrmCurrency | undefined {
    if (!value) return undefined

    return Object.assign(clone(value), {
      AMOUNT_CNT: toNum(value.AMOUNT_CNT),
      AMOUNT: toNum(value.AMOUNT),
      SORT: toNum(value.SORT),
      BASE: toBool(value.BASE),
      DECIMALS: toNum(value.DECIMALS),
      DATE_UPDATE: toDate(value.DATE_UPDATE),
      LANG: BXRestMapCrmCurrency.localizations(value.LANG)
    })
  }

  private static localizations(
    value: Record<string, iBXRestCrmCurrencyLocalizationHttp> | undefined
  ): Record<string, iBXRestCrmCurrencyLocalization> | undefined {
    if (!value) return undefined

    return Object.fromEntries(
      Object.entries(value).map(([language, localization]) => [
        language,
        Object.assign(clone(localization), {
          DECIMALS: toNum(localization.DECIMALS),
          HIDE_ZERO: localization.HIDE_ZERO === undefined
            ? undefined
            : toBool(localization.HIDE_ZERO)
        })
      ])
    )
  }
}
