import { iBXRestYesNo } from '../base/yes-no'

export interface iBXRestAppInfo extends iBXRestAppInfoBase {
  /** Локальный идентификатор приложения на портале. */
  ID: number
  /** Истек ли оплаченный или пробный период. */
  PAYMENT_EXPIRED: boolean
}

export interface iBXRestAppInfoHttp extends iBXRestAppInfoBase {
  /** Локальный идентификатор приложения в исходном формате REST API. */
  ID: string | number
  /** Признак окончания оплаченного или пробного периода. */
  PAYMENT_EXPIRED: iBXRestYesNo
}

export interface iBXRestAppInfoBase {
  /** Код приложения. */
  CODE: string
  /** Установленная версия приложения. */
  VERSION: number
  /** Статус: бесплатное, демо, пробное, платное, локальное или подписное. */
  STATUS: 'F' | 'D' | 'T' | 'P' | 'L' | 'S'
  /** Завершена ли установка приложения. */
  INSTALLED: boolean
  /** Количество дней до конца оплаченного или пробного периода. */
  DAYS: number | null
  /** Базовый язык портала. */
  LANGUAGE_ID: string
  /** Тариф с региональным префиксом, например `ru_ent10000`. */
  LICENSE: string
  /** Идентификатор тарифного плана без регионального префикса. */
  LICENSE_TYPE: string
  /** Семейство тарифного плана. */
  LICENSE_FAMILY: string
}
