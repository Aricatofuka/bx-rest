import { BXRestNavvyVoxImplantCallback } from './callback'
import { BXRestNavvyVoxImplantInfoCall } from './infocall'
import { BXRestNavvyVoxImplantLine } from './line'
import { BXRestNavvyVoxImplantSip } from './sip'
import { BXRestNavvyVoxImplantTts } from './tts'
import { BXRestNavvyVoxImplantStatistic } from './statistic'
import { BXRestNavvyVoxImplantUrl } from './url'
import { BXRestNavvyVoxImplantUser } from './user'

export class BXRestNavvyVoxImplant  {
  /**
   * Обратный звонок (`voximplant.callback.*`).
   */
  public readonly callback = new BXRestNavvyVoxImplantCallback()
  /**
   * Автоинформатор (`voximplant.infocall.*`).
   */
  public readonly infocall = new BXRestNavvyVoxImplantInfoCall()
  /**
   * Исходящие линии (`voximplant.line.*`).
   */
  public readonly line = new BXRestNavvyVoxImplantLine()
  /**
   * SIP-подключения (`voximplant.sip.*`).
   */
  public readonly sip = new BXRestNavvyVoxImplantSip()
  /**
   * Статистика звонков (`voximplant.statistic.*`).
   */
  public readonly statistic = new BXRestNavvyVoxImplantStatistic()
  /**
   * Синтез речи (`voximplant.tts.*`).
   */
  public readonly tts = new BXRestNavvyVoxImplantTts()
  /**
   * Ссылки на страницы телефонии (`voximplant.url.*`).
   */
  public readonly url = new BXRestNavvyVoxImplantUrl()
  /**
   * Настройки пользователей телефонии (`voximplant.user.*`).
   */
  public readonly user = new BXRestNavvyVoxImplantUser()
}

