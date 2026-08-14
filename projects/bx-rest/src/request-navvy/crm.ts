import { BXRestNavvyCrmLead } from './crm/lead'
import { BXRestNavvyCrmDeal } from './crm/deal'
import { BXRestNavvyCrmContact } from './crm/contact'
import { BXRestNavvyCrmCompany } from './crm/company'
import { BXRestNavvyCrmQuote } from './crm/quote/index'
import { BXRestNavvyCrmEnum } from './crm/enum/index'
import { BXRestNavvyCrmMultifield } from './crm/multifield'
import { BXRestNavvyCrmAutomation } from './crm/automation/index'
import { BXRestNavvyCrmAutomatedSolution } from './crm/automatedsolution'
import { BXRestNavvyCrmDocumentGenerator } from './crm/documentgenerator/index'
import { BXRestNavvyCrmCurrency } from './crm/currency'
import { BXRestNavvyCrmStatus } from './crm/status'
import { BXRestNavvyCrmDuplicate } from './crm/duplicate/index'
import { BXRestNavvyCrmEntity } from './crm/entity'
import { BXRestNavvyCrmCallList } from './crm/calllist/index'
import { BXRestNavvyCrmAddress } from './crm/address'
import { BXRestNavvyCrmRequisite } from './crm/requisite/index'
import { BXRestNavvyCrmTimeline } from './crm/timeline/index'
import { BXRestNavvyCrmCategory } from './crm/category'
import { BXRestNavvyCrmItem } from './crm/item'
import { BXRestNavvyCrmSettings } from './crm/settings'
import { BXRestNavvyCrmType } from './crm/type'
import { BXRestNavvyCrmUserField } from './crm/userfield'
import { BXRestNavvyCrmActivity } from './crm/activity'
import { BXRestNavvyCrmOrderEntity } from './crm/orderentity'
import { BXRestNavvyCrmStageHistory } from './crm/stagehistory'
import { BXRestNavvyCrmTracking } from './crm/tracking'

export class BXRestNavvyCrm {
  /**
   * Дела CRM: звонки, письма, встречи и настраиваемые типы (`crm.activity.*`).
   */
  public readonly activity = new BXRestNavvyCrmActivity()
  /**
   * Воронки CRM (`crm.category.*`).
   */
  public readonly category = new BXRestNavvyCrmCategory()
  /**
   * Элементы смарт-процессов и универсальные объекты CRM (`crm.item.*`).
   */
  public readonly item = new BXRestNavvyCrmItem()
  /**
   * Настройки CRM (`crm.settings.*`).
   */
  public readonly settings = new BXRestNavvyCrmSettings()
  /**
   * Типы смарт-процессов (`crm.type.*`).
   */
  public readonly type = new BXRestNavvyCrmType()
  /**
   * Пользовательские поля CRM (`crm.userfield.*`).
   */
  public readonly userField = new BXRestNavvyCrmUserField()
  /**
   * Привязки заказов интернет-магазина к объектам CRM (`crm.orderentity.*`).
   */
  public readonly orderEntity = new BXRestNavvyCrmOrderEntity()
  /**
   * История движения по стадиям (`crm.stagehistory.*`).
   */
  public readonly stageHistory = new BXRestNavvyCrmStageHistory()
  /**
   * Сквозная аналитика (`crm.tracking.*`).
   */
  public readonly tracking = new BXRestNavvyCrmTracking()
  /** Таймлайн CRM: комментарии, заметки, связи и лог-записи (`crm.timeline.*`). */
  public readonly timeline = new BXRestNavvyCrmTimeline()
  /** Адреса CRM, в том числе адреса реквизитов (`crm.address.*`). */
  public readonly address = new BXRestNavvyCrmAddress()
  /** Реквизиты, банковские данные, связи и шаблоны (`crm.requisite.*`). */
  public readonly requisite = new BXRestNavvyCrmRequisite()
  /** Списки обзвона и их участники (`crm.calllist.*`). */
  public readonly callList = new BXRestNavvyCrmCallList()
  /** Поиск дубликатов и настройка его полей (`crm.duplicate.*`). */
  public readonly duplicate = new BXRestNavvyCrmDuplicate()
  /** Операции над универсальными CRM-объектами (`crm.entity.*`). */
  public readonly entity = new BXRestNavvyCrmEntity()
  /** Справочники CRM (`crm.status.*`). */
  public readonly status = new BXRestNavvyCrmStatus()
  /** Валюты CRM (`crm.currency.*`). */
  public readonly currency = new BXRestNavvyCrmCurrency()
  /** Генератор документов CRM (`crm.documentgenerator.*`). */
  public readonly documentGenerator = new BXRestNavvyCrmDocumentGenerator()
  /** Цифровые рабочие места (`crm.automatedsolution.*`). */
  public readonly automatedSolution = new BXRestNavvyCrmAutomatedSolution()
  /** Автоматизация CRM (`crm.automation.*`). */
  public readonly automation = new BXRestNavvyCrmAutomation()
  /** Перечисления CRM (`crm.enum.*`). */
  public readonly enum = new BXRestNavvyCrmEnum()
  /** Описание множественных полей CRM (`crm.multifield.*`). */
  public readonly multifield = new BXRestNavvyCrmMultifield()
  /**
   * Лиды (`crm.lead.*`).
   */
  public readonly lead = new BXRestNavvyCrmLead()
  /**
   * Сделки (`crm.deal.*`).
   */
  public readonly deal = new BXRestNavvyCrmDeal()
  /**
   * Контакты (`crm.contact.*`).
   */
  public readonly contact = new BXRestNavvyCrmContact()
  /**
   * Компании (`crm.company.*`).
   */
  public readonly company = new BXRestNavvyCrmCompany()
  /** Коммерческие предложения и связанные с ними товарные и пользовательские поля. */
  public readonly quote = new BXRestNavvyCrmQuote()
}
