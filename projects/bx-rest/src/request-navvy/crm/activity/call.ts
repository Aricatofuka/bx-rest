import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $activity, $call, $crm, $getTranscript } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmActivityCall  {
  private readonly Navvy = new Navvy()

  getTranscript(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $activity, $call, $getTranscript], param)
  }
}

