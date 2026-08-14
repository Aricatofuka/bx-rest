import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $documentgenerator, $get, $getFields, $list, $template, $update } from '../../consts/part-name-methods'

export class BXRestNavvyDocumentGeneratorTemplate  {
  private readonly Navvy = new Navvy()

  /**
   * Загружает новый шаблон документа.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $template, $add], param)
  }

  /**
   * Удаляет шаблон документа.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $template, $delete], param)
  }

  /**
   * Возвращает шаблон документа по идентификатору.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $template, $get], param)
  }

  /**
   * Возвращает карту полей шаблона.
   */
  getFields(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $template, $getFields], param)
  }

  /**
   * Возвращает список шаблонов документов по фильтру.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $template, $list], param)
  }

  /**
   * Обновляет существующий шаблон документа.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $template, $update], param)
  }
}

