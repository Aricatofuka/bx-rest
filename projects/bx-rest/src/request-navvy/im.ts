import { Injectable } from '@angular/core'
import { BXRestNavvyImChat } from './im/chat'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyIm {
  constructor(
    public chat: BXRestNavvyImChat
  ) {
  }
}
