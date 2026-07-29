import { iBXRestPagination } from '../../base/api-pagination-bx'
import { iBXRestCrmFieldDescription } from '../enum'
import {
  iBXRestCrmTimelineAttachedFile,
  iBXRestCrmTimelineSortOrder
} from './common'

/** Изображение, если прикрепленный к комментарию файл является картинкой. */
export interface iBXRestCrmTimelineCommentFileImage {
  /** Ширина изображения в пикселях. */
  width: number
  /** Высота изображения в пикселях. */
  height: number
}

/** Файл, прикрепленный к комментарию таймлайна. */
export interface iBXRestCrmTimelineCommentFile {
  /** Идентификатор файла. */
  id: number
  /** Дата и время добавления в формате ISO 8601. */
  date: string
  /** Тип файла, например `image`. */
  type: string
  /** Имя файла. */
  name: string
  /** Размер файла в байтах. */
  size: number
  /** Размеры изображения; присутствуют только у изображений. */
  image?: iBXRestCrmTimelineCommentFileImage
  /** Идентификатор автора файла. */
  authorId: number
  /** Имя автора файла. */
  authorName: string
  /** URL предварительного просмотра. */
  urlPreview: string
  /** URL просмотра файла. */
  urlShow: string
  /** URL скачивания файла. */
  urlDownload: string
}

/** Комментарий таймлайна в исходном формате REST API. */
export interface iBXRestCrmTimelineComment {
  /** Идентификатор комментария. */
  ID: string
  /** Идентификатор элемента CRM. */
  ENTITY_ID: string
  /** Тип элемента CRM: `lead`, `deal`, `contact`, `company`, `order` или `dynamic_*`. */
  ENTITY_TYPE: string
  /** Дата и время создания в формате ISO 8601. */
  CREATED: string
  /** Текст комментария. */
  COMMENT: string
  /** Идентификатор автора. */
  AUTHOR_ID: string
  /** Прикрепленные файлы, индексированные их идентификаторами. */
  FILES: Record<string, iBXRestCrmTimelineCommentFile>
}

/** Поля нового комментария таймлайна. */
export interface iBXRestCrmTimelineCommentAddFields {
  /** Идентификатор элемента CRM. */
  ENTITY_ID: number
  /** Тип элемента CRM: `lead`, `deal`, `contact`, `company`, `order` или `dynamic_*`. */
  ENTITY_TYPE: string
  /** Текст комментария. */
  COMMENT: string
  /** Файлы в формате `[имя, содержимое Base64]`. */
  FILES?: iBXRestCrmTimelineAttachedFile[]
}

/** Параметры `crm.timeline.comment.add`. */
export interface iBXRestParamCrmTimelineCommentAdd {
  /**
   * Поля комментария.
   *
   * Ключ должен называться именно `fields` в нижнем регистре.
   */
  fields: iBXRestCrmTimelineCommentAddFields
}

/** Изменяемые поля комментария таймлайна. */
export interface iBXRestCrmTimelineCommentUpdateFields {
  /** Новый текст комментария. */
  COMMENT?: string
  /** Новый список файлов в формате `[имя, содержимое Base64]`. */
  FILES?: iBXRestCrmTimelineAttachedFile[]
}

/** Параметры `crm.timeline.comment.update`. */
export interface iBXRestParamCrmTimelineCommentUpdate {
  /** Идентификатор комментария. */
  id: number
  /**
   * Изменяемые поля.
   *
   * Ключ должен называться именно `fields` в нижнем регистре.
   */
  fields: iBXRestCrmTimelineCommentUpdateFields
  /** Тип связанного объекта CRM, например `2` для сделки. */
  ownerTypeId?: number
  /** Идентификатор связанного элемента CRM. */
  ownerId?: number
}

/** Параметры получения комментария. */
export interface iBXRestParamCrmTimelineCommentGet {
  /** Идентификатор комментария. */
  id: number
}

/** Параметры списка комментариев. */
export interface iBXRestParamCrmTimelineCommentList extends iBXRestPagination {
  /** Возвращаемые поля. Если не указаны, возвращаются все поля. */
  select?: (keyof iBXRestCrmTimelineComment)[]
  /** Обязательная привязка комментариев к элементу CRM. */
  filter: {
    /** Идентификатор элемента CRM. */
    ENTITY_ID: number
    /** Тип элемента CRM, например `deal`, `lead`, `contact` или `company`. */
    ENTITY_TYPE: string
  }
  /** Сортировка по `ID`, `CREATED` и/или `AUTHOR_ID`. */
  order?: Partial<Record<'ID' | 'CREATED' | 'AUTHOR_ID', iBXRestCrmTimelineSortOrder>>
}

/** Параметры удаления комментария. */
export interface iBXRestParamCrmTimelineCommentDelete extends iBXRestParamCrmTimelineCommentGet {
  /** Тип связанного объекта CRM. Позволяет удалить только указанную привязку. */
  ownerTypeId?: number
  /** Идентификатор связанного элемента CRM. Используется вместе с `ownerTypeId`. */
  ownerId?: number
}

/** Описание полей комментария, возвращаемое `crm.timeline.comment.fields`. */
export type iBXRestCrmTimelineCommentFields = Record<
  keyof iBXRestCrmTimelineComment,
  iBXRestCrmFieldDescription
>
