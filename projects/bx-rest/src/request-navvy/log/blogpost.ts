import { Injectable } from '@angular/core'
import { $add, $blogpost, $delete, $get, $log, $share, $update } from '../../consts/part-name-methods'
import { iBXRestParamLogBlogPostAdd } from '../../typification/rest/log/blogpost/add'
import { BXRestLogBlogPost } from '../../request/log/blogpost'
import { Navvy } from '../../services/navvy'
import { iBXRestParamBlogPostGet } from '../../typification/rest/log/blogpost/get'
import { BXRestMapLogBlogPost } from "../../map/log/blogpost";

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

  private Navvy: Navvy<BXRestLogBlogPost, BXRestMapLogBlogPost>

  constructor(
    private BXRestLogBlogPost: BXRestLogBlogPost,
    private map: BXRestMapLogBlogPost
  ) {
    this.Navvy = new Navvy(this.BXRestLogBlogPost, map)
  }

  add(param: iBXRestParamLogBlogPostAdd) {
    return this.Navvy.simpleWithArg(this.BXRestLogBlogPost.add, param)
  }

  get(param: iBXRestParamBlogPostGet = {}) {
    return this.Navvy.PagNav(this.BXRestLogBlogPost.get, param, this.map.get)
  }

}
