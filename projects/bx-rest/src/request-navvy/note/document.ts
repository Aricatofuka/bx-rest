import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $archive, $delete, $document, $get, $note, $update } from '../../consts/part-name-methods'
import { BXRestNavvyNoteDocumentField } from './document/field'
import { BXRestNavvyNoteDocumentSearch } from './document/search'
import { BXRestNavvyNoteDocumentTree } from './document/tree'

export class BXRestNavvyNoteDocument  {
  private readonly Navvy = new Navvy()

  /**
   * Поля документа базы знаний (`note.document.field.*`).
   */
  public readonly field = new BXRestNavvyNoteDocumentField()
  /**
   * Поиск документов (`note.document.search.*`).
   */
  public readonly search = new BXRestNavvyNoteDocumentSearch()
  /**
   * Дерево документов базы знаний (`note.document.tree.*`).
   */
  public readonly tree = new BXRestNavvyNoteDocumentTree()

  /**
   * Создаёт документ.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $add], param)
  }

  /**
   * Архивирует документ и его дочерние страницы.
   */
  archive(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $archive], param)
  }

  /**
   * Переносит документ и его дочерние страницы в корзину.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $delete], param)
  }

  /**
   * Возвращает документ с содержимым в Markdown.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $get], param)
  }

  /**
   * Обновляет заголовок и содержимое документа.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $document, $update], param)
  }
}

