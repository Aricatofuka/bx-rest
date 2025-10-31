import { $all, $dialog, $im, $read } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestImDialogRead, iBXRestImDialogReadParam } from '../../../typification/rest/im/dialog/read'


export function BXRestNavvyImDialogRead(navvy: Navvy) {
  const readFunc = (param: iBXRestImDialogReadParam) => {

    /**
     * Установить признак «прочитано» у сообщений
     *
     * @param param
     */
    return navvy.simple<iBXRestImDialogRead, iBXRestImDialogRead, iBXRestImDialogReadParam>(
      [$im, $dialog, $read],
      param
    )
  }

  /**
   * Установить признак «прочитано» у всех чатов
   */
  readFunc.all = () => {
    return navvy.simple<boolean, boolean>(
      [$im, $dialog, $read, $all]
    )
  }

  return readFunc
}