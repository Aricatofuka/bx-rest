export interface iBXRestPullChannelPublicGet extends iBXRestPullChannelPublicGetBase{
  start: Date
  end: Date
}

export interface iBXRestPullChannelPublicGetHttp extends iBXRestPullChannelPublicGetBase{
  start: string
  end: string
}

export interface iBXRestPullChannelPublicGetBase {
  user_id: number
  public_id: string
  signature: string
} 