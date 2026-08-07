import { $add, $delete, $get, $groups, $invite, $request, $sonet_group, $update, $user } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import {
  iBXRestParamSonetGroupUserChange,
  iBXRestParamSonetGroupUserGet,
  iBXRestParamSonetGroupUserInvite,
  iBXRestParamSonetGroupUserRequest,
  iBXRestParamSonetGroupUserUpdate,
  iBXRestSonetGroupUser,
  iBXRestSonetGroupUserGroup
} from '../../typification/rest/sonet_group'

export class BXRestNavvySonetGroupUser {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$sonet_group, $user, $add],
    delete: [$sonet_group, $user, $delete],
    get: [$sonet_group, $user, $get],
    groups: [$sonet_group, $user, $groups],
    invite: [$sonet_group, $user, $invite],
    request: [$sonet_group, $user, $request],
    update: [$sonet_group, $user, $update]
  }

  add(param: iBXRestParamSonetGroupUserChange) {
    return this.Navvy.simple<number[], number[], iBXRestParamSonetGroupUserChange>(
      this.url.add,
      param
    )
  }

  delete(param: iBXRestParamSonetGroupUserChange) {
    return this.Navvy.simple<number[], number[], iBXRestParamSonetGroupUserChange>(
      this.url.delete,
      param
    )
  }

  get(param: iBXRestParamSonetGroupUserGet) {
    return this.Navvy.simple<
      iBXRestSonetGroupUser[],
      iBXRestSonetGroupUser[],
      iBXRestParamSonetGroupUserGet
    >(this.url.get, param)
  }

  groups() {
    return this.Navvy.simple<iBXRestSonetGroupUserGroup[]>(this.url.groups)
  }

  invite(param: iBXRestParamSonetGroupUserInvite) {
    return this.Navvy.simple<number[], number[], iBXRestParamSonetGroupUserInvite>(
      this.url.invite,
      param
    )
  }

  request(param: iBXRestParamSonetGroupUserRequest) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamSonetGroupUserRequest>(
      this.url.request,
      param
    )
  }

  update(param: iBXRestParamSonetGroupUserUpdate) {
    return this.Navvy.simple<number[], number[], iBXRestParamSonetGroupUserUpdate>(
      this.url.update,
      param
    )
  }
}
