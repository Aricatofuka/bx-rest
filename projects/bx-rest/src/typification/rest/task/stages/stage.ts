export interface iBXRestTaskStage extends iBXRestTaskStageBase{
  ID: number,
  SORT: number,
  ENTITY_ID: number
}

export interface iBXRestTaskStageHttp extends iBXRestTaskStageBase{
  ID: string,
  SORT: string,
  ENTITY_ID: string
}

export interface iBXRestTaskStageBase{
  TITLE: string,
  COLOR: string,
  SYSTEM_TYPE: null, // ???
  ENTITY_TYPE: string,
  ADDITIONAL_FILTER: [], // ???
  TO_UPDATE: [], // ???
  TO_UPDATE_ACCESS: null // ???
}
