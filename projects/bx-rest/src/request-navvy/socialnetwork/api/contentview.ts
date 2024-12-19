import { inject, Injectable } from '@angular/core'
import {
  iBXRestParamSocialNetWorkApiContentViewSet
} from '../../../typification/rest/socialnetwork/api/contentview/set'

import { Navvy } from '../../../services/navvy'
import { BXRestSocialNetWorkApiContentView } from '../../../request/socialnetwork/api/contentview'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvySocialNetWorkApiContentView {
  private readonly ContentView = inject(BXRestSocialNetWorkApiContentView)
  private readonly Navvy = new Navvy(this.ContentView, null)

  set(param: iBXRestParamSocialNetWorkApiContentViewSet){
    return this.Navvy.simpleWithArg(this.ContentView.set, param)
  }

}