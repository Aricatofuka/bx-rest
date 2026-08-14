import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $delete, $entity, $get, $item, $property, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyEntityItemProperty  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет дополнительное свойство элементов.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $item, $property, $add], param)
  }

  /**
   * Удаляет дополнительное свойство элементов.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $item, $property, $delete], param)
  }

  /**
   * Возвращает список дополнительных свойств элементов.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$entity, $item, $property, $get], param)
  }

  /**
   * Изменяет дополнительное свойство элементов.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $item, $property, $update], param)
  }
}

