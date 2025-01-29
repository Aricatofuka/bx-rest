import { BXRestNavvyListsElement } from './lists/element'
import { iBXRestParamListGet } from '../typification/rest/lists/get'
import { Navvy } from '../services/navvy'
import { BXRestMapLists } from '../map/lists'
import BXRestNavvyListsField from './lists/field'
import { $add, $element, $field, $get, $lists } from '../consts/part-name-methods'

export class BXRestNavvyLists {

  url = {
    // /**
    //  * Метод создаёт список
    //  */
    // add: [$lists, $add],
    // /**
    //  * Метод удаляет список
    //  */
    // delete: [$lists, $delete],
    /**
     * Метод возвращает данные по спискам
     */
    get: [$lists, $get],
    // /**
    //  * Метод обновляет существующий список
    //  */
    // update: [$lists, $update],
    // /**
    //  * Метод возвращает id типа инфоблока
    //  */
    // getIBlockTypeId: [$lists, $get, $iblock, $type, $id],
    element: {
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
    },
    field: {
      // /**
      //  * Метод создает поле списка
      //  */
      // add: [$lists, $field, $add],
      // /**
      //  * Метод удаляет поле списка
      //  */
      // delete: [$lists, $field, $delete],
      /**
       * Метод возвращает данные поля
       */
      get: [$lists, $field, $get],
      // type: {
      //   /**
      //    * Метод возвращает доступные типа полей для указанного списка
      //    */
      //   get: [$lists, $field, $type, $get],
      // },
      // /**
      //  * Метод обновляет поле списка
      //  */
      // update: [$lists, $field, $update],
    }
  }
  public readonly element = new BXRestNavvyListsElement()
  public readonly field = new BXRestNavvyListsField()

  protected Navvy = new Navvy()

  get(param: iBXRestParamListGet) {
    return this.Navvy.pagNav(this.url.get, param, BXRestMapLists.get)
  }

  // getAllWithMap(pram: getListParam): Observable<ItemLists[] | undefined> {
  //     return this.getAll(pram)
  //         .pipe(
  //             map(v => (v && v.length) ? v.map(i => this.listsMap.mapItemLists(i)) : [])
  //         )
  // }

  // getField(pram: getListFieldParam): Observable<iHttpAnswerBX<FieldItemLists[]> | undefined> {
  //     return this.http.post<iHttpAnswerBX<{ [key: string]: FieldItemLists }>>(this.url.field.get, pram)
  // }
}
