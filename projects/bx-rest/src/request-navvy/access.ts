import { Navvy } from '../services/navvy'
import {
  iBXRestAccessNameResult,
  iBXRestParamAccessName
} from '../typification/rest/common'

/** Получение сведений о кодах доступа (`access.*`). */
export class BXRestNavvyAccess {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает человекочитаемые названия переданных кодов доступа.
   *
   * Например, `{ ACCESS: ['G2', 'AU'] }` вернет описания прав для всех
   * посетителей и всех авторизованных пользователей.
   */
  name(param: iBXRestParamAccessName) {
    return this.Navvy.simple<
      iBXRestAccessNameResult,
      iBXRestAccessNameResult,
      iBXRestParamAccessName
    >(['access', 'name'], param)
  }
}
