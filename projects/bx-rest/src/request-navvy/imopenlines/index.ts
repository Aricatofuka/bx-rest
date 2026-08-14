import { BXRestNavvyImOpenLinesBot } from './bot'
import { BXRestNavvyImOpenLinesConfig } from './config'
import { BXRestNavvyImOpenLinesCrm } from './crm'
import { BXRestNavvyImOpenLinesDialog } from './dialog'
import { BXRestNavvyImOpenLinesMessage } from './message'
import { BXRestNavvyImOpenLinesNetwork } from './network'
import { BXRestNavvyImOpenLinesOperator } from './operator'
import { BXRestNavvyImOpenLinesRevision } from './revision'
import { BXRestNavvyImOpenLinesSession } from './session'

export class BXRestNavvyImOpenLines {
  /**
   * Чат-бот открытой линии (`imopenlines.bot.*`).
   */
  public readonly bot = new BXRestNavvyImOpenLinesBot()
  /**
   * Открытые линии (`imopenlines.config.*`).
   */
  public readonly config = new BXRestNavvyImOpenLinesConfig()
  /**
   * Интеграция открытых линий с CRM (`imopenlines.crm.*`).
   */
  public readonly crm = new BXRestNavvyImOpenLinesCrm()
  /**
   * Диалог оператора (`imopenlines.dialog.*`).
   */
  public readonly dialog = new BXRestNavvyImOpenLinesDialog()
  /**
   * Сообщения открытой линии (`imopenlines.message.*`).
   */
  public readonly message = new BXRestNavvyImOpenLinesMessage()
  /**
   * Сеть открытых линий (`imopenlines.network.*`).
   */
  public readonly network = new BXRestNavvyImOpenLinesNetwork()
  /**
   * Действия оператора (`imopenlines.operator.*`).
   */
  public readonly operator = new BXRestNavvyImOpenLinesOperator()
  /**
   * Ревизии API открытых линий (`imopenlines.revision.*`).
   */
  public readonly revision = new BXRestNavvyImOpenLinesRevision()
  /**
   * Сессии открытой линии (`imopenlines.session.*`).
   */
  public readonly session = new BXRestNavvyImOpenLinesSession()
}

