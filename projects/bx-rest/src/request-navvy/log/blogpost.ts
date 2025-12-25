import { iBXRestParamLogBlogPostAdd, iBXRestParamBlogPostGet } from '../../typification/rest/log'
import { Navvy } from '../../services/navvy'
import { BXRestMapLogBlogPost } from '../../map/log/blogpost'
import { $add, $blogpost, $get, $log } from '../../consts/part-name-methods'

export class BXRestNavvyLogBlogPost {
  url = {
    /**
     * Добавляет в Живую Ленту сообщение от имени текущего пользователя
     */
    add: [$log, $blogpost, $add], //
    // getusers: {
    //   important: 'log.blogpost.getusers.important' // Отдает массив ID пользователей, прочитавших Важное сообщение
    // },
    /**
     * Возвращает массив с доступными текущему пользователю сообщениями Живой ленты. Каждое из сообщений представляет собой массив значений полей (включая пользовательские поля)
     */
    get: [$log, $blogpost, $get],
    // /**
    //  * Удаляет сообщение Живой Ленты
    //  */
    // delete: [$log, $blogpost, $delete],
    // /**
    //  * Добавляет получателей в сообщение Живой Ленты
    //  */
    // share: [$log, $blogpost, $share],
    // /**
    //  * Изменяет сообщение Живой Ленты
    //  */
    // update: [$log, $blogpost, $update],
  }

  private Navvy = new Navvy()

  add(param: iBXRestParamLogBlogPostAdd) {
    return this.Navvy.simple(this.url.add, param)
  }

  get(param: iBXRestParamBlogPostGet = {}) {
    return this.Navvy.pagNav(this.url.get, param, BXRestMapLogBlogPost.get)
  }

}
