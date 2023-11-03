import { Injectable } from '@angular/core'
import { $bizproc, $task, $complete, $list } from '../../consts/part-name-methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizprocTask {
  protected url = {
    complete: [$bizproc, $task, $complete], // Осуществляет выполнение заданий БП
    list: [$bizproc, $task, $list], // Возвращает список заданий бизнес-процессов
  }
}
