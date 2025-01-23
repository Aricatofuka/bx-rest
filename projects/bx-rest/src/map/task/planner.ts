import { toNum } from '../../services/base'

export class BXRestMapTaskPlaner {

  static getList(v: (string | number)[] | undefined) {
    return (v) ? v.map(i => toNum(i)) : undefined
  }

}
