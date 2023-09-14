import { Injectable } from '@angular/core'
import { $bizproc, $template, $workflow, $list, $add, $delete, $update } from '../../../consts/part-name-metods'
import {
  iBXRestParamBizprocWorkflowTemplateList
} from '../../../typification/rest/bizproc/workflow/template/list'
import HttpBXServices from '../../../services/http/HttpBX'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizprocWorkflowTemplate {

  url = {
    add: [$bizproc, $workflow, $template, $add],	// Добавляет шаблон Бизнес-процесса // TODO: реализовать
    delete: [$bizproc, $workflow, $template, $delete], // Удаляет шаблон Бизнес-процесса // TODO: реализовать
    update: [$bizproc, $workflow, $template, $update],	// Изменяет шаблон Бизнес-процесса // TODO: реализовать
    list: [$bizproc, $workflow, $template, $list] // Возвращает список шаблонов Бизнес-процессов, установленных на сайте
  }

  constructor(private http: HttpBXServices) {
  }

  list(param: iBXRestParamBizprocWorkflowTemplateList = {select: [], filter: {}}){
    return this.http.post(this.url.list, param)
  }
}
