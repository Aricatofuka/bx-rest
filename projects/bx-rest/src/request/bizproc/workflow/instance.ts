import { Injectable } from '@angular/core'
import { $bizproc, $instances, $workflow, $list} from '../../../consts/part-name-metods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizprocWorkflowInstance {

  url = {
    list: [$bizproc, $workflow, $instances, $list], // Возвращает список запущенных бизнес-процессов. Алиас bizproc.workflow.instances
  }

}
