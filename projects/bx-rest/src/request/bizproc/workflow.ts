import { Injectable } from '@angular/core'
import { $bizproc, $instances, $start, $terminate, $workflow, $kill} from '../../consts/part-name-methods'
import { BXRestBizprocWorkflowInstance } from './workflow/instance'
import { BXRestBizprocWorkflowTemplate } from './workflow/template'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestParamBizprocWorkflowStart } from '../../typification/rest/bizproc/workflow/start'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizprocWorkflow {

  protected url = {
    instances: [$bizproc, $workflow, $instances], // Возвращает список запущенных бизнес-процессов // TODO: реализовать
    terminate: [$bizproc, $workflow, $terminate], // Останавливает активный Бизнес-процесс // TODO: реализовать
    start: [$bizproc, $workflow, $start], // Запускает Бизнес-процесс
    kill: [$bizproc, $workflow, $kill], // Удаляет запущенный бизнес-процесс // TODO: реализовать
  }

  constructor(
    public instances: BXRestBizprocWorkflowInstance,
    public template: BXRestBizprocWorkflowTemplate,
    private http: HttpBXServices
  ) {
  }

  start(param: iBXRestParamBizprocWorkflowStart)  {
    return this.http.post<string>(this.url.start, param)
  }

}
