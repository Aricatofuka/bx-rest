import { $application, $config, $get, $pull } from '../../../consts/part-name-methods'
import {
  iBXRestPullApplicationConfigGet,
  iBXRestPullApplicationConfigGetHttp
} from '../../../typification/rest/pull'
import { Navvy } from '../../../services/navvy'
import { BXRestMapPullApplicationConfig } from '../../../map/pull/application/config'

export class BXRestNavvyPullApplicationConfig {

  private Navvy = new Navvy()

  get() {
    return this.Navvy.simple<iBXRestPullApplicationConfigGetHttp, iBXRestPullApplicationConfigGet>(
      [$pull, $application, $config, $get],
      undefined,
      BXRestMapPullApplicationConfig.get
    )
  }
}