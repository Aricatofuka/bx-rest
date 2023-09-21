import { BaseMapServices } from '../base'
import { Injectable } from '@angular/core'
import { iBXRestBlogPostHttp } from '../../typification/rest/log/blogpost/get'
import { iBXRestBlogPostEssenceHttp } from '../../typification/rest/log/blogpost/essence'

@Injectable({
  providedIn: 'root'
})
export class  BXRestMapBlogPost extends BaseMapServices {

  get(item: iBXRestBlogPostHttp[] | undefined): iBXRestBlogPost[] | undefined {
    return (item) ? item.map(i => this.iBlogPostBXHttpToiBlogPostBX(i)) : undefined
  }

  private iBlogPostBXHttpToiBlogPostBX(item: iBXRestBlogPostHttp): iBXRestBlogPost {
    return {
      AUTHOR_ID: this.toNum(item.AUTHOR_ID),
      BLOG_ID: this.toNum(item.BLOG_ID),
      CATEGORY_ID: this.toNum(item.CATEGORY_ID),
      DATE_PUBLISH: this.toDate(item.DATE_PUBLISH),
      ENABLE_COMMENTS: item.ENABLE_COMMENTS === 'Y',
      HAS_COMMENT_IMAGES: item.HAS_COMMENT_IMAGES === 'Y',
      HAS_SOCNET_ALL: item.HAS_SOCNET_ALL === 'Y',
      HAS_IMAGES: item.HAS_IMAGES === 'Y',
      HAS_PROPS: item.HAS_PROPS === 'Y',
      HAS_TAGS: item.HAS_TAGS === 'Y',
      TITLE: item.TITLE,
      ID: this.toNum(item.ID),
      MICRO: item.MICRO === 'Y',
      PUBLISH_STATUS: item.PUBLISH_STATUS,
      NUM_COMMENTS: this.toNum(item.NUM_COMMENTS),
      UF_ANSWER_ID: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_ANSWER_ID),
      UF_BLOG_POST_DOC: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_DOC),
      UF_BLOG_POST_FILE: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_FILE),
      UF_BLOG_POST_F_EDIT: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_F_EDIT),
      UF_BLOG_POST_IMPRTNT: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_IMPRTNT),
      UF_BLOG_POST_URL_PRV: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_URL_PRV),
      UF_BLOG_POST_VOTE: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_BLOG_POST_VOTE),
      UF_CATEGORY_CODE: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_CATEGORY_CODE),
      UF_GRATITUDE: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_GRATITUDE),
      UF_IMPRTANT_DATE_END: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_IMPRTANT_DATE_END),
      UF_MAIL_MESSAGE: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_MAIL_MESSAGE),
      UF_ORIGINAL_ID: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_ORIGINAL_ID),
      UF_STATUS: this.iBlogPostEssenceHttpToiBlogPostEssence(item.UF_STATUS),
      CODE: item.CODE,
      DETAIL_TEXT: item.DETAIL_TEXT,
      FILES: (item.FILES) ? item.FILES.map(i => this.toNum(i)) : []
    }
  }

  private iBlogPostEssenceHttpToiBlogPostEssence(item: iBXRestBlogPostEssenceHttp | undefined): iBXRestBlogPostEssence | undefined {
    if(item) {
      return {
        EDIT_IN_LIST: item.EDIT_IN_LIST === 'Y',
        ID: this.toNum(item.ID),
        IS_SEARCHABLE: item.IS_SEARCHABLE === 'Y',
        MANDATORY: item.MANDATORY === 'Y',
        MULTIPLE: item.MULTIPLE === 'Y',
        SHOW_FILTER: item.SHOW_FILTER === 'Y',
        SHOW_IN_LIST: item.SHOW_IN_LIST === 'Y',
        SORT: this.toNum(item.SORT),
        EDIT_FORM_LABEL: item.EDIT_FORM_LABEL,
        ENTITY_ID: item.EDIT_FORM_LABEL,
        ENTITY_VALUE_ID: this.toNum(item.ENTITY_VALUE_ID),
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
