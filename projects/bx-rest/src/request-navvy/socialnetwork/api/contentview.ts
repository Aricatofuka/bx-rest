import {
  iBXRestParamSocialNetWorkApiContentViewSet,
  iBXRestSocialNetWorkApiContentViewSet
} from '../../../typification/rest/socialnetwork'

import { Navvy } from '../../../services/navvy'
import { $api, $set, $socialnetwork } from '../../../consts/part-name-methods'

export class BXRestNavvySocialNetWorkApiContentView {

  private readonly Navvy = new Navvy()

  /**
   * Отмечает переданные элементы контента (по XML ID) как просмотренные текущим пользователем.
   */
  set(param: iBXRestParamSocialNetWorkApiContentViewSet){
    return this.Navvy.simple<
      iBXRestSocialNetWorkApiContentViewSet,
      iBXRestSocialNetWorkApiContentViewSet,
      iBXRestParamSocialNetWorkApiContentViewSet
    >([$socialnetwork, $api, 'contentView', $set], param)
  }
}
