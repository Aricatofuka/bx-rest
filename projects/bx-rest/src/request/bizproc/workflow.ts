import { Injectable } from '@angular/core'
import { BXRestBizProcWorkflowInstance } from './workflow/instance'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestParamBizprocWorkflowStart } from '../../typification/rest/bizproc/workflow/start'
import { methods } from '../../typification/base/methods'
import { BXRestBizProcWorkflowTemplate } from './workflow/template'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizProcWorkflow {

  protected url = methods.bizProc.workflow

  constructor(
    public instances: BXRestBizProcWorkflowInstance,
    public template: BXRestBizProcWorkflowTemplate,
    private http: HttpBXServices
  ) {
  }

  start(param: iBXRestParamBizprocWorkflowStart)  {
    return this.http.post<string>(this.url.start, param)
  }

}
