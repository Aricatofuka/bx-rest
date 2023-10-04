export default interface ApplicationAuth {
  code?: string,
  state?: string,
  domain?: string,
  member_id?: string,
  scope?: string,
  server_domain?: string
}
