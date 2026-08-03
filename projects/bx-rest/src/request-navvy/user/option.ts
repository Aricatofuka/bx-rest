import { Navvy } from '../../services/navvy'
import { iBXRestOptionGetResult } from '../../typification/rest/app'
import {
  iBXRestParamUserOptionGet,
  iBXRestParamUserOptionSet
} from '../../typification/rest/user'

/** Персональные настройки текущего пользователя (`user.option.*`). */
export class BXRestNavvyUserOption {
  private readonly Navvy = new Navvy()

  /**
   * Сохраняет или обновляет настройки текущего пользователя для приложения.
   *
   * Метод работает только в контексте приложения. Пустой объект `options`
   * приводит к ошибке `ArgumentNullException`.
   */
  set(param: iBXRestParamUserOptionSet) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamUserOptionSet>(
      ['user', 'option', 'set'],
      param
    )
  }

  /**
   * Возвращает одну пользовательскую настройку или все настройки сразу.
   *
   * Если `option` не указан, возвращаются все свойства, сохраненные через
   * `user.option.set`. Метод работает только в контексте приложения.
   */
  get(param: iBXRestParamUserOptionGet = {}) {
    return this.Navvy.simple<
      iBXRestOptionGetResult,
      iBXRestOptionGetResult,
      iBXRestParamUserOptionGet
    >(['user', 'option', 'get'], param)
  }
}
