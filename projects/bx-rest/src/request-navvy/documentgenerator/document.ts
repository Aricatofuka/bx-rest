import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $document, $documentgenerator, $enablepublicurl, $get, $getFields, $list, $update } from '../../consts/part-name-methods'

export class BXRestNavvyDocumentGeneratorDocument  {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт новый документ на основании шаблона.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $document, $add], param)
  }

  /**
   * Удаляет документ.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $document, $delete], param)
  }

  /**
   * Включает или выключает публичную ссылку на документ.
   */
  enablePublicUrl(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $document, $enablepublicurl], param)
  }

  /**
   * Возвращает документ по идентификатору.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $document, $get], param)
  }

  /**
   * Возвращает список полей документа.
   */
  getFields(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $document, $getFields], param)
  }

  /**
   * Возвращает список документов.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $document, $list], param)
  }

  /**
   * Изменяет существующий документ.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $document, $update], param)
  }
}

