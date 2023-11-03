import { Injectable } from '@angular/core'
import { $add, $blogcomment, $log } from '../../consts/part-name-methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyLogBlogComment {
  url = {
    add: [$log, $blogcomment, $add], //	Добавляет комментарий к сообщению Живой ленты
  }
}
