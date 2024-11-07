import { inject, Injectable } from '@angular/core'
import { BXRestImChat } from './im/chat'

@Injectable({
  providedIn: 'root'
})
export class BXRestIm {
  public readonly chat = inject(BXRestImChat)
}
