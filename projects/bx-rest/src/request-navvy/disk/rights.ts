import { $disk, $getTasks, $rights } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import { iBXRestDiskAccessTask } from '../../typification/rest/disk'

export class BXRestNavvyDiskRights {
  private readonly Navvy = new Navvy()
  private readonly url = {
    getTasks: [$disk, $rights, $getTasks]
  }

  /**
   * Возвращает список уровней доступа для назначения прав.
   */
  getTasks() {
    return this.Navvy.simple<iBXRestDiskAccessTask[]>(this.url.getTasks)
  }
}
