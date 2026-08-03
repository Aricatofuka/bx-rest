import { Navvy } from '../services/navvy'
import { BXRestMapServer } from '../map/server'
import { $server, $time } from '../consts/part-name-methods'

export class BXRestNavvyServer {

  url = {
    time: [$server, $time]
  }

  private readonly Navvy = new Navvy()

  /**
   * Возвращает текущее время сервера как объект `Date`.
   *
   * Исходный ответ REST API имеет формат ISO 8601
   * `YYYY-MM-DDThh:mm:ss±hh:mm`; получить его без преобразования можно через
   * `resVanilla()` у возвращаемого навигатора.
   */
  time() {
    return this.Navvy.simple<string, Date, undefined>(
      this.url.time,
      undefined,
      BXRestMapServer.time
    )
  }
}
