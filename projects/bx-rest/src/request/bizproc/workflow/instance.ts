import { Injectable } from '@angular/core'
import { $bizproc, $instances, $workflow, $list} from '../../../consts/part-name-methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizprocWorkflowInstance {

  protected url = {
    list: [$bizproc, $workflow, $instances, $list], // Возвращает список запущенных бизнес-процессов. Алиас bizproc.workflow.instances
  }

}
