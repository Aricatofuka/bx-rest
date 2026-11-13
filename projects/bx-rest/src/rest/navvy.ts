import { BXRestMap } from '../map/rest'
import { Navvy } from '../services/navvy'

import { BXRestNavvyUser } from '../request-navvy/user'
import { BXRestNavvyLists } from '../request-navvy/lists'
import { BXRestNavvyTask } from '../request-navvy/task'
import { BXRestNavvyTasks } from '../request-navvy/tasks'
import { BXRestNavvyDisk } from '../request-navvy/disk'
import { BXRestNavvyBizProc } from '../request-navvy/bizproc'
import { BXRestNavvyLog } from '../request-navvy/log'
import { BXRestNavvyCalendar } from '../request-navvy/calendar'
import { BXRestNavvySonetGroup } from '../request-navvy/sonet_group'
import { BXRestNavvyServer } from '../request-navvy/server'
import { BXRestNavvyDepartment } from '../request-navvy/department'
import { BXRestNavvyIm } from '../request-navvy/im'
import { BXRestNavvyApp } from '../request-navvy/app'
import { BXRestNavvyTimeMan } from '../request-navvy/timeman'
import { BXRestNavvySocialNetWork } from '../request-navvy/socialnetwork'
import { BXRestNavvyPull } from '../request-navvy/pull'
import { BXRestNavvyCrm } from '../request-navvy/crm'
import { BXRestNavvyEvent } from '../request-navvy/event'
import { iBXRestProfile, iBXRestProfileHttp } from '../typification/rest/profile'
import { BXRestNavvyMethod } from '../request-navvy/method'
import { BXRestNavvyAccess } from '../request-navvy/access'
import { BXRestNavvyFeature } from '../request-navvy/feature'
import { BXRestNavvyAi } from '../request-navvy/ai/index'
import { BXRestNavvyMailService } from '../request-navvy/mailservice'
import { BXRestNavvyMessageService } from '../request-navvy/messageservice/index'
import { BXRestNavvyUserConsent } from '../request-navvy/userconsent/index'
import { BXRestNavvyTelephony } from '../request-navvy/telephony/index'
import { BXRestNavvyVote } from '../request-navvy/vote/index'
import { BXRestNavvyImConnector } from '../request-navvy/imconnector/index'
import { BXRestNavvyEntity } from '../request-navvy/entity/index'
import { BXRestNavvyBiConnector } from '../request-navvy/biconnector/index'
import { BXRestNavvyVoxImplant } from '../request-navvy/voximplant/index'
import { BXRestNavvyMail } from '../request-navvy/mail/index'
import { BXRestNavvyNote } from '../request-navvy/note/index'
import { BXRestNavvyDocumentGenerator } from '../request-navvy/documentgenerator/index'
import { BXRestNavvyImBot } from '../request-navvy/imbot/index'
import { BXRestNavvyBooking } from '../request-navvy/booking/index'
import { BXRestNavvyImOpenLines } from '../request-navvy/imopenlines/index'
import { BXRestNavvyLanding } from '../request-navvy/landing/index'
import { BXRestNavvyCatalog } from '../request-navvy/catalog/index'
import { BXRestNavvySale } from '../request-navvy/sale/index'
import { BXRestNavvySign } from '../request-navvy/sign/index'
import { BXRestNavvyEventLog } from '../request-navvy/eventlog/index'
import { BXRestNavvyPlacement } from '../request-navvy/placement'
import { BXRestNavvyUserFieldType } from '../request-navvy/userfieldtype'
import { iBXRestParamScope } from '../typification/rest/common'
import { iBXRestSettings } from '../typification/settings'
import { BXRestContext, enterContext, globalContext, restoreContext } from '../services/context'

export class BXRestNavvy {
  public readonly ai: BXRestNavvyAi
  public readonly mailService: BXRestNavvyMailService
  public readonly messageService: BXRestNavvyMessageService
  public readonly userConsent: BXRestNavvyUserConsent
  public readonly telephony: BXRestNavvyTelephony
  public readonly vote: BXRestNavvyVote
  public readonly imConnector: BXRestNavvyImConnector
  public readonly entity: BXRestNavvyEntity
  public readonly biConnector: BXRestNavvyBiConnector
  public readonly voxImplant: BXRestNavvyVoxImplant
  public readonly mail: BXRestNavvyMail
  public readonly note: BXRestNavvyNote
  public readonly documentGenerator: BXRestNavvyDocumentGenerator
  public readonly imBot: BXRestNavvyImBot
  public readonly booking: BXRestNavvyBooking
  public readonly imOpenLines: BXRestNavvyImOpenLines
  public readonly landing: BXRestNavvyLanding
  public readonly catalog: BXRestNavvyCatalog
  public readonly sale: BXRestNavvySale
  public readonly sign: BXRestNavvySign
  public readonly eventLog: BXRestNavvyEventLog
  public readonly placement: BXRestNavvyPlacement
  public readonly userFieldType: BXRestNavvyUserFieldType
  public readonly user: BXRestNavvyUser
  public readonly lists: BXRestNavvyLists
  public readonly task: BXRestNavvyTask
  public readonly tasks: BXRestNavvyTasks
  public readonly disk: BXRestNavvyDisk
  public readonly bizProc: BXRestNavvyBizProc
  public readonly log: BXRestNavvyLog
  public readonly calendar: BXRestNavvyCalendar
  public readonly sonet_group: BXRestNavvySonetGroup
  public readonly server: BXRestNavvyServer
  public readonly department: BXRestNavvyDepartment
  public readonly im: BXRestNavvyIm
  public readonly app: BXRestNavvyApp
  public readonly timeMan: BXRestNavvyTimeMan
  public readonly socialNetWork: BXRestNavvySocialNetWork
  public readonly pull: BXRestNavvyPull
  public readonly crm: BXRestNavvyCrm
  /** Регистрация обработчиков и работа с онлайн- и офлайн-событиями. */
  public readonly event: BXRestNavvyEvent
  /** Проверка существования и доступности REST-методов. */
  public readonly method: BXRestNavvyMethod
  /** Получение описаний кодов доступа. */
  public readonly access: BXRestNavvyAccess
  /** Проверка доступности возможностей портала. */
  public readonly feature: BXRestNavvyFeature
  public readonly Navvy: Navvy

