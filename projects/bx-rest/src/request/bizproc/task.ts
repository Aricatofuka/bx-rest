import { Injectable } from '@angular/core'
import { $bizproc, $task, $complete, $list } from '../../consts/part-name-metods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizprocTask {
  url = {
    complete: [$bizproc, $task, $complete], // Осуществляет выполнение заданий БП
    list: [$bizproc, $task, $list], // Возвращает список заданий бизнес-процессов
  }
}
