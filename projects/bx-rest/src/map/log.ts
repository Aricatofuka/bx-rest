import { BXRestMapLogBlogPost } from './log/blogpost'
import { inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapLog {
  public readonly blogpost = inject(BXRestMapLogBlogPost)
}