  /**
   * @param settings Свои настройки клиента: адрес портала, способ авторизации,
   *   заголовки. Все запросы этого клиента идут с ними, даже если глобальные
   *   `BXRestSettings` позже изменятся. Так в одном процессе можно работать
   *   с несколькими порталами. Без аргумента клиент работает с глобальными
   *   `BXRestSettings`, как раньше
   */
  constructor(settings?: iBXRestSettings) {
    // Каждый HTTP-объект запоминает контекст в момент создания, поэтому все
    // разделы создаются, пока включён контекст клиента. Создание идёт в теле
    // конструктора, а не в инициализаторах полей: только так finally вернёт
    // прежний контекст, даже если какой-то раздел бросит исключение. Иначе
    // объекты, созданные приложением позже, ушли бы на портал этого клиента.
    const previous = enterContext(settings ? new BXRestContext(settings) : globalContext)
    try {
      this.ai = new BXRestNavvyAi()
      this.mailService = new BXRestNavvyMailService()
      this.messageService = new BXRestNavvyMessageService()
      this.userConsent = new BXRestNavvyUserConsent()
      this.telephony = new BXRestNavvyTelephony()
      this.vote = new BXRestNavvyVote()
      this.imConnector = new BXRestNavvyImConnector()
      this.entity = new BXRestNavvyEntity()
      this.biConnector = new BXRestNavvyBiConnector()
      this.voxImplant = new BXRestNavvyVoxImplant()
      this.mail = new BXRestNavvyMail()
      this.note = new BXRestNavvyNote()
      this.documentGenerator = new BXRestNavvyDocumentGenerator()
      this.imBot = new BXRestNavvyImBot()
      this.booking = new BXRestNavvyBooking()
      this.imOpenLines = new BXRestNavvyImOpenLines()
      this.landing = new BXRestNavvyLanding()
      this.catalog = new BXRestNavvyCatalog()
      this.sale = new BXRestNavvySale()
      this.sign = new BXRestNavvySign()
      this.eventLog = new BXRestNavvyEventLog()
      this.placement = new BXRestNavvyPlacement()
      this.userFieldType = new BXRestNavvyUserFieldType()
      this.user = new BXRestNavvyUser()
      this.lists = new BXRestNavvyLists()
      this.task = new BXRestNavvyTask()
      this.tasks = new BXRestNavvyTasks()
      this.disk = new BXRestNavvyDisk()
      this.bizProc = new BXRestNavvyBizProc()
      this.log = new BXRestNavvyLog()
      this.calendar = new BXRestNavvyCalendar()
      this.sonet_group = new BXRestNavvySonetGroup()
      this.server = new BXRestNavvyServer()
      this.department = new BXRestNavvyDepartment()
      this.im = new BXRestNavvyIm()
      this.app = new BXRestNavvyApp()
      this.timeMan = new BXRestNavvyTimeMan()
      this.socialNetWork = new BXRestNavvySocialNetWork()
      this.pull = new BXRestNavvyPull()
      this.crm = new BXRestNavvyCrm()
      this.event = new BXRestNavvyEvent()
      this.method = new BXRestNavvyMethod()
      this.access = new BXRestNavvyAccess()
      this.feature = new BXRestNavvyFeature()
      this.Navvy = new Navvy()
    } finally {
      restoreContext(previous)
    }
  }

  /**
   * Возвращает базовую информацию о текущем пользователе без scope `user`.
   *
   * Результат содержит идентификатор, имя, фамилию, признак администратора,
   * пол, часовой пояс и связанные поля профиля
   */
  public profile() {
    return this.Navvy.simple<iBXRestProfileHttp, iBXRestProfile>(
      ['profile'],
      undefined,
      BXRestMap.profile
    )
  }

  /**
   * Возвращает разрешения текущего приложения.
   *
   * Передайте `{ full: true }`, чтобы запросить полный список разрешений
   * портала. Без параметров возвращаются разрешения, доступные приложению
   */
  public scope(param: iBXRestParamScope = {}) {
    return this.Navvy.simple<string[], string[], iBXRestParamScope>(
      ['scope'],
      param
    )
  }

  /** Возвращает список REST-методов, доступных текущему приложению */
  public methods() {
    return this.Navvy.simple<string[]>(['methods'])
  }

  // public batch<T, C, M>(param: iBXRestNavvyParamBatch<T, C, M>) {
  //   const modifiedObject = Object.fromEntries(
  //     Object.entries(param.cmd).map(([key, value]) => {
  //       let modifiedValue = value.resultVanilla.arguments
  //       return [key, modifiedValue]
  //     })
  //   )
  //
  //   return this.BXRest.batch({
  //     halt: param.halt,
  //     cmd: modifiedObject
  //   })
  // }
}
