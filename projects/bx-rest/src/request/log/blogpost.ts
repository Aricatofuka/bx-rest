import { Injectable } from '@angular/core'
import { $add, $blogpost, $delete, $get, $log, $share, $update } from '../../consts/part-name-metods'
import { HttpBXServices } from '../../services/http/HttpBX';
import { iBXRestParamLogBlogPostAdd } from '../../typification/rest/log/blogpost/add'

@Injectable({
  providedIn: 'root'
})
export class BXRestLogBlogPost {
  url = {
    add: [$log, $blogpost, $add], // Добавляет в Живую Ленту сообщение от имени текущего пользователя
    // getusers: {
    //   important: 'log.blogpost.getusers.important' // Отдает массив ID пользователей, прочитавших Важное сообщение
    // },
    get: [$log, $blogpost, $get], // Возвращает массив с доступными текущему пользователю сообщениями Живой ленты. Каждое из сообщений представляет собой массив значений полей (включая пользовательские поля)
    delete: [$log, $blogpost, $delete], // Удаляет сообщение Живой Ленты
    share: [$log, $blogpost, $share], // Добавляет получателей в сообщение Живой Ленты
    update: [$log, $blogpost, $update], // Изменяет сообщение Живой Ленты
  }

  constructor(private http: HttpBXServices) {
  }

  add(param: iBXRestParamLogBlogPostAdd) {
    return this.http.post<boolean>(this.url.add, param)
  }
}
