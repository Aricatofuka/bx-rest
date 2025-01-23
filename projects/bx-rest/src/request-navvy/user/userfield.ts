import { Navvy } from '../../services/navvy'
import { $add, $delete, $file, $get, $list, $update, $user, $userfield } from '../../consts/part-name-methods'

export class BXRestNavvyUserUserfield {
  private url = {
    /**
     * Добавляет пользовательское поле
     */
    add: [$user, $userfield, $add],
    /**
     * Обновляет пользовательское поле
     */
    update: [$user, $userfield, $update],
    /**
     * Удаляет пользовательское поле
     */
    delete: [$user, $userfield, $delete],
    /**
     *  Получает список пользовательских полей
     */
    list: [$user, $userfield, $list],
    file: {
      /**
       *  Получает файл из пользовательского поля
       */
      get: [$user, $userfield, $file, $get]
    }
  }

  private readonly Navvy = new Navvy()

  list() {
    return this.Navvy.simple(this.url.list)
  }
}
