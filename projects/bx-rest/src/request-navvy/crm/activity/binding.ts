import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $activity, $add, $binding, $crm, $delete, $list, $move } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmActivityBinding  {
  private readonly Navvy = new Navvy()

  /**
   * Привязывает дело к элементу CRM.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $binding, $add], param)
  }

  /**
   * Удаляет привязку дела к элементу CRM.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $binding, $delete], param)
  }

  /**
   * Возвращает список привязок дела к элементам CRM.
   */
  list(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $activity, $binding, $list], param)
  }

  /**
   * Переносит привязку дела на другой элемент CRM.
   */
  move(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $binding, $move], param)
  }
}

