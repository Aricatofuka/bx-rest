import { Injectable } from '@angular/core'
import { $add, $blogpost, $delete, $get, $log, $share, $update } from '../../consts/part-name-metods'
import { iBXRestParamLogBlogPostAdd } from '../../typification/rest/log/blogpost/add'
import { BXRestLogBlogPost } from '../../request/log/blogpost'
import { Navvy } from '../../services/navvy'
import { iBXRestParamBlogPostGet } from '../../typification/rest/log/blogpost/get'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyLogBlogPost {
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

  constructor(
    private BXRestLogBlogPost: BXRestLogBlogPost,
  ) {
  }

  add(param: iBXRestParamLogBlogPostAdd) {
    return new Navvy(this.BXRestLogBlogPost.add(param))
  }

  get(param: iBXRestParamBlogPostGet = {}) {
    return new Navvy(this.BXRestLogBlogPost.get(param))
  }

}
