import {
  $crm,
  $delete,
  $get,
  $note,
  $save,
  $timeline
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmTimelineNote,
  iBXRestParamCrmTimelineNote,
  iBXRestParamCrmTimelineNoteSave
} from '../../../typification/rest/crm'

/** Заметки к записям таймлайна и делам (`crm.timeline.note.*`). */
export class BXRestNavvyCrmTimelineNote {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Возвращает заметку к записи таймлайна или делу. */
    get: [$crm, $timeline, $note, $get],
    /** Создает или обновляет заметку. */
    save: [$crm, $timeline, $note, $save],
    /** Удаляет заметку. */
    delete: [$crm, $timeline, $note, $delete]
  }

  /**
   * Возвращает заметку к записи истории таймлайна или делу CRM.
   *
   * В `itemType` передайте `1` для записи истории или `2` для дела.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/note/crm-timeline-note-get.html
   */
  get(param: iBXRestParamCrmTimelineNote) {
    return this.Navvy.simple<
      iBXRestCrmTimelineNote,
      iBXRestCrmTimelineNote,
      iBXRestParamCrmTimelineNote
    >(this.url.get, param)
  }

  /**
   * Создает заметку или заменяет текст существующей.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/note/crm-timeline-note-save.html
   */
  save(param: iBXRestParamCrmTimelineNoteSave) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmTimelineNoteSave>(
      this.url.save,
      param
    )
  }

  /**
   * Удаляет заметку у записи истории таймлайна или дела CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/note/crm-timeline-note-delete.html
   */
  delete(param: iBXRestParamCrmTimelineNote) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmTimelineNote>(
      this.url.delete,
      param
    )
  }
}
