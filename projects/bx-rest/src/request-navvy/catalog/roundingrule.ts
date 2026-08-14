import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $catalog, $delete, $get, $getFieldsExact, $list, $roundingRule, $update } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogRoundingRule  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет правило округления цен.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $roundingRule, $add], param)
  }
  /**
   * Удаляет правило округления цен.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $roundingRule, $delete], param)
  }
  /**
   * Возвращает правило округления цен по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $roundingRule, $get], param)
  }
  /**
   * Возвращает описание полей правила округления цен.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $roundingRule, $getFieldsExact], param)
  }
  /**
   * Возвращает список правил округления цен.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $roundingRule, $list], param)
  }
  /**
   * Обновляет правило округления цен.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $roundingRule, $update], param)
  }
}

