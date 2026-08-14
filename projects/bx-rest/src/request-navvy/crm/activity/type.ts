import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $activity, $add, $crm, $delete, $list, $type } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmActivityType  {
  private readonly Navvy = new Navvy()

  /**
   * Регистрирует пользовательский тип дела с названием и иконкой.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $type, $add], param)
  }

  /**
   * Удаляет пользовательский тип дела.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $type, $delete], param)
  }

  /**
   * Возвращает список пользовательских типов дел.
   */
  list(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $activity, $type, $list], param)
  }
}

