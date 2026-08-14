import { BXRestNavvyLogBlogPost } from './log/blogpost'
import { BXRestNavvyLogBlogComment } from './log/blogcomment'

export class BXRestNavvyLog {
  /**
   * Сообщения Ленты новостей (`log.blogpost.*`).
   */
  public readonly blogPost = new BXRestNavvyLogBlogPost()
  /**
   * Комментарии к сообщениям Ленты новостей (`log.blogcomment.*`).
   */
  public readonly blogComment = new BXRestNavvyLogBlogComment()
}
