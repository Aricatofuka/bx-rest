/*
 * Public API Surface of bx-rest
 */
export { BX_REST_SETTINGS } from './settings'
export { BXRestMapResult } from './functions/mapResult'
export { BXRest, BXRestNavvy, BXRestMap } from './rest'
export { Navvy } from './services/navvy'
export { Map as BXMap } from './map'
export * as partNameMethods from './consts/part-name-methods'
export { HttpBXServices as BXRestRequest } from './services/http/HttpBX'
export { BaseMapServices as BXRestMapBase } from './map/base'
export { instanceOfiBXRestAnswerSuccess as isBXRestAnswerSuccess } from './functions/mapResult'