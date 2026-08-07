import { BXRestNavvyImOpenLinesMessageQuick } from './message/quick'
import { BXRestNavvyImOpenLinesMessageSession } from './message/session'

export class BXRestNavvyImOpenLinesMessage {
  public readonly quick = new BXRestNavvyImOpenLinesMessageQuick()
  public readonly session = new BXRestNavvyImOpenLinesMessageSession()
}

