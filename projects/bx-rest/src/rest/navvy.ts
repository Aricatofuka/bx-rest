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

export class BXRestNavvy {
  public readonly ai = new BXRestNavvyAi()
  public readonly mailService = new BXRestNavvyMailService()
  public readonly messageService = new BXRestNavvyMessageService()
  public readonly userConsent = new BXRestNavvyUserConsent()
  public readonly telephony = new BXRestNavvyTelephony()
  public readonly vote = new BXRestNavvyVote()
  public readonly imConnector = new BXRestNavvyImConnector()
  public readonly entity = new BXRestNavvyEntity()
  public readonly biConnector = new BXRestNavvyBiConnector()
  public readonly voxImplant = new BXRestNavvyVoxImplant()
  public readonly mail = new BXRestNavvyMail()
  public readonly note = new BXRestNavvyNote()
  public readonly documentGenerator = new BXRestNavvyDocumentGenerator()
  public readonly imBot = new BXRestNavvyImBot()
  public readonly booking = new BXRestNavvyBooking()
  public readonly imOpenLines = new BXRestNavvyImOpenLines()
  public readonly landing = new BXRestNavvyLanding()
  public readonly catalog = new BXRestNavvyCatalog()
  public readonly sale = new BXRestNavvySale()
  public readonly sign = new BXRestNavvySign()
  public readonly eventLog = new BXRestNavvyEventLog()
  public readonly placement = new BXRestNavvyPlacement()
  public readonly userFieldType = new BXRestNavvyUserFieldType()
  public readonly user = new BXRestNavvyUser()
  public readonly lists = new BXRestNavvyLists()
  public readonly task = new BXRestNavvyTask()
  public readonly tasks = new BXRestNavvyTasks()
  public readonly disk = new BXRestNavvyDisk()
  public readonly bizProc = new BXRestNavvyBizProc()
  public readonly log = new BXRestNavvyLog()
  public readonly calendar = new BXRestNavvyCalendar()
  public readonly sonet_group = new BXRestNavvySonetGroup()
  public readonly server = new BXRestNavvyServer()
  public readonly department = new BXRestNavvyDepartment()
  public readonly im = new BXRestNavvyIm()
  public readonly app = new BXRestNavvyApp()
  public readonly timeMan = new BXRestNavvyTimeMan()
  public readonly socialNetWork = new BXRestNavvySocialNetWork()
  public readonly pull = new BXRestNavvyPull()
  public readonly crm = new BXRestNavvyCrm()
  /** Регистрация обработчиков и работа с онлайн- и офлайн-событиями. */
  public readonly event = new BXRestNavvyEvent()
  /** Проверка существования и доступности REST-методов. */
  public readonly method = new BXRestNavvyMethod()
  /** Получение описаний кодов доступа. */
  public readonly access = new BXRestNavvyAccess()
  /** Проверка доступности возможностей портала. */
  public readonly feature = new BXRestNavvyFeature()
  public readonly Navvy = new Navvy()

  /**
   * Возвращает базовую информацию о текущем пользователе без scope `user`.
   *
   * Результат содержит идентификатор, имя, фамилию, признак администратора,
   * пол, часовой пояс и связанные поля профиля.
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
   * портала. Без параметров возвращаются разрешения, доступные приложению.
   */
  public scope(param: iBXRestParamScope = {}) {
    return this.Navvy.simple<string[], string[], iBXRestParamScope>(
      ['scope'],
      param
    )
  }

  /** Возвращает список REST-методов, доступных текущему приложению. */
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
