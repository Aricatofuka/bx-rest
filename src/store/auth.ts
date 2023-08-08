import { Action, createReducer, on, props } from '@ngrx/store'
import { createAction } from '@ngrx/store'
import saveApplicationAuth from 'bx-rest/src/typification/auth/save'
import clone from 'just-clone'
export interface saveApplicationAuthPath {
  access_token?: string, // основной авторизационный токен, требуемый для доступа к REST API
  client_endpoint?: string, // адрес REST-интерфейса портала
  domain?: string,
  expires?: number,
  expires_in?: number,
  member_id?: string,
  refresh_token?: string, // дополнительный авторизационный токен, служащий для продления сохраненной авторизации
  scope?: string,
  server_endpoint?: string, // адрес REST-интерфейса сервера
  status?: string, // статус приложения на портале
  user_id?: number
  type?: string
}
export const save = createAction('[Auth Component] Save', props<saveApplicationAuth | saveApplicationAuthPath>())
export const saveAccessToken = createAction('[Auth Component] SaveAccessToken', props<saveApplicationAuthPath>())

export const initialState: saveApplicationAuth = {
  access_token: '',
  client_endpoint: '',
  domain: '',
  expires: 0,
  expires_in: 0,
  member_id: '',
  refresh_token: '',
  scope: '',
  server_endpoint: '',
  status: '',
  user_id: 0
}

const _authReducer = createReducer(
  initialState,
  on(saveAccessToken, (s, data) => {
    let copy = clone(s)
    return Object.assign(copy, data)
  }),
);

export function authReducer(state = initialState, action: Action) {
  return _authReducer(state, action);
}
