import { BXRestNavvyLogBlogPost } from './log/blogpost'
import { BXRestNavvyLogBlogComment } from './log/blogcomment'

export class BXRestNavvyLog {
  public readonly blogPost = new BXRestNavvyLogBlogPost()
  public readonly blogComment = new BXRestNavvyLogBlogComment()
}
