import { Navvy } from '../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../typification/rest/tasks'
import { $add, $addAttachmentByContent, $addAttachmentsFromDisk, $checklist, $complete, $delete, $get, $list, $moveAfter, $moveBefore, $removeAttachments, $renew, $tasks, $template, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyTasksTemplateChecklist {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет пункт чек-листа шаблона задачи.
   */
  add(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $add], param)
  }

  /**
   * Добавляет вложение из содержимого к пункту чек-листа.
   */
  addAttachmentByContent(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $addAttachmentByContent], param)
  }

  /**
   * Добавляет вложения с Диска к пункту чек-листа.
   */
  addAttachmentsFromDisk(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $addAttachmentsFromDisk], param)
  }

  /**
   * Отмечает пункт чек-листа как выполненный.
   */
  complete(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $complete], param)
  }

  /**
   * Удаляет пункт чек-листа.
   */
  delete(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $delete], param)
  }

  /**
   * Возвращает пункт чек-листа по идентификатору.
   */
  get(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $get], param)
  }

  /**
   * Возвращает список пунктов чек-листа.
   */
  list(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $list], param)
  }

  /**
   * Перемещает пункт чек-листа после указанного.
   */
  moveAfter(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $moveAfter], param)
  }

  /**
   * Перемещает пункт чек-листа перед указанным.
   */
  moveBefore(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $moveBefore], param)
  }

  /**
   * Удаляет вложения пункта чек-листа.
   */
  removeAttachments(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $removeAttachments], param)
  }

  /**
   * Возвращает пункт чек-листа в невыполненное состояние.
   */
  renew(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $renew], param)
  }

  /**
   * Обновляет пункт чек-листа.
   */
  update(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $template, $checklist, $update], param)
  }
}

