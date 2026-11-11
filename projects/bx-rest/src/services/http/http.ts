import axios, { AxiosInstance } from 'axios'
import { SessionKeyServices } from './sessionKey'
import { BXRestContext, runInContext } from '../context'
import { iBXRestSettings } from '../../typification/settings'

/**
 * Общая часть HTTP-клиента: экземпляр axios и источник токена и адреса.
 * Сами запросы отправляет `HttpBXServices` (`BXRestRequest`).
 */
export class HttpServices {

  public readonly session: SessionKeyServices

  /**
   * @param settings свои настройки, как у `new BXRestNavvy(settings)`: запросы
   *   идут на этот портал с этим токеном, а `BXRestSettings` на них не влияют.
   *   Без них — настройки клиента, внутри которого создан объект, или
   *   глобальные `BXRestSettings`.
   */
  constructor(settings?: iBXRestSettings) {
    this.session = settings
      ? runInContext(new BXRestContext(settings), () => new SessionKeyServices())
      : new SessionKeyServices()
  }

  /**
   * Экземпляр axios клиента. Один на контекст (клиента со своими настройками
   * или глобальные настройки) и создаётся при первом запросе — раньше каждый
   * объект запроса создавал свой.
   */
  protected get axiosInstance(): AxiosInstance {
    return this.session.ctx.axios ??= axios.create()
  }
}
