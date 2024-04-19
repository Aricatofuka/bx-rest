import { Injectable } from '@angular/core'
import {
  iBXRestParamBizprocWorkflowTemplateList
} from '../../../typification/rest/bizproc/workflow/template/list'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { methods } from '../../../methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizProcWorkflowTemplate {

  protected url = methods.bizProc.workflow.terminate

  constructor(private http: HttpBXServices) {
  }

  // list(param: iBXRestParamBizprocWorkflowTemplateList = {select: [], filter: {}}){
  //   return this.http.post(this.url.list, param)
  // }
}
