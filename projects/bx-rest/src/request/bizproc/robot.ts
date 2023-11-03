import { Injectable } from '@angular/core'
import { $bizproc, $delete, $update, $list, $robot, $add } from '../../consts/part-name-methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizprocRobot {
  protected url = {
    add: [$bizproc, $robot, $add], // Регистрирует нового робота
    delete: [$bizproc, $robot, $delete], // Удаляет зарегистрированного робота
    list: [$bizproc, $robot, $list], // Список зарегистрированных приложением роботов
    update: [$bizproc, $robot, $update] // Обновляет поля робота
  }
}
