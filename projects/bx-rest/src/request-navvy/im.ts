import { BXRestNavvyImChat } from './im/chat'
import { BXRestNavvyImCounters } from './im/counters'
import { BXRestNavvyImDepartment } from './im/department'
import { BXRestNavvyImDialog } from './im/dialog'
import { BXRestNavvyImDisk } from './im/disk'
import { BXRestNavvyImMessage } from './im/message'
import { BXRestNavvyImNotify } from './im/notify'
import { BXRestNavvyImRecent } from './im/recent'
import { BXRestNavvyImRevision } from './im/revision'
import { BXRestNavvyImSearch } from './im/search'
import { BXRestNavvyImUser } from './im/user'
import { BXRestNavvyImV2 } from './im/v2'

export class BXRestNavvyIm {
  /**
   * Методы модуля IM версии 2: события, файлы, чаты (`im.v2.*`).
   */
  public readonly v2 = new BXRestNavvyImV2()
  /**
   * Чаты (`im.chat.*`).
   */
  public readonly chat = new BXRestNavvyImChat()
  /**
   * Счётчики сообщений и уведомлений (`im.counters.*`).
   */
  public readonly counters = new BXRestNavvyImCounters()
  /**
   * Диалоги чата (`im.dialog.*`).
   */
  public readonly dialog = new BXRestNavvyImDialog()
  /**
   * Подразделения (`im.department.*`).
   */
  public readonly department = new BXRestNavvyImDepartment()
  /**
   * Файлы Диска в чатах (`im.disk.*`).
   */
  public readonly disk = new BXRestNavvyImDisk()
  /**
   * Сообщения чата (`im.message.*`).
   */
  public readonly message = new BXRestNavvyImMessage()
  /**
   * Уведомления (`im.notify.*`).
   */
  public readonly notify = new BXRestNavvyImNotify()
  /**
   * Список последних чатов (`im.recent.*`).
   */
  public readonly recent = new BXRestNavvyImRecent()
  /**
   * Ревизии API модуля IM (`im.revision.*`).
   */
  public readonly revision = new BXRestNavvyImRevision()
  /**
   * Поиск в чатах (`im.search.*`).
   */
  public readonly search = new BXRestNavvyImSearch()
  /**
   * Пользователи чата (`im.user.*`).
   */
  public readonly user = new BXRestNavvyImUser()
}
