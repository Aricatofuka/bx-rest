import {
  $clear,
  $error,
  $event,
  $get,
  $list,
  $offline
} from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import {
  iBXRestEventOfflineGetResult,
  iBXRestEventOfflineListItem,
  iBXRestParamEventOfflineClear,
  iBXRestParamEventOfflineError,
  iBXRestParamEventOfflineGet,
  iBXRestParamEventOfflineList
} from '../../typification/rest/event'

/** Очередь офлайн-событий (`event.offline.*`). Доступна администраторам. */
export class BXRestNavvyEventOffline {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Возвращает и удаляет либо резервирует первые записи очереди. */
    get: [$event, $offline, $get],
    /** Возвращает страницу очереди, не меняя состояние записей. */
    list: [$event, $offline, $list],
    /** Удаляет обработанные записи зарезервированного пакета. */
    clear: [$event, $offline, $clear],
    /** Помечает записи зарезервированного пакета ошибочными. */
    error: [$event, $offline, $error]
  }

  /**
   * Возвращает первые записи очереди согласно фильтру.
   *
   * По умолчанию метод удаляет выбранные записи. Передайте `clear: 0`, чтобы
   * зарезервировать их и получить `process_id` для последующего вызова
   * `clear` или `error`. Параллельные запросы получают разные наборы записей.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/events/event-offline-get.html
   */
  get(param: iBXRestParamEventOfflineGet = {}) {
    return this.Navvy.simple<
      iBXRestEventOfflineGetResult,
      iBXRestEventOfflineGetResult,
      iBXRestParamEventOfflineGet
    >(this.url.get, param)
  }

  /**
   * Читает одну страницу текущей очереди, не меняя состояние записей.
   *
   * Метод не резервирует записи и не формирует `process_id`. Размер страницы
   * фиксирован и равен 50 записям.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/events/event-offline-list.html
   */
  list(param: iBXRestParamEventOfflineList = {}) {
    return this.Navvy.pagNav<
      iBXRestEventOfflineListItem,
      iBXRestEventOfflineListItem,
      iBXRestParamEventOfflineList
    >(this.url.list, param)
  }

  /**
   * Удаляет обработанные записи зарезервированного пакета.
   *
   * Без `id` и `message_id` удаляет все записи с переданным `process_id`.
   * Если указаны оба массива, `id` имеет приоритет.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/events/event-offline-clear.html
   */
  clear(param: iBXRestParamEventOfflineClear) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamEventOfflineClear>(
      this.url.clear,
      param
    )
  }

  /**
   * Помечает записи зарезервированного пакета ошибочными.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/events/event-offline-error.html
   */
  error(param: iBXRestParamEventOfflineError) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamEventOfflineError>(
      this.url.error,
      param
    )
  }
}
