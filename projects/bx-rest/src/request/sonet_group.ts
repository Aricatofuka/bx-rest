import { Injectable } from '@angular/core'
import {
  $create,
  $delete,
  $get,
  $sonet_group,
  $update
} from '../consts/part-name-metods'
import { HttpBXServices } from '../services/http/HttpBX'
import {
  iBXRestParamSonetGroupGet, iBXRestParamSonetHttp
} from '../typification/rest/sonet_group/get'


@Injectable({
  providedIn: 'root'
})
export class BXRestSonetGroup {

  url = {
    create: [$sonet_group, $create], // Создает группу соцсети, используя метод API CSocNetGroup::CreateGroup(), указывая владельцем группы текущего пользователя
    delete: [$sonet_group, $delete], // Удаляет группу соцсети
    // feature: {
    //     access: [$sonet_group, $feature, $access] // Проверяет, имеет ли текущий пользователь право на совершение операции в группе соцсети, осуществляя вызов функции CSocNetFeaturesPerms::CurrentUserCanPerformOperation()
    // },
    get: [$sonet_group, $get], // Возвращает массив групп соцсети, каждая из которых содержит массив полей, осуществляя вызов CSocNetGroup::GetList(), при этом возвращаются только те группы, которые доступны пользователю по правам
    setowner: [$sonet_group, 'setowner'], // Изменяет владельца группы
    update: [$sonet_group, $update], // Изменяет параметры группы соцсети, используя метод API CSocNetGroup::Update()
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

  constructor(
    private http: HttpBXServices,
  ) {
  }

  // // TODO: filter и select позже нормально описать
  // getList(filter: any = {}, select: iWorkgroupFields[] = ['ID', 'NAME']){
  //   return this.httpPost<iHttpAnswerBX<{workgroups: iListWorkgroup[]}>>(
  //     this.url.get,
  //     {
  //       order: select,
  //       filter: filter
  //     }
  //   )
  // }

  get(param: iBXRestParamSonetGroupGet = {
    filter: {},
    order: {}
  }) {
    return this.http.post<iBXRestParamSonetHttp[]>(this.url.get, param)
  }
}
