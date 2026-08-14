import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $addFolder, $bindingToGroup, $bindingToMenu, $delete, $fullExport, $getAdditionalFields, $getFolders, $getGroupBindings, $getList, $getMenuBindings, $getPreview, $getPublicUrl, $getRights, $landing, $markDelete, $markFolderDelete, $markFolderUndelete, $markUndelete, $publication, $publicationFolder, $setRights, $site, $unbindingFromGroup, $unbindingFromMenu, $unpublic, $unpublicFolder, $update, $updateFolder } from '../../consts/part-name-methods'

export class BXRestNavvyLandingSite  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет сайт.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $add], param)
  }
  /**
   * Добавляет папку в сайт.
   */
  public addFolder(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $addFolder], param)
  }
  /**
   * Привязывает базу знаний к рабочей группе.
   */
  public bindingToGroup(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $bindingToGroup], param)
  }
  /**
   * Привязывает базу знаний к меню.
   */
  public bindingToMenu(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $bindingToMenu], param)
  }
  /**
   * Удаляет сайт.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $delete], param)
  }
  /**
   * Экспортирует сайт и его страницы в массив.
   */
  public fullExport(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $fullExport], param)
  }
  /**
   * Возвращает дополнительные поля сайта.
   */
  public getAdditionalFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $landing, $site, $getAdditionalFields
  ], param)
  }
  /**
   * Возвращает папки сайта.
   */
  public getFolders(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $getFolders], param)
  }
  /**
   * Возвращает привязки баз знаний к рабочим группам.
   */
  public getGroupBindings(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $getGroupBindings], param)
  }
  /**
   * Возвращает список сайтов.
   */
  public getList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $getList], param)
  }
  /**
   * Возвращает привязки баз знаний к меню.
   */
  public getMenuBindings(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $getMenuBindings], param)
  }
  /**
   * Возвращает URL превью сайта.
   */
  public getPreview(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $getPreview], param)
  }
  /**
   * Возвращает публичный URL сайта.
   */
  public getPublicUrl(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $getPublicUrl], param)
  }
  /**
   * Возвращает права текущего пользователя на сайт.
   */
  public getRights(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $getRights], param)
  }
  /**
   * Помечает сайт как удалённый.
   */
  public markDelete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $markDelete], param)
  }
  /**
   * Помечает папку сайта как удалённую.
   */
  public markFolderDelete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $markFolderDelete], param)
  }
  /**
   * Восстанавливает папку сайта из корзины.
   */
  public markFolderUndelete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $landing, $site, $markFolderUndelete
  ], param)
  }
  /**
   * Восстанавливает сайт из корзины.
   */
  public markUndelete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $markUndelete], param)
  }
  /**
   * Публикует сайт и все его страницы.
   */
  public publication(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $publication], param)
  }
  /**
   * Публикует папку сайта.
   */
  public publicationFolder(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $publicationFolder], param)
  }
  /**
   * Устанавливает права доступа к сайту.
   */
  public setRights(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $setRights], param)
  }
  /**
   * Отвязывает базу знаний от рабочей группы.
   */
  public unbindingFromGroup(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $landing, $site, $unbindingFromGroup
  ], param)
  }
  /**
   * Отвязывает базу знаний от меню.
   */
  public unbindingFromMenu(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $landing, $site, $unbindingFromMenu
  ], param)
  }
  /**
   * Снимает сайт и все его страницы с публикации.
   */
  public unpublic(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $unpublic], param)
  }
  /**
   * Снимает папку сайта с публикации.
   */
  public unpublicFolder(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $unpublicFolder], param)
  }
  /**
   * Обновляет параметры сайта.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $update], param)
  }
  /**
   * Обновляет параметры папки сайта.
   */
  public updateFolder(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $site, $updateFolder], param)
  }
}

