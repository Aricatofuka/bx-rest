import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $entity, $get, $rights, $update } from '../../consts/part-name-methods'
import { BXRestNavvyEntityItem } from './item'
import { BXRestNavvyEntitySection } from './section'

export class BXRestNavvyEntity  {
  private readonly Navvy = new Navvy()

  /**
   * Элементы хранилища данных (`entity.item.*`).
   */
  public readonly item = new BXRestNavvyEntityItem()
  /**
   * Разделы хранилища данных (`entity.section.*`).
   */
  public readonly section = new BXRestNavvyEntitySection()

  /**
   * Создаёт хранилище данных.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $add], param)
  }

  /**
   * Удаляет хранилище.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $delete], param)
  }

  /**
   * Возвращает параметры хранилища или список всех хранилищ приложения.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$entity, $get], param)
  }

  /**
   * Возвращает или изменяет права доступа к хранилищу.
   */
  rights(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$entity, $rights], param)
  }

  /**
   * Изменяет параметры хранилища данных.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $update], param)
  }
}

