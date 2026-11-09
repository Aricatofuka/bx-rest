import axios, { AxiosInstance } from 'axios'
import { SessionKeyServices } from './sessionKey'

/**
 * Общая часть HTTP-клиента: экземпляр axios и источник токена и адреса.
 * Сами запросы отправляет `HttpBXServices` (`BXRestRequest`).
 */
export class HttpServices {

  protected readonly axiosInstance: AxiosInstance
  public readonly session = new SessionKeyServices()

  constructor() {
    this.axiosInstance = axios.create()
  }
}
