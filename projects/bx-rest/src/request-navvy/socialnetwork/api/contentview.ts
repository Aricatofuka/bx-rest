import {
  iBXRestParamSocialNetWorkApiContentViewSet
} from '../../../typification/rest/socialnetwork/api/contentview/set'

import { Navvy } from '../../../services/navvy'
import { methods } from '../../../typification/base/methods'

export class BXRestNavvySocialNetWorkApiContentView {

  private readonly Navvy = new Navvy()

  set(param: iBXRestParamSocialNetWorkApiContentViewSet){
    return this.Navvy.simple(methods.socialNetWork.api.contentView.set, param)
  }
}