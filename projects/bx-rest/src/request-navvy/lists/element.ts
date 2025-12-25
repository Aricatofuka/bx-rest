import { iBXRestParamListsElementGet, iBXRestParamListsElementAdd } from '../../typification/rest/lists'
import BXRestListsElementMap from '../../map/lists/element'
import { Navvy } from '../../services/navvy'
import { $add, $element, $get, $lists } from '../../consts/part-name-methods'

export class BXRestNavvyListsElement {

  url = {
    /**
     * Метод создаёт элемент списка
     */
    add: [$lists, $element, $add],
    // /**
    //  * Метод удаляет элемент списка TODO: Реализовать
    //  */
    // delete: [$lists, $element, $delete],
    /**
     * Метод возвращает список элементов или элемент
     */
    get: [$lists, $element, $get],
    // /**
    //  * Метод обновляет элемент списка TODO: Реализовать
    //  */
    // update: [$lists, $element, $update],
    // /**
    //  * Метод возвращает путь к файлу TODO: Реализовать
    //  */
    // getFileUrl: [$lists, $element, $get, $file, $url]
  }

  private Navvy = new Navvy()

  get(param: iBXRestParamListsElementGet) {
    return this.Navvy.pagNav(
      this.url.get,
      param,
      BXRestListsElementMap.get
    )
  }

  add(param: iBXRestParamListsElementAdd) {
    return this.Navvy.simple(this.url.add, param)
  }
}
