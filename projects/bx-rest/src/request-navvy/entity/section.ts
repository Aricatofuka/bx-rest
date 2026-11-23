import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { iBXRestParamEntitySectionGet } from '../../typification/rest/entity'
import { $add, $delete, $entity, $get, $section, $update } from '../../consts/part-name-methods'

export class BXRestNavvyEntitySection  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет раздел хранилища
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$entity, $section, $add], param)
  }

  /**
   * Удаляет раздел хранилища
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $section, $delete], param)
  }

  /**
   * Возвращает список разделов хранилища
   * @see https://apidocs.bitrix24.ru/api-reference/entity/sections/entity-section-get.html
   */
  get(param: iBXRestParamEntitySectionGet) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestParamEntitySectionGet
    >([$entity, $section, $get], param)
  }

  /**
   * Изменяет раздел хранилища
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $section, $update], param)
  }
}
