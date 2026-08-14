import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $entity, $get, $section, $update } from '../../consts/part-name-methods'

export class BXRestNavvyEntitySection  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет раздел хранилища.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$entity, $section, $add], param)
  }

  /**
   * Удаляет раздел хранилища.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $section, $delete], param)
  }

  /**
   * Возвращает список разделов хранилища.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$entity, $section, $get], param)
  }

  /**
   * Изменяет раздел хранилища.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $section, $update], param)
  }
}

