import { Injectable } from '@angular/core'
import serialize from '@/lib/functions/serializeJavascript'

@Injectable({
  providedIn: 'root'
})
export default class JSONServices {
  static deserialize(data: any) {
    return eval('(' + data + ')')
  }

  static serialize(data: any ) {
    return serialize(data)
  }
}
