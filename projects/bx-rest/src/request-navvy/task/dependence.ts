import { Navvy } from '../../services/navvy'
import { iBXRestParamTaskDependence } from '../../typification/rest/task'
import { $add, $delete, $dependence, $task } from '../../consts/part-name-methods'

export class BXRestNavvyTaskDependence {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт зависимость одной задачи от другой.
   */
  add(param: iBXRestParamTaskDependence) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskDependence>(
      [$task, $dependence, $add],
      param
    )
  }

  /**
   * Удаляет зависимость одной задачи от другой.
   */
  delete(param: iBXRestParamTaskDependence) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskDependence>(
      [$task, $dependence, $delete],
      param
    )
  }
}
