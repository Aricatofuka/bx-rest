import { iBXRestParamSort } from '../base/sort'
import { iBXRestSonetGroupFieldsFilter, iBXRestSonetGroupFieldsOrder, iBXRestSonetGroupFieldsSelect } from './base'
import { Modify } from '../../base/modyfy'
import { iBXRestFilterGenerator } from '../base/filter-generator'

export interface iBXRestParamSonetGroupGet {
  FILTER?: iBXRestParamSonetGroupGetFilterWithParam,
  ORDER?: iBXRestParamSonetOrderWorkgroup
}

export type iBXRestParamSonetGroupGetFilterWithParam = iBXRestFilterGenerator<iBXRestParamSonetGroupGetFilter>

export interface iBXRestParamSonetGroupGetFilter extends iBXRestParamSonetFilerWorkgroup{
  NAME: string
}

export type iBXRestParamSonetFilerWorkgroup = Partial<Record<iBXRestSonetGroupFieldsFilter, string | string[] | number | number[] | Date>>

export type iBXRestParamSonetOrderWorkgroup = Partial<Record<iBXRestSonetGroupFieldsOrder, iBXRestParamSort>>

export type iBXRestSonetGroupGetHttp = Record<iBXRestSonetGroupFieldsSelect, string>

export type iBXRestSonetGroupGet = Modify<iBXRestSonetGroupGetHttp , {
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
