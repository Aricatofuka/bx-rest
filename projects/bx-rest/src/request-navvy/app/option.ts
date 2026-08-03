import { Navvy } from '../../services/navvy'
import {
  iBXRestOptionGetResult,
  iBXRestParamAppOptionGet,
  iBXRestParamAppOptionSet
} from '../../typification/rest/app'

/** Общие настройки текущего приложения (`app.option.*`). */
export class BXRestNavvyAppOption {
  private readonly Navvy = new Navvy()

  /**
   * Сохраняет или обновляет общие настройки приложения.
   *
   * Метод работает только в контексте приложения и требует прав администратора.
   * Пустой объект `options` приводит к ошибке `ArgumentNullException`.
   */
  set(param: iBXRestParamAppOptionSet) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamAppOptionSet>(
      ['app', 'option', 'set'],
      param
    )
  }

  /**
   * Возвращает одну настройку приложения или все настройки сразу.
   *
   * Если `option` не указан, возвращаются все свойства, сохраненные через
   * `app.option.set`. Метод работает только в контексте приложения.
   */
  get(param: iBXRestParamAppOptionGet = {}) {
    return this.Navvy.simple<
      iBXRestOptionGetResult,
      iBXRestOptionGetResult,
      iBXRestParamAppOptionGet
    >(['app', 'option', 'get'], param)
  }
}
