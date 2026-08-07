import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $activity, $add, $crm, $todo, $update, $updateColor, $updateDeadline, $updateDescription, $updateResponsibleUser } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmActivityTodo  {
  private readonly Navvy = new Navvy()

  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $todo, $add], param)
  }

  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $todo, $update], param)
  }

  updateColor(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $todo, $updateColor], param)
  }

  updateDeadline(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $todo, $updateDeadline], param)
  }

  updateDescription(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $todo, $updateDescription], param)
  }

  updateResponsibleUser(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $todo, $updateResponsibleUser], param)
  }
}

