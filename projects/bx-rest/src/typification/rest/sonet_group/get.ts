import { iBXRestParamSort } from '../base/sort'
import { iBXRestSonetGroupFieldsFilter, iBXRestSonetGroupFieldsOrder, iBXRestSonetGroupFieldsSelect } from './base'
import { Modify } from '../../base/modyfy'
import { iBXRestFilterGenerator } from "../base/filterGenerator";


export interface iBXRestParamSonetGroupGet {
  FILTER?: iBXRestParamSonetGroupGetFilterWithParam,
  ORDER?: iBXRestParamSonetOrderWorkgroup
}

export interface iBXRestParamSonetGroupGetFilterWithParam extends iBXRestFilterGenerator<iBXRestParamSonetGroupGetFilter> {}

export interface iBXRestParamSonetGroupGetFilter extends iBXRestParamSonetFilerWorkgroup{
  NAME: string
}

export type iBXRestParamSonetFilerWorkgroup = {
  [key in iBXRestSonetGroupFieldsFilter]?: string | string[] | number | number[] | Date
}

export type iBXRestParamSonetOrderWorkgroup = {
  [key in iBXRestSonetGroupFieldsOrder]?: iBXRestParamSort
}

export type iBXRestParamSonetHttp = Record<iBXRestSonetGroupFieldsSelect, string>

export type iBXRestParamSonet = Modify<iBXRestParamSonetHttp , {
  ID: number
  DATE_CREATE: Date
  DATE_UPDATE: Date
  ACTIVE: boolean
  VISIBLE: boolean
  OPENED: boolean
  CLOSED: boolean
  SUBJECT_ID:number
  OWNER_ID: number
  NUMBER_OF_MEMBERS: number
  DATE_ACTIVITY: Date
  PROJECT: boolean
  IS_EXTRANET: boolean
}>
