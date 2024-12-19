import { inject, Injectable } from '@angular/core'
import {
  iBXRestParamSocialNetWorkApiContentViewSet, iBXRestSocialNetWorkApiContentViewSet
} from '../../../typification/rest/socialnetwork/api/contentview/set'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { methods } from '../../../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestSocialNetWorkApiContentView {

  private url = methods.socialNetWork.api.contentView

  private http = inject(HttpBXServices)

  set(param: iBXRestParamSocialNetWorkApiContentViewSet){
    return this.http.post<iBXRestSocialNetWorkApiContentViewSet>(this.url.set, param)
  }

}