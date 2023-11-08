import { Injectable } from '@angular/core'
import { BXRestImChat } from './im/chat'

@Injectable({
  providedIn: 'root'
})
export class BXRestIm {
  constructor(public chat: BXRestImChat) {
  }
}
