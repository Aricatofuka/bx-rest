import { iBXRestBlogPostEssence, iBXRestBlogPostEssenceHttp } from './essence'
import { iBXRestYesNo } from '../../base/YesNo'
import { iBXRestBaseParam } from "../../support/param";

export interface iBXRestParamBlogPostGet extends iBXRestBaseParam {
  POST_ID?: number, // Числовой ID сообщения для фильтрации
  LOG_RIGHTS?: string[], // Фильтрация по получателю. Значением фильтра может быть как строка (конкретное значение прав), так и массив.
  // Права на просмотр сообщения (опционально), по умолчанию - array("UA") - всем авторизованным пользователям.
  // Можно использовать значения:
  // SG<X> - рабочая группа с ID=X;
  // U<X> - пользователь с ID=X;
  // DR<X> - отдел с ID=X, включая подразделы;
  // UA - все авторизованные пользователи.
  // G - группа пользователей (например, G2).
}


export interface iBXRestBlogPost extends iBXRestBlogPostBase {
  AUTHOR_ID: number
  BLOG_ID: number
  CATEGORY_ID: number
  DATE_PUBLISH: Date
  ENABLE_COMMENTS: boolean
  HAS_COMMENT_IMAGES: boolean
  HAS_SOCNET_ALL: boolean
  HAS_IMAGES: boolean
  HAS_PROPS: boolean
  HAS_TAGS: boolean
  ID: number,
  MICRO: boolean,
  NUM_COMMENTS: number,
  UF_ANSWER_ID: iBXRestBlogPostEssence | undefined
  UF_BLOG_POST_DOC: iBXRestBlogPostEssence | undefined
  UF_BLOG_POST_FILE: iBXRestBlogPostEssence | undefined
  UF_BLOG_POST_F_EDIT: iBXRestBlogPostEssence | undefined
  UF_BLOG_POST_IMPRTNT: iBXRestBlogPostEssence | undefined
  UF_BLOG_POST_URL_PRV: iBXRestBlogPostEssence | undefined
  UF_BLOG_POST_VOTE: iBXRestBlogPostEssence | undefined
  UF_CATEGORY_CODE: iBXRestBlogPostEssence | undefined
  UF_GRATITUDE: iBXRestBlogPostEssence | undefined
  UF_IMPRTANT_DATE_END: iBXRestBlogPostEssence | undefined
  UF_MAIL_MESSAGE: iBXRestBlogPostEssence | undefined
  UF_ORIGINAL_ID: iBXRestBlogPostEssence | undefined
  UF_STATUS: iBXRestBlogPostEssence | undefined
}

export interface iBXRestBlogPostHttp extends iBXRestBlogPostBase {
  AUTHOR_ID: string
  BLOG_ID: string
  CATEGORY_ID: string
  DATE_PUBLISH: string
  ENABLE_COMMENTS: iBXRestYesNo
  HAS_COMMENT_IMAGES: iBXRestYesNo
  HAS_SOCNET_ALL: iBXRestYesNo
  HAS_IMAGES: iBXRestYesNo
  HAS_PROPS: iBXRestYesNo
  HAS_TAGS: iBXRestYesNo
  ID: string,
  MICRO: iBXRestYesNo,
  NUM_COMMENTS: string,
  UF_ANSWER_ID: iBXRestBlogPostEssenceHttp | undefined
  UF_BLOG_POST_DOC: iBXRestBlogPostEssenceHttp | undefined
  UF_BLOG_POST_FILE: iBXRestBlogPostEssenceHttp | undefined
  UF_BLOG_POST_F_EDIT: iBXRestBlogPostEssenceHttp | undefined
  UF_BLOG_POST_IMPRTNT: iBXRestBlogPostEssenceHttp | undefined
  UF_BLOG_POST_URL_PRV: iBXRestBlogPostEssenceHttp | undefined
  UF_BLOG_POST_VOTE: iBXRestBlogPostEssenceHttp | undefined
  UF_CATEGORY_CODE: iBXRestBlogPostEssenceHttp | undefined
  UF_GRATITUDE: iBXRestBlogPostEssenceHttp | undefined
  UF_IMPRTANT_DATE_END: iBXRestBlogPostEssenceHttp | undefined
  UF_MAIL_MESSAGE: iBXRestBlogPostEssenceHttp | undefined
  UF_ORIGINAL_ID: iBXRestBlogPostEssenceHttp | undefined
  UF_STATUS: iBXRestBlogPostEssenceHttp | undefined
}

interface iBXRestBlogPostBase {
  CODE: null // ???
  DETAIL_TEXT: string
  FILES: number[] | null
  TITLE: string
  PUBLISH_STATUS: 'P' // ???
}

