import { iBXRestParamSonetGroupGet } from '../typification/rest/sonet_group'
import { BXRestMapSonetGroup } from '../map/sonet_group'
import { Navvy } from '../services/navvy'
import { $get, $sonet_group } from '../consts/part-name-methods'

export class BXRestNavvySonetGroup {

  url = {
    // /**
    //  * Создает группу соцсети, используя метод API CSocNetGroup::CreateGroup(), указывая владельцем группы текущего пользователя
    //  */
    // create: [$sonet_group, $create],
    // /**
    //  * Удаляет группу соцсети
    //  */
    // delete: [$sonet_group, $delete],
    // feature: {
    //     access: [$sonet_group, $feature, $access] // Проверяет, имеет ли текущий пользователь право на совершение операции в группе соцсети, осуществляя вызов функции CSocNetFeaturesPerms::CurrentUserCanPerformOperation()
    // },
    /**
     * Возвращает массив групп соцсети, каждая из которых содержит массив полей, осуществляя вызов CSocNetGroup::GetList(), при этом возвращаются только те группы, которые доступны пользователю по правам
     */
    get: [$sonet_group, $get],
    // /**
    //  * Изменяет владельца группы
    //  */
    // setOwner: [$sonet_group, 'setowner'],
    // /**
    //  * Изменяет параметры группы соцсети, используя метод API CSocNetGroup::Update()
    //  */
    // update: [$sonet_group, $update],
    // user: {
    //     add: [$sonet_group, $user, $add], // sonet_group.user.add	Добавляет пользователей в качестве участников рабочей группы (без приглашения и подтверждения)
    //     delete: [$sonet_group, $user, $delete], //	Удаляет пользователей из рабочей группы
    //     get: [$sonet_group, $user, $get], // Возвращает массив участников группы соцсети, осуществляя вызов CSocNetUserToGroup::GetList(), при этом проверяются права на доступ текущего пользователя к группе
    //     groups: [$sonet_group, $user, 'groups'], // Возвращает массив групп соцсети текущего пользователя, осуществляя вызов CSocNetUserToGroup::GetList()
    //     invite: [$sonet_group, $user, 'invite'], // Выполняет приглашение пользователей в группу соцсети от лица текущего пользователя, при этом проверяются права на доступ текущего пользователя к группе
    //     request: [$sonet_group, $user, $request], // Отправляет запрос текущего пользователя на вступление в группу соцсети, при этом проверяются права на доступ текущего пользователя к группе.
    //     update: [$sonet_group, $user, $update], // Изменяет роль пользователей в рабочей группе События при работе с группами СоцСети	Список событий при добавлении, изменении и удалении группы.
    // },
    // workgroup: {
    //     list: [$socialnetwork, $api, $workgroup, $list], // Метод возвращает список групп,
    //     get: [$socialnetwork, $api, $workgroup, $get] // Метод возвращает данные по рабочей группе
    // }
  }

  private readonly Navvy = new Navvy()

  get(param: iBXRestParamSonetGroupGet = {}) {
    return this.Navvy.simple(
      this.url.get,
      param,
      BXRestMapSonetGroup.get
    )
  }
}


