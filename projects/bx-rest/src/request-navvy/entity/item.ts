import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $entity, $get, $item, $update } from '../../consts/part-name-methods'
import { BXRestNavvyEntityItemProperty } from './item/property'

export class BXRestNavvyEntityItem  {
  private readonly Navvy = new Navvy()

  /**
   * Дополнительные свойства элементов хранилища (`entity.item.property.*`).
   */
  public readonly property = new BXRestNavvyEntityItemProperty()

  /**
   * Добавляет элемент хранилища.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$entity, $item, $add], param)
  }

  /**
   * Удаляет элемент хранилища.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $item, $delete], param)
  }

  /**
   * Возвращает список элементов хранилища.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$entity, $item, $get], param)
  }

  /**
   * Изменяет элемент хранилища.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $item, $update], param)
  }
}

