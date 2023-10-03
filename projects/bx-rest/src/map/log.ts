import { BXRestMapLogBlogPost } from './log/blogpost'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapLog {
  constructor(
    public blogpost: BXRestMapLogBlogPost
  ) {
  }
}
