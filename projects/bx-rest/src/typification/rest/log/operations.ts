import { iBXRestYesNo } from '../base/yes-no'
import { iBXRestParamLogBlogPostAdd } from './blogpost/add'

export interface iBXRestParamLogBlogPostId {
  POST_ID: number
}

export interface iBXRestParamLogBlogPostShare extends iBXRestParamLogBlogPostId {
  DEST: string[]
  USER_ID?: number
}

export type iBXRestParamLogBlogPostUpdate =
  iBXRestParamLogBlogPostId & Partial<iBXRestParamLogBlogPostAdd> & {
    SPERM?: string[]
    SITE_ID?: string
    UF_BLOG_POST_FILE?: string[]
    UF_BLOG_POST_IMPRTNT?: number
    UF_IMPRTANT_DATE_END?: string
    UF_BLOG_POST_URL_PRV?: number
    UF_GRATITUDE?: number
    UF_BLOG_POST_VOTE?: number | string
    [customField: string]: unknown
  }

export interface iBXRestParamLogBlogCommentAdd {
  POST_ID: number
  TEXT: string
  FILES?: [name: string, content: string][]
  USER_ID?: number
}

export interface iBXRestParamLogBlogCommentDelete {
  COMMENT_ID: number
  USER_ID?: number
}

export interface iBXRestParamLogBlogCommentUserGet {
  USER_ID?: number
  FIRST_ID?: number
  LAST_ID?: number
  LIMIT?: number
}

export interface iBXRestLogBlogCommentUserComment {
  id: number
  comment_id: number
  log_id: number
  date: string
  text: string
  attach: number[]
}

export interface iBXRestLogBlogCommentUserFile {
  id: number
  date: string
  type: string
  name: string
  size: number
  image?: {width: number; height: number}
  authorId: number
  authorName: string
  urlPreview: string
  urlShow: string
  urlDownload: string
}

export interface iBXRestLogBlogCommentUserGetResult {
  comments: iBXRestLogBlogCommentUserComment[]
  files: Record<string, iBXRestLogBlogCommentUserFile>
}

export type iBXRestLogImportant = iBXRestYesNo
