export default interface saveApplicationAuth {
  access_token: string, // основной авторизационный токен, требуемый для доступа к REST API
  client_endpoint: string, // адрес REST-интерфейса портала
  domain: string,
  expires: number,
  expires_in: number,
  member_id: string,
  refresh_token: string, // дополнительный авторизационный токен, служащий для продления сохраненной авторизации
  scope: string,
  server_endpoint: string, // адрес REST-интерфейса сервера
  status: string, // статус приложения на портале
  user_id: number,
  state?: any
}
