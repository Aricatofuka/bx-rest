import { iBXRestBlogPost, iBXRestBlogPostHttp } from '../../typification/rest/log/blogpost/get'
import { iBXRestBlogPostEssence, iBXRestBlogPostEssenceHttp } from '../../typification/rest/log/blogpost/essence'
import { toDate, toNum } from '../../services/base'

export class  BXRestMapLogBlogPost {

  static get(item: iBXRestBlogPostHttp[] | undefined): iBXRestBlogPost[] | undefined {
    return (item) ? item.map(i => BXRestMapLogBlogPost.iBlogPostBXHttpToiBlogPostBX(i)) : undefined
  }

  static iBlogPostBXHttpToiBlogPostBX(item: iBXRestBlogPostHttp): iBXRestBlogPost {
    return {
      AUTHOR_ID: toNum(item.AUTHOR_ID),
      BLOG_ID: toNum(item.BLOG_ID),
      CATEGORY_ID: toNum(item.CATEGORY_ID),
      DATE_PUBLISH: toDate(item.DATE_PUBLISH),
      ENABLE_COMMENTS: item.ENABLE_COMMENTS === 'Y',
      HAS_COMMENT_IMAGES: item.HAS_COMMENT_IMAGES === 'Y',
      HAS_SOCNET_ALL: item.HAS_SOCNET_ALL === 'Y',
      HAS_IMAGES: item.HAS_IMAGES === 'Y',
      HAS_PROPS: item.HAS_PROPS === 'Y',
      HAS_TAGS: item.HAS_TAGS === 'Y',
      TITLE: item.TITLE,
      ID: toNum(item.ID),
      MICRO: item.MICRO === 'Y',
      PUBLISH_STATUS: item.PUBLISH_STATUS,
      NUM_COMMENTS: toNum(item.NUM_COMMENTS),
      UF_ANSWER_ID: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_ANSWER_ID),
      UF_BLOG_POST_DOC: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_DOC),
      UF_BLOG_POST_FILE: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_FILE),
      UF_BLOG_POST_F_EDIT: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_F_EDIT),
      UF_BLOG_POST_IMPRTNT: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_IMPRTNT),
      UF_BLOG_POST_URL_PRV: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_URL_PRV),
      UF_BLOG_POST_VOTE: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_VOTE),
      UF_CATEGORY_CODE: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_CATEGORY_CODE),
      UF_GRATITUDE: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_GRATITUDE),
      UF_IMPRTANT_DATE_END: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_IMPRTANT_DATE_END),
      UF_MAIL_MESSAGE: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_MAIL_MESSAGE),
      UF_ORIGINAL_ID: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_ORIGINAL_ID),
      UF_STATUS: BXRestMapLogBlogPost.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_STATUS),
      CODE: item.CODE,
      DETAIL_TEXT: item.DETAIL_TEXT,
      FILES: (item.FILES) ? item.FILES.map(i => toNum(i)) : []
    }
  }

  static iBlogPostEssenceHttpToiBlogPostEssence(item: iBXRestBlogPostEssenceHttp | undefined): iBXRestBlogPostEssence | undefined {
    if(item) {
      return {
        EDIT_IN_LIST: item.EDIT_IN_LIST === 'Y',
        ID: toNum(item.ID),
        IS_SEARCHABLE: item.IS_SEARCHABLE === 'Y',
        MANDATORY: item.MANDATORY === 'Y',
        MULTIPLE: item.MULTIPLE === 'Y',
        SHOW_FILTER: item.SHOW_FILTER === 'Y',
        SHOW_IN_LIST: item.SHOW_IN_LIST === 'Y',
        SORT: toNum(item.SORT),
        EDIT_FORM_LABEL: item.EDIT_FORM_LABEL,
        ENTITY_ID: item.EDIT_FORM_LABEL,
        ENTITY_VALUE_ID: toNum(item.ENTITY_VALUE_ID),
        ERROR_MESSAGE: item.ERROR_MESSAGE,
        FIELD_NAME: item.FIELD_NAME,
        HELP_MESSAGE: item.HELP_MESSAGE,
        LIST_COLUMN_LABEL: item.HELP_MESSAGE,
        LIST_FILTER_LABEL: item.LIST_FILTER_LABEL,
        SETTINGS: item.SETTINGS,
        USER_TYPE: item.USER_TYPE,
        USER_TYPE_ID: item.USER_TYPE_ID,
        VALUE: item.SHOW_IN_LIST === 'Y',
        XML_ID: item.XML_ID // ??
      }
    } else {
      return undefined
    }
  }
}
