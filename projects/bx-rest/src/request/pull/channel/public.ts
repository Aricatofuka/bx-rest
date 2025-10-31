import { HttpBXServices } from '../../../services/http/HttpBX'
import {
  iBXRestPullChannelPublicGetHttp
} from '../../../typification/rest/pull/channel/get'
import { $channel, $get, /*$list,*/ $public, $pull } from '../../../consts/part-name-methods'

export class BXRestPullChannelPublic {
  private readonly http = new HttpBXServices()

  get() {
    return this.http.post<iBXRestPullChannelPublicGetHttp>([$pull, $channel, $public, $get])
  }

  /**
   * Пес его знает что за метод такой, судя по коду нужно всю инфу json объектом о пользователе передать,
   * но это не точно
   */
  // list() {
  //   return this.http.post<iBXRestPullChannelPublicGetHttp>([$pull, $channel, $public, $list])
  // }
}