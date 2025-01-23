import { toDate } from '../services/base'

export class BXRestMapServer {
  static time(v: string | undefined) {
    return (v) ? toDate(v) : undefined
  }
}
