import axios, { AxiosInstance } from 'axios'
import { SessionKeyServices } from './sessionKey'

/**
 * Общая часть HTTP-клиента: экземпляр axios и источник токена и адреса.
 * Сами запросы отправляет `HttpBXServices` (`BXRestRequest`).
 */
export class HttpServices {

  public readonly session = new SessionKeyServices()

  /**
   * Экземпляр axios клиента. Один на контекст (клиента со своими настройками
   * или глобальные настройки) и создаётся при первом запросе — раньше каждый
   * объект запроса создавал свой.
   */
  protected get axiosInstance(): AxiosInstance {
    return this.session.ctx.axios ??= axios.create()
  }
}
