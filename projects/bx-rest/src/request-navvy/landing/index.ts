import { BXRestNavvyLandingBlock } from './block'
import { BXRestNavvyLandingDemos } from './demos'
import { BXRestNavvyLandingLanding } from './landing'
import { BXRestNavvyLandingRepo } from './repo'
import { BXRestNavvyLandingRepoWidget } from './repowidget'
import { BXRestNavvyLandingRole } from './role'
import { BXRestNavvyLandingSite } from './site'
import { BXRestNavvyLandingSysPage } from './syspage'
import { BXRestNavvyLandingTemplate } from './template'

export class BXRestNavvyLanding {
  /**
   * Блоки страниц (`landing.block.*`).
   */
  public readonly block = new BXRestNavvyLandingBlock()
  /**
   * Шаблоны сайтов и страниц (`landing.demos.*`).
   */
  public readonly demos = new BXRestNavvyLandingDemos()
  /**
   * Страницы (`landing.landing.*`).
   */
  public readonly landing = new BXRestNavvyLandingLanding()
  /**
   * Пользовательские блоки репозитория (`landing.repo.*`).
   */
  public readonly repo = new BXRestNavvyLandingRepo()
  /**
   * Виджеты стартовой страницы (`landing.repowidget.*`).
   */
  public readonly repoWidget = new BXRestNavvyLandingRepoWidget()
  /**
   * Модель прав доступа (`landing.role.*`).
   */
  public readonly role = new BXRestNavvyLandingRole()
  /**
   * Сайты (`landing.site.*`).
   */
  public readonly site = new BXRestNavvyLandingSite()
  /**
   * Специальные страницы (`landing.syspage.*`).
   */
  public readonly sysPage = new BXRestNavvyLandingSysPage()
  /**
   * Шаблоны представления (`landing.template.*`).
   */
  public readonly template = new BXRestNavvyLandingTemplate()
}

