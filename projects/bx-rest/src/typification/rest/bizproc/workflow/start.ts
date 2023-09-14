export interface iBXRestParamBizprocWorkflowStart {
  TEMPLATE_ID: number, //	Идентификатор шаблона БП
  DOCUMENT_ID: string[], //	Идентификатор документа БП
  PARAMETERS: any //	Значения параметров БП (если шаблон с параметрами) TODO: Описать нормально
}
