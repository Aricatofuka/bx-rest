import { $add, $blogpost, $channel, $get, $log, $public, $pull } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestPullChannelPublicGet,
  iBXRestPullChannelPublicGetHttp
} from '../../../typification/rest/pull/channel/get'
import { BXRestMapPullChannelPublic } from '../../../map/channel/public'

export class BXRestNavvyPullChannelPublic {
  url = {
    get: [$log, $blogpost, $add]
  }

  private Navvy = new Navvy()

  get() {
    return this.Navvy.simple<iBXRestPullChannelPublicGetHttp,
      iBXRestPullChannelPublicGet>([$pull, $channel, $public, $get], undefined, BXRestMapPullChannelPublic.get)
  }
}