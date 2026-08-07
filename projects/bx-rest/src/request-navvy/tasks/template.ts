import { Navvy } from '../../services/navvy'
import { iBXRestParamTasksTemplateFields, iBXRestParamTasksTemplateId, iBXRestParamTasksTemplateUpdate, iBXRestTasksObject } from '../../typification/rest/tasks'
import { $add, $delete, $fields, $get, $tasks, $template, $update } from '../../consts/part-name-methods'
import { BXRestNavvyTasksTemplateChecklist } from './template/checklist'

export class BXRestNavvyTasksTemplate {
  private readonly Navvy = new Navvy()
  public readonly checklist = new BXRestNavvyTasksTemplateChecklist()

  add(param: iBXRestParamTasksTemplateFields) {
    return this.Navvy.simple<
      iBXRestTasksObject,
      iBXRestTasksObject,
      iBXRestParamTasksTemplateFields
    >([$tasks, $template, $add], param)
  }

  delete(param: iBXRestParamTasksTemplateId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTasksTemplateId>(
      [$tasks, $template, $delete], param
    )
  }

  fields() {
    return this.Navvy.simple<iBXRestTasksObject>([$tasks, $template, $fields])
  }

  get(param: iBXRestParamTasksTemplateId) {
    return this.Navvy.simple<
      iBXRestTasksObject,
      iBXRestTasksObject,
      iBXRestParamTasksTemplateId
    >([$tasks, $template, $get], param)
  }

  update(param: iBXRestParamTasksTemplateUpdate) {
    return this.Navvy.simple<
      iBXRestTasksObject,
      iBXRestTasksObject,
      iBXRestParamTasksTemplateUpdate
    >([$tasks, $template, $update], param)
  }
}

