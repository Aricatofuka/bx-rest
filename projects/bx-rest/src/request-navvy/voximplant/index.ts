import { BXRestNavvyVoxImplantCallback } from './callback'
import { BXRestNavvyVoxImplantInfoCall } from './infocall'
import { BXRestNavvyVoxImplantLine } from './line'
import { BXRestNavvyVoxImplantSip } from './sip'
import { BXRestNavvyVoxImplantTts } from './tts'
import { BXRestNavvyVoxImplantStatistic } from './statistic'
import { BXRestNavvyVoxImplantUrl } from './url'
import { BXRestNavvyVoxImplantUser } from './user'

export class BXRestNavvyVoxImplant  {
  public readonly callback = new BXRestNavvyVoxImplantCallback()
  public readonly infocall = new BXRestNavvyVoxImplantInfoCall()
  public readonly line = new BXRestNavvyVoxImplantLine()
  public readonly sip = new BXRestNavvyVoxImplantSip()
  public readonly statistic = new BXRestNavvyVoxImplantStatistic()
  public readonly tts = new BXRestNavvyVoxImplantTts()
  public readonly url = new BXRestNavvyVoxImplantUrl()
  public readonly user = new BXRestNavvyVoxImplantUser()
}

