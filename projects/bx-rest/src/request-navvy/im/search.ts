import { BXRestNavvyImSearchChat } from './search/chat'
import { BXRestNavvyImSearchDepartment } from './search/department'
import { BXRestNavvyImSearchLast } from './search/last'
import { BXRestNavvyImSearchUser } from './search/user'

export class BXRestNavvyImSearch {
  public readonly chat = new BXRestNavvyImSearchChat()
  public readonly department = new BXRestNavvyImSearchDepartment()
  public readonly last = new BXRestNavvyImSearchLast()
  public readonly user = new BXRestNavvyImSearchUser()
}

