import {
  iBXRestParamTimeManClose,
  iBXRestParamTimeManOpen,
  iBXRestParamTimeManPause,
  iBXRestParamTimeManSettings,
  iBXRestParamTimeManStatus,
  iBXRestTimeManSettings,
  iBXRestTimeManStatus,
  iBXRestTimeManStatusHttp
} from '../typification/rest/timeman'
import { Navvy } from '../services/navvy'
import { BXRestMapTimeMan } from '../map/timeman'
import { $close, $open, $pause, $settings, $status, $timeMan } from '../consts/part-name-methods'
import { toLocalAtom } from '../functions/toLocalAtom'
import { BXRestNavvyTimemanNetworkRange } from './timeman/networkrange'
import { BXRestNavvyTimemanRecord } from './timeman/record'
import { BXRestNavvyTimemanSchedule } from './timeman/schedule'
import { BXRestNavvyTimemanTimeControl } from './timeman/timecontrol'

export class BXRestNavvyTimeMan {
  /**
   * Офисные сети (`timeman.networkrange.*`).
   */
  public readonly networkRange = new BXRestNavvyTimemanNetworkRange()
  /**
   * Записи о рабочем времени (`timeman.record.*`).
   */
  public readonly record = new BXRestNavvyTimemanRecord()
  /**
   * Рабочий график (`timeman.schedule.*`).
   */
  public readonly schedule = new BXRestNavvyTimemanSchedule()
  /**
   * Контроль рабочего времени (`timeman.timecontrol.*`).
   */
  public readonly timeControl = new BXRestNavvyTimemanTimeControl()
  protected readonly url = {
    /**
     * Получение настроек рабочего времени пользователя
     */
    settings: [$timeMan, $settings],
    /**
     * Получение информации о текущем рабочем дне пользователя
     */
    status: [$timeMan, $status],
    /**
     * Начать новый рабочий день либо возобновить закрытый или приостановленный
     */
    open: [$timeMan, $open],
    /**
     * Закрыть рабочий день
     */
    close: [$timeMan, $close],
    /**
     * Приостановить рабочий день
     */
    pause: [$timeMan, $pause],
  }

  protected Navvy = new Navvy()

  /**
   * Возвращает информацию о текущем рабочем дне пользователя.
   */
  status(param: iBXRestParamTimeManStatus | undefined = undefined){
    return this.Navvy.simple(
      this.url.status,
      param,
      BXRestMapTimeMan.status
    )
  }

  /**
   * Начинает новый рабочий день или возобновляет закрытый.
   */
  open(param: iBXRestParamTimeManOpen = {}) {
    if(param && param.TIME instanceof Date){
      param.TIME = toLocalAtom(param.TIME)
    }
    return this.Navvy.simple<iBXRestTimeManStatusHttp, iBXRestTimeManStatus, iBXRestParamTimeManOpen>(
      this.url.open,
      param,
      BXRestMapTimeMan.status
    )
  }

  /**
   * Ставит рабочий день на паузу.
   */
  pause(param: iBXRestParamTimeManPause = {}) {
    return this.Navvy.simple<iBXRestTimeManStatusHttp, iBXRestTimeManStatus, iBXRestParamTimeManPause>(
      this.url.pause,
      param,
      BXRestMapTimeMan.status
    )
  }

  /**
   * Закрывает рабочий день.
   */
  close(param: iBXRestParamTimeManClose = {}) {
    if(param && param.TIME instanceof Date){
      param.TIME = toLocalAtom(param.TIME)
    }
    return this.Navvy.simple<iBXRestTimeManStatusHttp, iBXRestTimeManStatus, iBXRestParamTimeManClose>(
      this.url.close,
      param,
      BXRestMapTimeMan.status
    )
  }

  /**
   * Возвращает настройки рабочего времени пользователя.
   */
  settings(param: iBXRestParamTimeManSettings = {}) {
    return this.Navvy.simple<iBXRestTimeManSettings, iBXRestTimeManSettings, iBXRestParamTimeManSettings>(
      this.url.settings,
      param
    )
  }
}
