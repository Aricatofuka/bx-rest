import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $addBlock, $addByTemplate, $copy, $copyBlock, $delete, $deleteBlock, $downBlock, $favoriteBlock, $getAdditionalFields, $getList, $getPreview, $getPublicUrl, $hideBlock, $landing, $markDelete, $markDeletedBlock, $markUndelete, $markUndeletedBlock, $move, $moveBlock, $publication, $removeEntities, $resolveIdByPublicUrl, $showBlock, $unfavoriteBlock, $unpublic, $upBlock, $update } from '../../consts/part-name-methods'

export class BXRestNavvyLandingLanding  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет страницу.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $add], param)
  }
  /**
   * Добавляет новый блок на страницу.
   */
  public addBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $addBlock], param)
  }
  /**
   * Создаёт страницу по шаблону.
   */
  public addByTemplate(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $addByTemplate], param)
  }
  /**
   * Копирует страницу.
   */
  public copy(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $copy], param)
  }
  /**
   * Копирует блок со страницы на страницу.
   */
  public copyBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $copyBlock], param)
  }
  /**
   * Удаляет страницу.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $delete], param)
  }
  /**
   * Удаляет блок со страницы.
   */
  public deleteBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $deleteBlock], param)
  }
  /**
   * Опускает блок на одну позицию вниз.
   */
  public downBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $downBlock], param)
  }
  /**
   * Сохраняет блок в «Мои блоки».
   */
  public favoriteBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $favoriteBlock], param)
  }
  /**
   * Возвращает дополнительные поля страницы.
   */
  public getAdditionalFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $landing, $landing, $getAdditionalFields
  ], param)
  }
  /**
   * Возвращает список страниц.
   */
  public getList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $getList], param)
  }
  /**
   * Возвращает путь к превью страницы.
   */
  public getPreview(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $getPreview], param)
  }
  /**
   * Возвращает публичный URL страницы.
   */
  public getPublicUrl(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $getPublicUrl], param)
  }
  /**
   * Скрывает блок на странице.
   */
  public hideBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $hideBlock], param)
  }
  /**
   * Помечает страницу как удалённую.
   */
  public markDelete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $markDelete], param)
  }
  /**
   * Помечает блок как удалённый без физического удаления.
   */
  public markDeletedBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $landing, $landing, $markDeletedBlock
  ], param)
  }
  /**
   * Восстанавливает страницу из удалённых.
   */
  public markUndelete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $markUndelete], param)
  }
  /**
   * Восстанавливает блок из удалённых.
   */
  public markUndeletedBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $landing, $landing, $markUndeletedBlock
  ], param)
  }
  /**
   * Перемещает страницу в другой сайт или папку.
   */
  public move(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $move], param)
  }
  /**
   * Перемещает блок со страницы на страницу.
   */
  public moveBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $moveBlock], param)
  }
  /**
   * Публикует страницу.
   */
  public publication(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $publication], param)
  }
  /**
   * Удаляет блоки и изображения страницы.
   */
  public removeEntities(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $removeEntities], param)
  }
  /**
   * Возвращает идентификатор страницы по публичному URL.
   */
  public resolveIdByPublicUrl(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $landing, $landing, $resolveIdByPublicUrl
  ], param)
  }
  /**
   * Показывает скрытый блок на странице.
   */
  public showBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $showBlock], param)
  }
  /**
   * Удаляет блок из «Моих блоков».
   */
  public unfavoriteBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $unfavoriteBlock], param)
  }
  /**
   * Снимает страницу с публикации.
   */
  public unpublic(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $unpublic], param)
  }
  /**
   * Поднимает блок на одну позицию вверх.
   */
  public upBlock(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $upBlock], param)
  }
  /**
   * Изменяет параметры страницы.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $landing, $update], param)
  }
}

