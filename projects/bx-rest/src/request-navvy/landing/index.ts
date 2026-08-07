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
  public readonly block = new BXRestNavvyLandingBlock()
  public readonly demos = new BXRestNavvyLandingDemos()
  public readonly landing = new BXRestNavvyLandingLanding()
  public readonly repo = new BXRestNavvyLandingRepo()
  public readonly repoWidget = new BXRestNavvyLandingRepoWidget()
  public readonly role = new BXRestNavvyLandingRole()
  public readonly site = new BXRestNavvyLandingSite()
  public readonly sysPage = new BXRestNavvyLandingSysPage()
  public readonly template = new BXRestNavvyLandingTemplate()
}

