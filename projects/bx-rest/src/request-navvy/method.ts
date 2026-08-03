import { Navvy } from '../services/navvy'
import {
  iBXRestMethodAvailability,
  iBXRestParamMethodGet
} from '../typification/rest/common'

/** Проверка существования и доступности REST-методов (`method.*`). */
export class BXRestNavvyMethod {
  private readonly Navvy = new Navvy()

  /**
   * Проверяет, существует ли метод на портале и доступен ли он приложению.
   *
   * Передавайте имя метода в нижнем регистре, например `{ name: 'user.get' }`.
   */
  get(param: iBXRestParamMethodGet) {
    return this.Navvy.simple<
      iBXRestMethodAvailability,
      iBXRestMethodAvailability,
      iBXRestParamMethodGet
    >(['method', 'get'], param)
  }
}
