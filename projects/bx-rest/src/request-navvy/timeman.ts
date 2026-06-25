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
import { $pause, $settings, $status, $timeMan } from '../consts/part-name-methods'
import { toLocalAtom } from '../functions/toLocalAtom'

export class BXRestNavvyTimeMan {
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
    open: [$timeMan, 'open'],
    /**
     * Закрыть рабочий день
     */
    close: [$timeMan, 'close'],
    /**
     * Приостановить рабочий день
     */
    pause: [$timeMan, $pause],
  }

  protected Navvy = new Navvy()

  status(param: iBXRestParamTimeManStatus | undefined = undefined){
    return this.Navvy.simple(
      this.url.status,
      param,
      BXRestMapTimeMan.status
    )
  }

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

  pause(param: iBXRestParamTimeManPause = {}) {
    return this.Navvy.simple<iBXRestTimeManStatusHttp, iBXRestTimeManStatus, iBXRestParamTimeManPause>(
      this.url.pause,
      param,
      BXRestMapTimeMan.status
    )
  }

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

  settings(param: iBXRestParamTimeManSettings = {}) {
    return this.Navvy.simple<iBXRestTimeManSettings, iBXRestTimeManSettings, iBXRestParamTimeManSettings>(
      this.url.settings,
      param
    )
  }
}