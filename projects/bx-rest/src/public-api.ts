/**
 * Public API Surface of bx-rest
 */
export { BXRestSettings } from './settings'
export { BXRestMapResult } from './functions/mapResult'
/**
 * @deprecated
 * use BXRestNavvy
 */
export { BXRest } from './rest/base'
export { BXRestNavvy } from './rest/navvy'
export { BXRestMap } from './rest/map'
export { Navvy } from './services/navvy'
export { HttpBXServices as BXRestRequest } from './services/http/HttpBX'
export { instanceOfiBXRestAnswerSuccess as isBXRestAnswerSuccess } from './functions/mapResult'
export { HttpNavvyServices } from './services/http/httpNavvy'
export * as partNameMethods from './consts/part-name-methods'
export * as BXBaseServices from './services/base'