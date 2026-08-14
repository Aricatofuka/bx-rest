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

  /**
   * Значки дел (`crm.activity.badge.*`).
   */
  public readonly badge = new BXRestNavvyCrmActivityBadge()
  /**
   * Привязки дел к элементам CRM (`crm.activity.binding.*`).
   */
  public readonly binding = new BXRestNavvyCrmActivityBinding()
  /**
   * Расшифровка звонков (`crm.activity.call.*`).
   */
  public readonly call = new BXRestNavvyCrmActivityCall()
  /**
   * Поля коммуникации дела (`crm.activity.communication.*`).
   */
  public readonly communication = new BXRestNavvyCrmActivityCommunication()
  /**
   * Настраиваемые дела (`crm.activity.configurable.*`).
   */
  public readonly configurable = new BXRestNavvyCrmActivityConfigurable()
  /**
   * Оформление дела (`crm.activity.layout.*`).
   */
  public readonly layout = new BXRestNavvyCrmActivityLayout()
  /**
   * Универсальные дела (`crm.activity.todo.*`).
   */
  public readonly todo = new BXRestNavvyCrmActivityTodo()
  /**
   * Пользовательские типы дел (`crm.activity.type.*`).
   */
  public readonly type = new BXRestNavvyCrmActivityType()

  /**
   * Создаёт новое дело.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<number, number, iBXRestCrmParams>(
      [$crm, $activity, $add], param
    )
  }

  /**
   * Удаляет дело любого типа.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $delete], param)
  }

  /**
   * Возвращает описание полей дела.
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $fields], {})
  }

  /**
   * Возвращает дело по идентификатору.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $get], param)
  }

  /**
   * Возвращает список дел всех типов по фильтру.
   */
  list(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $activity, $list], param)
  }

  /**
   * Обновляет дело.
   */
  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $update], param)
  }
}

