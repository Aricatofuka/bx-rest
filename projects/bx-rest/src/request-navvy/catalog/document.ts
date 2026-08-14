import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $cancel, $cancelList, $catalog, $conduct, $conductList, $delete, $deleteList, $document, $getFieldsExact, $list, $update } from '../../consts/part-name-methods'
import { BXRestNavvyCatalogDocumentElement } from './document/element'
import { BXRestNavvyCatalogDocumentMode } from './document/mode'

export class BXRestNavvyCatalogDocument  {
  private readonly Navvy = new Navvy()

  /**
   * Товарные позиции документа учёта (`catalog.document.element.*`).
   */
  public readonly element = new BXRestNavvyCatalogDocumentElement()
  /**
   * Режим работы с документами учёта (`catalog.document.mode.*`).
   */
  public readonly mode = new BXRestNavvyCatalogDocumentMode()
  /**
   * Создаёт документ складского учёта.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $add], param)
  }
  /**
   * Отменяет проведение документа складского учёта.
   */
  public cancel(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $cancel], param)
  }
  /**
   * Отменяет проведение нескольких документов складского учёта.
   */
  public cancelList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $cancelList], param)
  }
  /**
   * Проводит документ складского учёта.
   */
  public conduct(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $conduct], param)
  }
  /**
   * Проводит несколько документов складского учёта.
   */
  public conductList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $conductList], param)
  }
  /**
   * Удаляет документ складского учёта.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $delete], param)
  }
  /**
   * Удаляет несколько документов складского учёта.
   */
  public deleteList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $deleteList], param)
  }
  /**
   * Возвращает описание полей документа складского учёта.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $getFieldsExact], param)
  }
  /**
   * Возвращает список документов складского учёта.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $list], param)
  }
  /**
   * Обновляет документ складского учёта.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $update], param)
  }
}

