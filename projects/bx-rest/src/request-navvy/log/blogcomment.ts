import { $add, $blogcomment, $log } from '../../consts/part-name-methods'

export class BXRestNavvyLogBlogComment {
  url = {
    add: [$log, $blogcomment, $add], //	Добавляет комментарий к сообщению Живой ленты
  }
}
