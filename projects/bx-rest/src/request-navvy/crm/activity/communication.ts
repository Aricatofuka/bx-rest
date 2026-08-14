import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $activity, $communication, $crm, $fields } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmActivityCommunication  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание полей коммуникации дела.
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $communication, $fields], {})
  }
}

