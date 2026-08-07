import {
  $api,
  $get,
  $list,
  $socialnetwork,
  $workgroup
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestParamSocialNetworkWorkgroupGet,
  iBXRestParamSocialNetworkWorkgroupList,
  iBXRestSocialNetworkWorkgroup
} from '../../../typification/rest/socialnetwork'

export class BXRestNavvySocialNetworkApiWorkgroup {
  private readonly Navvy = new Navvy()
  private readonly url = {
    get: [$socialnetwork, $api, $workgroup, $get],
    list: [$socialnetwork, $api, $workgroup, $list]
  }

  get(param: iBXRestParamSocialNetworkWorkgroupGet) {
    return this.Navvy.simple<
      iBXRestSocialNetworkWorkgroup,
      iBXRestSocialNetworkWorkgroup,
      iBXRestParamSocialNetworkWorkgroupGet
    >(this.url.get, param)
  }

  list(param: iBXRestParamSocialNetworkWorkgroupList = {}) {
    return this.Navvy.pagNavResultKey<
      iBXRestSocialNetworkWorkgroup,
      iBXRestSocialNetworkWorkgroup,
      iBXRestParamSocialNetworkWorkgroupList,
      'workgroups'
    >(this.url.list, param, 'workgroups')
  }
}
