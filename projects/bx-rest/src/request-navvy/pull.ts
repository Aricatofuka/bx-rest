import { BXRestNavvyPullConfig } from './pull/config'
import { BXRestNavvyPullChannelPublic } from './pull/channel/public'
import { BXRestNavvyPullApplicationConfig } from './pull/application/config'

export class BXRestNavvyPull {
  public readonly config = new BXRestNavvyPullConfig()
  public readonly channel = {
    public: new BXRestNavvyPullChannelPublic()
  }
  public readonly application = {
    config: new BXRestNavvyPullApplicationConfig(),
  }
} 