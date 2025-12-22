import {
  iBXRestParamTimeManClose,
  iBXRestParamTimeManOpen,
  iBXRestParamTimeManPause,
  iBXRestParamTimeManSettings,
  iBXRestParamTimeManStatus,
  iBXRestTimeManSettings,
  iBXRestTimeManStatus,
  iBXRestTimeManStatusHttp
} from '../typification/rest/timeman/status'
import { Navvy } from '../services/navvy'
import { BXRestMapTimeMan } from '../map/timeman'
import { $pause, $settings, $status, $timeMan } from '../consts/part-name-methods'

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
    // networkrange: {
    //   check: this.baseUrl + 'networkrange.check', // Метод для проверки IP-адреса на вхождение в диапазоны сетевых адресов офисной сети
    //   get: this.baseUrl + 'networkrange.get', // Метод для получения диапазонов сетевых адресов, входящих в офисную сеть
    //   set: this.baseUrl + 'networkrange.set'	// Метод для установки диапазонов сетевых адресов, входящих в офисную сеть.	18.5.0
    // },
    // timecontrol: {
    //   report: {
    //     add: this.baseUrl + 'timecontrol.report.add', // Метод для отправки отчета о выявленном отсутствии
    //     get: this.baseUrl + 'timecontrol.reports.get', // Метод для получения отчета о выявленных отсутствиях
    //     settings: {
    //       get: this.baseUrl + 'timecontrol.reports.settings.get' // Метод для получения пользовательских настроек для построения интерфейса отчетов инструмента контроля времени
    //     },
    //     users: {
    //       get: this.baseUrl + 'timecontrol.reports.users.get'	// Метод для получения списка пользователей, относящихся к указанному подразделению.	18.5.0
    //     }
    //   },
    //   settings: {
    //     get: this.baseUrl + 'timecontrol.settings.get', // Метод для получения настроек инструмента контроля времени
    //     set: this.baseUrl + 'timecontrol.settings.set'	// Метод для установки настроек инструмента контроля времени
    //   },
    // },
    // schedule: {
    //   get: this.baseUrl + 'schedule.get'	// Метод позволяет получить рабочий график по его идентификатору
    // }
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

