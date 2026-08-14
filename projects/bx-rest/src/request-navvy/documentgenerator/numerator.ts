import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $documentgenerator, $get, $list, $numerator, $update } from '../../consts/part-name-methods'

export class BXRestNavvyDocumentGeneratorNumerator  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет нумератор.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $numerator, $add], param)
  }

  /**
   * Удаляет нумератор.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $numerator, $delete], param)
  }

  /**
   * Возвращает нумератор по идентификатору.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $numerator, $get], param)
  }

  /**
   * Возвращает список нумераторов.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $numerator, $list], param)
  }

  /**
   * Изменяет нумератор.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $numerator, $update], param)
  }
}

