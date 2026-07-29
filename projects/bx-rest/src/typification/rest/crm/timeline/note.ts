/** Тип записи, к которой относится заметка. */
export type iBXRestCrmTimelineNoteItemType = 1 | 2

/** Общие параметры методов заметок таймлайна. */
export interface iBXRestParamCrmTimelineNote {
  /** Идентификатор типа CRM-элемента, к которому относится запись. */
  ownerTypeId: number
  /** Идентификатор CRM-элемента, к которому относится запись. */
  ownerId: number
  /** `1` — запись истории таймлайна, `2` — дело CRM. */
  itemType: iBXRestCrmTimelineNoteItemType
  /** Идентификатор записи истории или дела — в зависимости от `itemType`. */
  itemId: number
}

/** Параметры сохранения заметки. */
export interface iBXRestParamCrmTimelineNoteSave extends iBXRestParamCrmTimelineNote {
  /** Текст заметки. Повторный вызов обновляет существующую заметку. */
  text: string
}

/** Заметка к записи таймлайна или делу CRM. */
export interface iBXRestCrmTimelineNote {
  /** Текст заметки. */
  text: string
  /** Идентификатор создавшего заметку пользователя. */
  createdById: number
  /** Дата и время создания в формате ISO 8601. */
  createdTime: string
  /** Идентификатор последнего изменившего заметку пользователя. */
  updatedById: number
  /** Дата и время последнего изменения в формате ISO 8601. */
  updatedTime: string
}
