import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $activity, $blocks, $crm, $delete, $get, $layout, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmActivityLayoutBlocks  {
  private readonly Navvy = new Navvy()

  /**
   * Удаляет дополнительные блоки содержимого дела.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $layout, $blocks, $delete], param)
  }

  /**
   * Возвращает установленные блоки содержимого дела.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $activity, $layout, $blocks, $get], param)
  }

  /**
   * Устанавливает дополнительные блоки содержимого дела.
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $layout, $blocks, $set], param)
  }
}

