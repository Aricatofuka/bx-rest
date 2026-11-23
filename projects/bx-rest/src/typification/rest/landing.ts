/** Parameters for landing block methods. */
export interface iBXRestParamLandingBlockGetList {
  lid: number | number[]
  scope?: string
  params?: {
    edit_mode?: boolean | number
    deleted?: boolean | number
    get_content?: boolean | number
  }
}

export interface iBXRestParamLandingBlockGetManifest {
  lid: number
  block: string
  params?: {
    edit_mode?: boolean | number
  }
}

/** Parameters for `landing.syspage.get`. */
export interface iBXRestParamLandingSysPageGet {
  id: number
  active?: boolean
}
