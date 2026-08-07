import { BXRestNavvyTelephonyCall } from './call'
import { BXRestNavvyTelephonyExternalCall } from './externalcall'
import { BXRestNavvyTelephonyExternalLine } from './externalline'

export class BXRestNavvyTelephony {
  public readonly call = new BXRestNavvyTelephonyCall()
  public readonly externalCall = new BXRestNavvyTelephonyExternalCall()
  public readonly externalLine = new BXRestNavvyTelephonyExternalLine()
}

