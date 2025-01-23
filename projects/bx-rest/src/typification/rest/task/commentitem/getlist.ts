import { iBXRestOrderOption } from '../../base/order-options'
import { filterGenerator } from '../../tasks/base/filter-generator'

export interface BXRestTaskCommentItemGetList {
  FILTER: iBXRestTaskCommentItemFilterList,
  ORDER: iBXRestTaskCommentItemOrderList
}

export interface iBXRestTaskCommentItemFilterList extends filterGenerator<
  {
    ID: number, // идентификатор комментария
    AUTHOR_ID: number, // идентификатор автора комментария
    POST_DATE: Date // дата публикации комментария
  }
> {
  AUTHOR_NAME?: string, // имя автора
}

export interface iBXRestTaskCommentItemOrderList {
  ID?: iBXRestOrderOption, // идентификатор комментария
  AUTHOR_ID?: iBXRestOrderOption, // идентификатор автора комментария
  POST_DATE?: iBXRestOrderOption // дата публикации комментария
  AUTHOR_NAME?: iBXRestOrderOption, // имя автора
  AUTHOR_EMAIL?: iBXRestOrderOption, // почтовый адрес автора
}
