import {
  iBXRestParamSocialNetWorkApiContentViewSet, iBXRestSocialNetWorkApiContentViewSet
} from '../../../typification/rest/socialnetwork/api/contentview/set'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { $api, $set, $socialnetwork } from '../../../consts/part-name-methods'

export class BXRestSocialNetWorkApiContentView {
  private url = {
    set: [$socialnetwork, $api, 'contentView', $set],
  }

  private http = new HttpBXServices()

  set(param: iBXRestParamSocialNetWorkApiContentViewSet){
    return this.http.post<iBXRestSocialNetWorkApiContentViewSet>(this.url.set, param)
  }

}
