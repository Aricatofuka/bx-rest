import { BXRestNavvyImSearchChat } from './search/chat'
import { BXRestNavvyImSearchDepartment } from './search/department'
import { BXRestNavvyImSearchLast } from './search/last'
import { BXRestNavvyImSearchUser } from './search/user'

export class BXRestNavvyImSearch {
  /**
   * Поиск чатов (`im.search.chat.*`).
   */
  public readonly chat = new BXRestNavvyImSearchChat()
  /**
   * Поиск подразделений (`im.search.department.*`).
   */
  public readonly department = new BXRestNavvyImSearchDepartment()
  /**
   * История поиска (`im.search.last.*`).
   */
  public readonly last = new BXRestNavvyImSearchLast()
  /**
   * Поиск пользователей (`im.search.user.*`).
   */
  public readonly user = new BXRestNavvyImSearchUser()
}

