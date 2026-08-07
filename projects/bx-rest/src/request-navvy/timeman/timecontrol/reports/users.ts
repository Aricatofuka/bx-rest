import { Navvy } from '../../../../services/navvy'
import { iBXRestParamTimemanTimeControlReportsUsersGet, iBXRestTimemanObject } from '../../../../typification/rest/timeman'
import { $get, $reports, $timeMan, $timecontrol, $users } from '../../../../consts/part-name-methods'

export class BXRestNavvyTimemanTimeControlReportsUsers {
  private readonly Navvy = new Navvy()

  get(param: iBXRestParamTimemanTimeControlReportsUsersGet = {}) {
    return this.Navvy.simple<
      iBXRestTimemanObject[],
      iBXRestTimemanObject[],
      iBXRestParamTimemanTimeControlReportsUsersGet
    >([$timeMan, $timecontrol, $reports, $users, $get], param)
  }
}

