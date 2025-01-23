import { BXRestLogBlogPost } from './log/blogpost'
import { BXRestLogBlogComment } from './log/blogcomment'

export class BXRestLog {
  public readonly blogPost = new BXRestLogBlogPost()
  public readonly blogComment = new BXRestLogBlogComment()
}
