import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestUserUserField } from '../../typification/rest/user/userfield/list'
import { methods } from '../../typification/base/methods'

export class BXRestUserUserfield {
  protected url = methods.user.userfield
  private readonly http = new HttpBXServices()

  list() {
    return this.http.post<iBXRestUserUserField[]>(this.url.list)
  }
}
