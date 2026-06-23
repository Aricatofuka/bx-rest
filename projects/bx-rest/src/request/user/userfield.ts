import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestUserUserField } from '../../typification/rest/user/userfield/list'
import { $list, $user, $userfield } from '../../consts/part-name-methods'

export class BXRestUserUserfield {
  protected url = {
    list: [$user, $userfield, $list],
  }
  private readonly http = new HttpBXServices()

  list() {
    return this.http.post<iBXRestUserUserField[]>(this.url.list)
  }
}
