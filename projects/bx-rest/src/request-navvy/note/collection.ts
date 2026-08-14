import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $archive, $collection, $delete, $get, $list, $note, $update } from '../../consts/part-name-methods'
import { BXRestNavvyNoteCollectionField } from './collection/field'

export class BXRestNavvyNoteCollection  {
  private readonly Navvy = new Navvy()

  /**
   * Поля базы знаний (`note.collection.field.*`).
   */
  public readonly field = new BXRestNavvyNoteCollectionField()

  /**
   * Создаёт базу знаний.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $add], param)
  }

  /**
   * Архивирует базу знаний.
   */
  archive(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $archive], param)
  }

  /**
   * Переносит базу знаний в корзину.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $delete], param)
  }

  /**
   * Возвращает базу знаний по идентификатору.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $get], param)
  }

  /**
   * Возвращает список доступных пользователю баз знаний.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $list], param)
  }

  /**
   * Переименовывает базу знаний.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $update], param)
  }
}

