import { BXRestNavvyTelephonyCall } from './call'
import { BXRestNavvyTelephonyExternalCall } from './externalcall'
import { BXRestNavvyTelephonyExternalLine } from './externalline'

export class BXRestNavvyTelephony {
  /**
   * Расшифровка записи звонка (`telephony.call.*`).
   */
  public readonly call = new BXRestNavvyTelephonyCall()
  /**
   * Звонки внешней телефонии (`telephony.externalCall.*`).
   */
  public readonly externalCall = new BXRestNavvyTelephonyExternalCall()
  /**
   * Внешние линии телефонии (`telephony.externalLine.*`).
   */
  public readonly externalLine = new BXRestNavvyTelephonyExternalLine()
}

