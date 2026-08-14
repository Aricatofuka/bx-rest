import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $documentgenerator, $get, $list, $region, $update } from '../../consts/part-name-methods'

export class BXRestNavvyDocumentGeneratorRegion  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет пользовательский регион.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $region, $add], param)
  }

  /**
   * Удаляет пользовательский регион.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $region, $delete], param)
  }

  /**
   * Возвращает данные региона по идентификатору или коду.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $region, $get], param)
  }

  /**
   * Возвращает список предустановленных и пользовательских регионов.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $region, $list], param)
  }

  /**
   * Обновляет пользовательский регион.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $region, $update], param)
  }
}

