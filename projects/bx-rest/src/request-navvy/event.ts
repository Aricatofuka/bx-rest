import {
  $bind,
  $event,
  $events,
  $get,
  $unbind
} from '../consts/part-name-methods'
import { Navvy } from '../services/navvy'
import {
  iBXRestEventHandler,
  iBXRestEventUnbindResult,
  iBXRestParamEventBind,
  iBXRestParamEventUnbind,
  iBXRestParamEvents
} from '../typification/rest/event'
import { BXRestNavvyEventOffline } from './event/offline'

/** Регистрация обработчиков и работа с событиями Битрикс24. */
export class BXRestNavvyEvent {
  private readonly Navvy = new Navvy()

  /** Очередь офлайн-событий. Для вызовов требуются права администратора. */
  public readonly offline = new BXRestNavvyEventOffline()

  readonly url = {
    /** Регистрирует обработчик события. */
    bind: [$event, $bind],
    /** Возвращает зарегистрированные обработчики приложения. */
    get: [$event, $get],
    /** Удаляет зарегистрированный обработчик. */
    unbind: [$event, $unbind],
    /** Возвращает доступные текущему приложению события. */
    events: [$events]
  }

  /**
   * Регистрирует новый обработчик события.
   *
   * Метод работает только в контексте авторизации приложения. URL обработчика
   * должен быть доступен серверам Битрикс24 извне. Пользователь без прав
   * администратора может регистрировать только онлайн-события от своего имени.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/events/event-bind.html
   */
  bind(param: iBXRestParamEventBind) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamEventBind>(
      this.url.bind,
      param
    )
  }

  /**
   * Возвращает список зарегистрированных обработчиков событий.
   *
   * Пользователь без прав администратора получает только обработчики,
   * зарегистрированные для него. Метод работает только в контексте авторизации
   * приложения.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/events/event-get.html
   */
  get() {
    return this.Navvy.simple<iBXRestEventHandler[]>(this.url.get)
  }

  /**
   * Удаляет зарегистрированный обработчик события.
   *
   * Пользователь без прав администратора может удалять только собственные
   * обработчики онлайн-событий.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/events/event-unbind.html
   */
  unbind(param: iBXRestParamEventUnbind) {
    return this.Navvy.simple<
      iBXRestEventUnbindResult,
      iBXRestEventUnbindResult,
      iBXRestParamEventUnbind
    >(this.url.unbind, param)
  }

  /**
   * Возвращает общий список доступных событий.
   *
   * `SCOPE` ограничивает результат указанным разрешением. `FULL: true`
   * запрашивает полный список, но игнорируется при одновременной передаче
   * `SCOPE`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/events/events.html
   */
  events(param: iBXRestParamEvents = {}) {
    return this.Navvy.simple<string[], string[], iBXRestParamEvents>(
      this.url.events,
      param
    )
  }
}
