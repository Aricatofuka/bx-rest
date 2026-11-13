import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $archive, $collection, $delete, $get, $list, $note, $update } from '../../consts/part-name-methods'
import { BXRestNavvyNoteCollectionField } from './collection/field'
import { restV3CursorNav } from '../../services/navvy/sequential-navs'
import { NOTE_COLLECTION_MAX_PAGE_SIZE, PAGE_SIZE } from '../../consts/page-size'

export class BXRestNavvyNoteCollection  {
  private readonly Navvy = new Navvy()

  /**
   * Поля базы знаний (`note.collection.field.*`).
   */
  public readonly field = new BXRestNavvyNoteCollectionField()

  /**
   * Создаёт базу знаний
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $add], param)
  }

  /**
   * Архивирует базу знаний
   */
  archive(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $archive], param)
  }

  /**
   * Переносит базу знаний в корзину
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $delete], param)
  }

  /**
   * Возвращает базу знаний по идентификатору
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $get], param)
  }

  /**
   * Возвращает список доступных пользователю баз знаний
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.pagNavSequentialV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $list], param, restV3CursorNav(PAGE_SIZE, NOTE_COLLECTION_MAX_PAGE_SIZE))
  }

  /**
   * Переименовывает базу знаний
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $update], param)
  }
}

