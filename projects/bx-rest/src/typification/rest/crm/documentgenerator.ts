import { iBXRestPagination } from '../base/api-pagination-bx'
import { iBXRestYesNo } from '../base/yes-no'

/** Произвольные значения полей шаблона или документа. */
export type iBXRestDocumentGeneratorValues = Record<string, unknown>

/** Настройки генератора последовательных номеров. */
export interface iBXRestCrmDocumentGeneratorNumeratorSequenceSettings {
  start?: number
  step?: number
  length?: number
  padString?: string
  periodicBy?: '' | 'day' | 'month' | 'year' | null
  timezone?: string | null
  isDirectNumeration?: boolean
}

/** Настройки нумератора документов. */
export interface iBXRestCrmDocumentGeneratorNumeratorSettings {
  Bitrix_Main_Numerator_Generator_SequentNumberGenerator?: iBXRestCrmDocumentGeneratorNumeratorSequenceSettings
}

/** Нумератор документов. */
export interface iBXRestCrmDocumentGeneratorNumerator {
  id: number | string
  name: string
  template: string
  code?: string | null
  settings?: iBXRestCrmDocumentGeneratorNumeratorSettings
}

export interface iBXRestParamCrmDocumentGeneratorNumeratorAdd {
  fields: {
    name: string
    template: string
    settings?: iBXRestCrmDocumentGeneratorNumeratorSettings
  }
}

export interface iBXRestParamCrmDocumentGeneratorNumeratorUpdate {
  id: number
  fields: {
    name?: string
    template?: string
    settings?: iBXRestCrmDocumentGeneratorNumeratorSettings
  }
}

export interface iBXRestParamCrmDocumentGeneratorNumeratorGet {
  id: number
}

export type iBXRestParamCrmDocumentGeneratorNumeratorList = iBXRestPagination

export interface iBXRestParamCrmDocumentGeneratorNumeratorDelete {
  id: number
}

/** Файл шаблона в формате `[имя файла, содержимое Base64]`. */
export type iBXRestCrmDocumentGeneratorTemplateFile = [fileName: string, base64Content: string]

/** Поля шаблона документа. */
export interface iBXRestCrmDocumentGeneratorTemplateFields {
  name: string
  file: iBXRestCrmDocumentGeneratorTemplateFile
  numeratorId: number
  region: string
  entityTypeId: (number | string)[]
  users?: string[]
  active?: iBXRestYesNo
  withStamps?: iBXRestYesNo
  sort?: number
}

/** Шаблон документа. */
export interface iBXRestCrmDocumentGeneratorTemplate {
  id: number | string
  name: string
  region: string
  code?: string | null
  download?: string
  downloadMachine?: string
  active?: iBXRestYesNo
  moduleId?: string
  numeratorId?: number | string
  withStamps?: iBXRestYesNo
  users?: string[] | Record<string, string>
  isDeleted?: iBXRestYesNo
  sort?: number | string
  entityTypeId?: string[]
  createTime?: string
  updateTime?: string
}

export interface iBXRestParamCrmDocumentGeneratorTemplateAdd {
  fields: iBXRestCrmDocumentGeneratorTemplateFields
}

export interface iBXRestParamCrmDocumentGeneratorTemplateUpdate {
  id: number
  fields: Partial<iBXRestCrmDocumentGeneratorTemplateFields>
}

export interface iBXRestParamCrmDocumentGeneratorTemplateGet {
  id: number
}

export interface iBXRestParamCrmDocumentGeneratorTemplateList extends iBXRestPagination {
  select?: string[]
  filter?: Record<string, unknown>
  order?: Record<string, 'ASC' | 'DESC'>
}

export interface iBXRestParamCrmDocumentGeneratorTemplateDelete {
  id: number
}

export interface iBXRestParamCrmDocumentGeneratorTemplateGetFields {
  id: number
  entityTypeId: number
  entityId?: number
  values?: iBXRestDocumentGeneratorValues
}

/** Описание вычисляемого поля шаблона или документа. */
export interface iBXRestCrmDocumentGeneratorField {
  title?: string
  value?: unknown
  required?: iBXRestYesNo
  group?: string[]
  chain?: unknown
  default?: unknown
  type?: string
  [key: string]: unknown
}

/** Сводная информация о товарах документа. */
export interface iBXRestCrmDocumentGeneratorDocumentProducts {
  currencyId?: string
  totalSum?: string
  totalRows?: number
}

/** Документ генератора документов CRM. */
export interface iBXRestCrmDocumentGeneratorDocument {
  id: number | string
  title: string
  number: string
  createTime?: string
  updateTime?: string
  createdBy?: number | string | null
  updatedBy?: number | string | null
  changeStampsEnabled?: boolean
  changeStampsDisabledReason?: string
  changeQrCodeEnabled?: boolean
  qrCodeEnabled?: boolean
  changeQrCodeDisabledReason?: string
  products?: iBXRestCrmDocumentGeneratorDocumentProducts
  stampsEnabled?: boolean
  isTransformationError?: boolean
  values?: iBXRestDocumentGeneratorValues
  templateId?: number | string
  entityId?: number | string
  entityTypeId?: number | string
  fileId?: number | string
  imageId?: number | string
  pdfId?: number | string
  emailDiskFile?: number | string
  pullTag?: string
  downloadUrl?: string
  downloadUrlMachine?: string
  publicUrl?: string | null
  imageUrl?: string
  imageUrlMachine?: string
  pdfUrl?: string
  pdfUrlMachine?: string
}

export interface iBXRestParamCrmDocumentGeneratorDocumentAdd {
  templateId: number
  entityTypeId: number
  entityId: number
  values?: iBXRestDocumentGeneratorValues
  stampsEnabled?: 0 | 1
  fields?: Record<string, iBXRestCrmDocumentGeneratorField>
}

export interface iBXRestParamCrmDocumentGeneratorDocumentUpdate {
  id: number
  values?: iBXRestDocumentGeneratorValues
  stampsEnabled?: 0 | 1
}

export interface iBXRestParamCrmDocumentGeneratorDocumentGet {
  id: number
}

export interface iBXRestParamCrmDocumentGeneratorDocumentList extends iBXRestPagination {
  select?: string[]
  filter?: Record<string, unknown>
  order?: Record<string, 'ASC' | 'DESC'>
}

export interface iBXRestParamCrmDocumentGeneratorDocumentDelete {
  id: number
}

export interface iBXRestParamCrmDocumentGeneratorDocumentEnablePublicUrl {
  id: number
  status?: 0 | 1
}

export interface iBXRestParamCrmDocumentGeneratorDocumentUpload {
  fields: {
    entityTypeId: number
    entityId: number
    fileContent: string
    region: string
    title: string
    number: string
    pdfContent?: string
    imageContent?: string
  }
}

export interface iBXRestParamCrmDocumentGeneratorDocumentGetFields {
  id: number
  values?: iBXRestDocumentGeneratorValues
}
