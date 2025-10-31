import { BXRestPullConfig } from './pull/config'
import { BXRestPullChannelPublic } from './pull/channel/public'

export class BXRestPull {
  public readonly config = new BXRestPullConfig()
  public readonly channel = {
    public: new BXRestPullChannelPublic()
  }
} 