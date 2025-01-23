import { iBXRestTaskComment, iBXRestTaskCommentHtml } from '../../typification/rest/task/commentitem/commentitem'
import { toDate, toNum } from '../../services/base'

export class BXRestMapTaskCommentItem {

  static getlist(value: iBXRestTaskCommentHtml[] | undefined): iBXRestTaskComment[] | undefined {
    return value ? value.map(i => BXRestMapTaskCommentItem.iCommentTaskHtmlToiCommentTask(i)) : undefined
  }

  static get(value: iBXRestTaskCommentHtml | undefined): iBXRestTaskComment | undefined {
    return value ? BXRestMapTaskCommentItem.iCommentTaskHtmlToiCommentTask(value) : undefined
  }

  static iCommentTaskHtmlToiCommentTask(item: iBXRestTaskCommentHtml): iBXRestTaskComment {
    if (item.ATTACHED_OBJECTS) {
      return {
        ATTACHED_OBJECTS: Object.values(item.ATTACHED_OBJECTS).map(i => {
          return {
            ATTACHMENT_ID: toNum(i.ATTACHMENT_ID),
            FILE_ID: toNum(i.FILE_ID),
            SIZE: toNum(i.SIZE),
            DOWNLOAD_URL: i.DOWNLOAD_URL,
            NAME: i.NAME,
            VIEW_URL: i.VIEW_URL
          }
        }),
        AUTHOR_ID: toNum(item.AUTHOR_ID),
        ID: toNum(item.ID),
        POST_DATE: toDate(item.POST_DATE),
        AUTHOR_EMAIL: item.AUTHOR_EMAIL,
        AUTHOR_NAME: item.AUTHOR_NAME,
        POST_MESSAGE: item.POST_MESSAGE,
        POST_MESSAGE_HTML: item.POST_MESSAGE_HTML
      }
    } else {
      return {
        AUTHOR_ID: toNum(item.AUTHOR_ID),
        ID: toNum(item.ID),
        POST_DATE: toDate(item.POST_DATE),
        AUTHOR_EMAIL: item.AUTHOR_EMAIL,
        AUTHOR_NAME: item.AUTHOR_NAME,
        POST_MESSAGE: item.POST_MESSAGE,
        POST_MESSAGE_HTML: item.POST_MESSAGE_HTML
      }
    }
  }
}
