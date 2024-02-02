import { Injectable } from '@angular/core'
import { $pause, $settings, $status, $timeMan, } from '../consts/part-name-methods'
import { iBXRestParamTimeManStatus, iBXRestTimeManStatusHttp } from '../typification/rest/timeman/status'
import { HttpBXServices } from '../services/http/HttpBX'

@Injectable({
  providedIn: 'root'
})
export class BXRestTimeMan {
  protected url = {
    settings: [$timeMan, $settings], // Получение настроек рабочего времени пользователя
    status: [$timeMan, $status], // Получение информации о текущем рабочем дне пользователя
    open: [$timeMan, 'open'], // Начать новый рабочий день либо возобновить закрытый или приостановленный
    close: [$timeMan, 'close'], // Закрыть рабочий день
    pause: [$timeMan, $pause], // Приостановить рабочий день
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

  constructor(
    private http: HttpBXServices,
  ) {
  }

  status(param: iBXRestParamTimeManStatus | undefined = undefined){
    return this.http.post<iBXRestTimeManStatusHttp>(this.url.status, param)
  }
}

