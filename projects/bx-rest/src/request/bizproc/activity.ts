import { Injectable } from '@angular/core'
import { $bizproc, $add, $activity, $delete, $list, $update, $log } from '../../consts/part-name-metods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizprocActivity {
  protected url = {
    add: [$bizproc, $activity, $add], // Добавляет новое действие в бизнес-процесс
    delete: [$bizproc, $activity, $delete], // Удаляет действие
    list: [$bizproc, $activity, $list], // Возвращает список установленных приложением действий
    update: [$bizproc, $activity, $update], // Позволяет обновить поля действия
    log: [$bizproc, $activity, $log]// Записывает информацию в лог бизнес-процесса
  }
}
