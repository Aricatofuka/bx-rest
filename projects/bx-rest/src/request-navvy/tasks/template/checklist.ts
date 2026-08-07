import { Navvy } from '../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../typification/rest/tasks'
import { $add, $addAttachmentByContent, $addAttachmentsFromDisk, $checklist, $complete, $delete, $get, $list, $moveAfter, $moveBefore, $removeAttachments, $renew, $tasks, $template, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyTasksTemplateChecklist {
  private readonly Navvy = new Navvy()

  add(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $add], param)
  }

  addAttachmentByContent(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $addAttachmentByContent], param)
  }

  addAttachmentsFromDisk(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $addAttachmentsFromDisk], param)
  }

  complete(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $complete], param)
  }

  delete(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $delete], param)
  }

  get(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $get], param)
  }

  list(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $list], param)
  }

  moveAfter(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $moveAfter], param)
  }

  moveBefore(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $moveBefore], param)
  }

  removeAttachments(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $removeAttachments], param)
  }

  renew(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $renew], param)
  }

  update(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $update], param)
  }
}

