import {
  $access,
  $feature,
  $sonet_group
} from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import { iBXRestParamSonetGroupFeatureAccess } from '../../typification/rest/sonet_group'

export class BXRestNavvySonetGroupFeature {
  private readonly Navvy = new Navvy()
  private readonly url = {
    access: [$sonet_group, $feature, $access]
  }

  access(param: iBXRestParamSonetGroupFeatureAccess) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamSonetGroupFeatureAccess
    >(this.url.access, param)
  }
}
