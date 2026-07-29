import {
  $add,
  $comment,
  $crm,
  $delete,
  $get,
  $list,
  $timeline,
  $update
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmTimelineComment,
  iBXRestCrmTimelineCommentFields,
  iBXRestParamCrmTimelineCommentAdd,
  iBXRestParamCrmTimelineCommentDelete,
  iBXRestParamCrmTimelineCommentGet,
  iBXRestParamCrmTimelineCommentList,
  iBXRestParamCrmTimelineCommentUpdate
} from '../../../typification/rest/crm'

/** Комментарии таймлайна (`crm.timeline.comment.*`). */
export class BXRestNavvyCrmTimelineComment {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Добавляет новый комментарий в таймлайн. */
    add: [$crm, $timeline, $comment, $add],
    /** Обновляет текст и/или файлы комментария. */
    update: [$crm, $timeline, $comment, $update],
    /** Возвращает комментарий по идентификатору. */
    get: [$crm, $timeline, $comment, $get],
    /** Возвращает комментарии указанного элемента CRM. */
    list: [$crm, $timeline, $comment, $list],
    /** Удаляет комментарий или его отдельную привязку. */
    delete: [$crm, $timeline, $comment, $delete],
    /** Возвращает формальное описание полей комментария. */
    fields: [$crm, $timeline, $comment, 'fields']
  }

  /**
   * Добавляет новый комментарий в таймлайн элемента CRM.
   *
   * Содержимое файлов передается в Base64. Начиная с CRM 23.100.0 внешний ключ
   * параметров должен называться именно `fields` в нижнем регистре.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/comments/crm-timeline-comment-add.html
   */
  add(param: iBXRestParamCrmTimelineCommentAdd) {
    return this.Navvy.simple<number, number, iBXRestParamCrmTimelineCommentAdd>(
      this.url.add,
      param
    )
  }

  /**
   * Обновляет текст и/или прикрепленные файлы комментария.
   *
   * `ownerTypeId` и `ownerId` уточняют элемент CRM, когда комментарий связан
   * сразу с несколькими элементами.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/comments/crm-timeline-comment-update.html
   */
  update(param: iBXRestParamCrmTimelineCommentUpdate) {
    return this.Navvy.simple<number, number, iBXRestParamCrmTimelineCommentUpdate>(
      this.url.update,
      param
    )
  }

  /**
   * Возвращает комментарий по его идентификатору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/comments/crm-timeline-comment-get.html
   */
  get(param: iBXRestParamCrmTimelineCommentGet) {
    return this.Navvy.simple<
      iBXRestCrmTimelineComment,
      iBXRestCrmTimelineComment,
      iBXRestParamCrmTimelineCommentGet
    >(this.url.get, param)
  }

  /**
   * Возвращает комментарии указанного элемента CRM с выборкой полей,
   * сортировкой и постраничной навигацией.
   *
   * Размер страницы REST API фиксирован и равен 50 записям.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/comments/crm-timeline-comment-list.html
   */
  list(param: iBXRestParamCrmTimelineCommentList) {
    return this.Navvy.pagNav<
      iBXRestCrmTimelineComment,
      iBXRestCrmTimelineComment,
      iBXRestParamCrmTimelineCommentList
    >(this.url.list, param)
  }

  /**
   * Удаляет комментарий.
   *
   * Если передать `ownerTypeId` и `ownerId`, у комментария с несколькими
   * связями будет удалена только привязка к указанному элементу.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/comments/crm-timeline-comment-delete.html
   */
  delete(param: iBXRestParamCrmTimelineCommentDelete) {
    return this.Navvy.simple<null, null, iBXRestParamCrmTimelineCommentDelete>(
      this.url.delete,
      param
    )
  }

  /**
   * Возвращает описание всех полей комментария таймлайна.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/comments/crm-timeline-comment-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmTimelineCommentFields>(this.url.fields)
  }
}
