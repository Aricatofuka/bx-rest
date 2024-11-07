/**
 * Public API Surface of bx-rest
 */
export { BX_REST_SETTINGS } from './settings'
export { BXRestMapResult } from './functions/mapResult'
export { BXRest } from './rest/base'
export { BXRestNavvy } from './rest/navvy'
export { BXRestMap } from './rest/map'
export { Navvy } from './services/navvy'
export { Map as BXMap } from './map'
export { HttpBXServices as BXRestRequest } from './services/http/HttpBX'
export { BaseMapServices as BXRestMapBase } from './map/base'
export { instanceOfiBXRestAnswerSuccess as isBXRestAnswerSuccess } from './functions/mapResult'
export { HttpNavvyServices } from './services/http/httpNavvy'
export * as partNameMethods from './consts/part-name-methods'
export { provideBXRestSettings } from './provide'
