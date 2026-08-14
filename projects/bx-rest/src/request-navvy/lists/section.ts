import {
  $add,
  $delete,
  $get,
  $lists,
  $section,
  $update
} from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import {
  iBXRestListsSection,
  iBXRestParamListsSectionAdd,
  iBXRestParamListsSectionDelete,
  iBXRestParamListsSectionGet,
  iBXRestParamListsSectionUpdate
} from '../../typification/rest/lists'

export class BXRestNavvyListsSection {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$lists, $section, $add],
    delete: [$lists, $section, $delete],
    get: [$lists, $section, $get],
    update: [$lists, $section, $update]
  }

  /**
   * Создаёт раздел списка.
   */
  add(param: iBXRestParamListsSectionAdd) {
    return this.Navvy.simple<number, number, iBXRestParamListsSectionAdd>(
      this.url.add,
      param
    )
  }

  /**
   * Удаляет раздел списка.
   */
  delete(param: iBXRestParamListsSectionDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamListsSectionDelete>(
      this.url.delete,
      param
    )
  }

  /**
   * Возвращает раздел или список разделов.
   */
  get(param: iBXRestParamListsSectionGet) {
    return this.Navvy.pagNav<
      iBXRestListsSection,
      iBXRestListsSection,
      iBXRestParamListsSectionGet
    >(this.url.get, param)
  }

  /**
   * Обновляет раздел списка.
   */
  update(param: iBXRestParamListsSectionUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamListsSectionUpdate>(
      this.url.update,
      param
    )
  }
}
