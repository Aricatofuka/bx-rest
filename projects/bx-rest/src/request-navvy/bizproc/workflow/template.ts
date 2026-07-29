import {
  $add,
  $bizproc,
  $delete,
  $list,
  $template,
  $update,
  $workflow
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestBizprocWorkflowTemplate,
  iBXRestParamBizprocWorkflowTemplateAdd,
  iBXRestParamBizprocWorkflowTemplateDelete,
  iBXRestParamBizprocWorkflowTemplateList,
  iBXRestParamBizprocWorkflowTemplateUpdate
} from '../../../typification/rest/bizproc'

/** Шаблоны бизнес-процессов (`bizproc.workflow.template.*`). */
export class BXRestNavvyBizProcWorkflowTemplate {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Добавляет шаблон из файла `.bpt`. */
    add: [$bizproc, $workflow, $template, $add],
    /** Обновляет шаблон, созданный текущим приложением. */
    update: [$bizproc, $workflow, $template, $update],
    /** Удаляет шаблон, созданный текущим приложением. */
    delete: [$bizproc, $workflow, $template, $delete],
    /** Возвращает список шаблонов. */
    list: [$bizproc, $workflow, $template, $list]
  }

  /**
   * Добавляет шаблон бизнес-процесса из файла `.bpt`.
   *
   * Метод работает только в контексте приложения и привязывает новый шаблон
   * к вызвавшему его приложению.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/template/bizproc-workflow-template-add.html
   */
  add(param: iBXRestParamBizprocWorkflowTemplateAdd) {
    return this.Navvy.simple<
      number,
      number,
      iBXRestParamBizprocWorkflowTemplateAdd
    >(this.url.add, param)
  }

  /**
   * Обновляет шаблон, ранее созданный текущим приложением.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/template/bizproc-workflow-template-update.html
   */
  update(param: iBXRestParamBizprocWorkflowTemplateUpdate) {
    return this.Navvy.simple<
      number,
      number,
      iBXRestParamBizprocWorkflowTemplateUpdate
    >(this.url.update, param)
  }

  /**
   * Удаляет шаблон, ранее созданный текущим приложением.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/template/bizproc-workflow-template-delete.html
   */
  delete(param: iBXRestParamBizprocWorkflowTemplateDelete) {
    return this.Navvy.simple<
      null,
      null,
      iBXRestParamBizprocWorkflowTemplateDelete
    >(this.url.delete, param)
  }

  /**
   * Возвращает список шаблонов с выборкой полей, фильтрацией и сортировкой.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/template/bizproc-workflow-template-list.html
   */
  list(param: iBXRestParamBizprocWorkflowTemplateList = {}) {
    return this.Navvy.pagNav<
      iBXRestBizprocWorkflowTemplate,
      iBXRestBizprocWorkflowTemplate,
      iBXRestParamBizprocWorkflowTemplateList
    >(this.url.list, param)
  }
}
