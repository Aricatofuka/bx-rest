import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $activity, $add, $crm, $todo, $update, $updateColor, $updateDeadline, $updateDescription, $updateResponsibleUser } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmActivityTodo  {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт универсальное дело с расширенными настройками.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $todo, $add], param)
  }

  /**
   * Обновляет универсальное дело.
   */
  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $todo, $update], param)
  }

  /**
   * Изменяет цвет дела.
   */
  updateColor(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $todo, $updateColor], param)
  }

  /**
   * Изменяет срок исполнения дела.
   */
  updateDeadline(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $todo, $updateDeadline], param)
  }

  /**
   * Изменяет описание дела.
   */
  updateDescription(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $todo, $updateDescription], param)
  }

  /**
   * Изменяет ответственного за дело.
   */
  updateResponsibleUser(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $todo, $updateResponsibleUser], param)
  }
}

