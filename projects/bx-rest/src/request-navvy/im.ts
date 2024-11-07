import { inject, Injectable } from '@angular/core'
import { BXRestNavvyImChat } from './im/chat'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyIm {
  public readonly chat = inject(BXRestNavvyImChat)
}
