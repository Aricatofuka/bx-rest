/** Parameters for the company signature-provider list. */
export type iBXRestParamSignB2ECompanyProviderList = (
  | { companyUuid: string; companyCrmId?: never }
  | { companyUuid?: never; companyCrmId: number }
) & {
  language?: string
  limit?: number
  offset?: number
}

/** Parameters for `sign.b2e.document.get`. */
export interface iBXRestParamSignB2EDocumentGet {
  uid: string
}
