import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $activity, $add, $configurable, $crm, $get, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmActivityConfigurable  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет настраиваемое дело.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $configurable, $add], param)
  }

  /**
   * Возвращает настраиваемое дело по идентификатору.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $configurable, $get], param)
  }

  /**
   * Обновляет настраиваемое дело.
   */
  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $configurable, $update], param)
  }
}

