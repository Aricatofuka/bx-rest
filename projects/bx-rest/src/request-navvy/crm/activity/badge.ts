import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $activity, $add, $badge, $crm, $delete, $get, $list } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmActivityBadge  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет значок дела.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $badge, $add], param)
  }

  /**
   * Удаляет значок дела по коду.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $badge, $delete], param)
  }

  /**
   * Возвращает информацию о значке дела.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $badge, $get], param)
  }

  /**
   * Возвращает список значков дел.
   */
  list(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $activity, $badge, $list], param)
  }
}

