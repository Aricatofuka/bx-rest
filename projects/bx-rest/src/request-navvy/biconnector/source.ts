import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $biconnector, $delete, $fields, $get, $list, $source, $update } from '../../consts/part-name-methods'

export class BXRestNavvyBiConnectorSource {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет новый источник.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$biconnector, $source, $add], param)
  }

  /**
   * Удаляет источник.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$biconnector, $source, $delete],
      param
    )
  }

  /**
   * Возвращает описание полей источника.
   */
  fields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$biconnector, $source, $fields], param)
  }

  /**
   * Возвращает информацию об источнике.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$biconnector, $source, $get], param)
  }

  /**
   * Возвращает список доступных источников.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$biconnector, $source, $list], param)
  }

  /**
   * Обновляет существующий источник.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$biconnector, $source, $update],
      param
    )
  }
}

