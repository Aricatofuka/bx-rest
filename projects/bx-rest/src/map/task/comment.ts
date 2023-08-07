import { Injectable } from '@angular/core'
import BaseMapServices from '@/lib/services/map/base'
import { iCommentTask, iCommentTaskHtml } from '@/lib/typification/bitrix/api/rest/task/comment/comment'

@Injectable({
  providedIn: 'root'
})
export class BitrixApiTaskCommentMapServices extends BaseMapServices {

  iCommentTaskHtmlToiCommentTask(item: iCommentTaskHtml): iCommentTask {
    if(item.ATTACHED_OBJECTS){
      return {
        ATTACHED_OBJECTS: Object.values(item.ATTACHED_OBJECTS).map(i => {
          return {
            ATTACHMENT_ID: this.toNumber(i.ATTACHMENT_ID),
            FILE_ID: this.toNumber(i.FILE_ID),
            SIZE: this.toNumber(i.SIZE),
            DOWNLOAD_URL: i.DOWNLOAD_URL,
            NAME: i.NAME,
            VIEW_URL: i.VIEW_URL
          }
        }),
        AUTHOR_ID: this.toNumber(item.AUTHOR_ID),
        ID: this.toNumber(item.ID),
        POST_DATE: this.toDate(item.POST_DATE),
        AUTHOR_EMAIL: item.AUTHOR_EMAIL,
        AUTHOR_NAME: item.AUTHOR_NAME,
        POST_MESSAGE: item.POST_MESSAGE,
        POST_MESSAGE_HTML: item.POST_MESSAGE_HTML
      }
    } else {
      return {
        AUTHOR_ID: this.toNumber(item.AUTHOR_ID),
        ID: this.toNumber(item.ID),
        POST_DATE: this.toDate(item.POST_DATE),
        AUTHOR_EMAIL: item.AUTHOR_EMAIL,
        AUTHOR_NAME: item.AUTHOR_NAME,
        POST_MESSAGE: item.POST_MESSAGE,
        POST_MESSAGE_HTML: item.POST_MESSAGE_HTML
      }
    }
  }
}
