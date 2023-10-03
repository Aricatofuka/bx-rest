import { Injectable } from '@angular/core'
import { iBXRestTaskComment, iBXRestTaskCommentHtml } from '../../typification/rest/task/commentitem/commentitem'
import { BaseMapServices } from '../base'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTaskCommentItem extends BaseMapServices {

  getlist(value: iBXRestTaskCommentHtml[] | undefined): iBXRestTaskComment[] | undefined {
    return value ? value.map(i => this.iCommentTaskHtmlToiCommentTask(i)) : undefined
  }

  get(value: iBXRestTaskCommentHtml | undefined): iBXRestTaskComment | undefined {
    return value ? this.iCommentTaskHtmlToiCommentTask(value) : undefined
  }

  private iCommentTaskHtmlToiCommentTask(item: iBXRestTaskCommentHtml): iBXRestTaskComment {
    if (item.ATTACHED_OBJECTS) {
      return {
        ATTACHED_OBJECTS: Object.values(item.ATTACHED_OBJECTS).map(i => {
          return {
            ATTACHMENT_ID: this.toNum(i.ATTACHMENT_ID),
            FILE_ID: this.toNum(i.FILE_ID),
            SIZE: this.toNum(i.SIZE),
            DOWNLOAD_URL: i.DOWNLOAD_URL,
            NAME: i.NAME,
            VIEW_URL: i.VIEW_URL
          }
        }),
        AUTHOR_ID: this.toNum(item.AUTHOR_ID),
        ID: this.toNum(item.ID),
        POST_DATE: this.toDate(item.POST_DATE),
        AUTHOR_EMAIL: item.AUTHOR_EMAIL,
        AUTHOR_NAME: item.AUTHOR_NAME,
        POST_MESSAGE: item.POST_MESSAGE,
        POST_MESSAGE_HTML: item.POST_MESSAGE_HTML
      }
    } else {
      return {
        AUTHOR_ID: this.toNum(item.AUTHOR_ID),
        ID: this.toNum(item.ID),
        POST_DATE: this.toDate(item.POST_DATE),
        AUTHOR_EMAIL: item.AUTHOR_EMAIL,
        AUTHOR_NAME: item.AUTHOR_NAME,
        POST_MESSAGE: item.POST_MESSAGE,
        POST_MESSAGE_HTML: item.POST_MESSAGE_HTML
      }
    }
  }
}
