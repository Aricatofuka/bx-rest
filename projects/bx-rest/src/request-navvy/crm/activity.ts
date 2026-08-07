import { Navvy } from '../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../typification/rest/crm'
import { $activity, $add, $crm, $delete, $fields, $get, $list, $update } from '../../consts/part-name-methods'
import { BXRestNavvyCrmActivityBadge } from './activity/badge'
import { BXRestNavvyCrmActivityBinding } from './activity/binding'
import { BXRestNavvyCrmActivityCall } from './activity/call'
import { BXRestNavvyCrmActivityCommunication } from './activity/communication'
import { BXRestNavvyCrmActivityConfigurable } from './activity/configurable'
import { BXRestNavvyCrmActivityLayout } from './activity/layout'
import { BXRestNavvyCrmActivityTodo } from './activity/todo'
import { BXRestNavvyCrmActivityType } from './activity/type'

export class BXRestNavvyCrmActivity  {
  private readonly Navvy = new Navvy()

  public readonly badge = new BXRestNavvyCrmActivityBadge()
  public readonly binding = new BXRestNavvyCrmActivityBinding()
  public readonly call = new BXRestNavvyCrmActivityCall()
  public readonly communication = new BXRestNavvyCrmActivityCommunication()
  public readonly configurable = new BXRestNavvyCrmActivityConfigurable()
  public readonly layout = new BXRestNavvyCrmActivityLayout()
  public readonly todo = new BXRestNavvyCrmActivityTodo()
  public readonly type = new BXRestNavvyCrmActivityType()

  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<number, number, iBXRestCrmParams>(
      [$crm, $activity, $add], param
    )
  }

  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $delete], param)
  }

  fields() {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $fields], {})
  }

  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $get], param)
  }

  list(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $activity, $list], param)
  }

  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $update], param)
  }
}

