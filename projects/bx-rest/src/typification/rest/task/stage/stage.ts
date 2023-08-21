export interface iTaskStage extends iTaskStageBase{
  ID: number,
  SORT: number,
  ENTITY_ID: number
}

export interface iTaskStageHttp extends iTaskStageBase{
  ID: string,
  SORT: string,
  ENTITY_ID: string
}


export interface iTaskStageBase{
  TITLE: string,
  COLOR: string,
  SYSTEM_TYPE: null, // ???
  ENTITY_TYPE: string,
  ADDITIONAL_FILTER: [], // ???
  TO_UPDATE: [], // ???
  TO_UPDATE_ACCESS: null // ???
}
