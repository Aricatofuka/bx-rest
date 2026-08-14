import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $addCard, $block, $changeAnchor, $changeNodeName, $cloneCard, $getById, $getContent, $getContentFromRepository, $getList, $getManifest, $getManifestFile, $getRepository, $landing, $removeCard, $updateAttrs, $updateCards, $updateContent, $updateNodes, $updateStyles, $uploadFile } from '../../consts/part-name-methods'

export class BXRestNavvyLandingBlock  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет карточку блока с изменённым содержимым.
   */
  public addCard(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $addCard], param)
  }
  /**
   * Изменяет символьный код якоря блока.
   */
  public changeAnchor(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $changeAnchor], param)
  }
  /**
   * Изменяет название тега ноды блока.
   */
  public changeNodeName(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $changeNodeName], param)
  }
  /**
   * Клонирует карточку блока.
   */
  public cloneCard(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $cloneCard], param)
  }
  /**
   * Возвращает блок по идентификатору.
   */
  public getById(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $getById], param)
  }
  /**
   * Возвращает содержимое блока.
   */
  public getContent(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $getContent], param)
  }
  /**
   * Возвращает содержимое блока из репозитория до его добавления на страницу.
   */
  public getContentFromRepository(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $landing, $block, $getContentFromRepository
  ], param)
  }
  /**
   * Возвращает список блоков страницы.
   */
  public getList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $getList], param)
  }
  /**
   * Возвращает манифест блока, уже размещённого на странице.
   */
  public getManifest(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $getManifest], param)
  }
  /**
   * Возвращает манифест блока из репозитория.
   */
  public getManifestFile(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $getManifestFile], param)
  }
  /**
   * Возвращает список блоков из репозитория.
   */
  public getRepository(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $getRepository], param)
  }
  /**
   * Удаляет карточку блока.
   */
  public removeCard(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $removeCard], param)
  }
  /**
   * Изменяет атрибуты нод блока.
   */
  public updateAttrs(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $updateAttrs], param)
  }
  /**
   * Массово изменяет карточки блока.
   */
  public updateCards(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $updateCards], param)
  }
  /**
   * Обновляет содержимое размещённого на странице блока произвольным содержимым.
   */
  public updateContent(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $updateContent], param)
  }
  /**
   * Изменяет содержимое нод блока.
   */
  public updateNodes(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $updateNodes], param)
  }
  /**
   * Изменяет стили блока.
   */
  public updateStyles(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $updateStyles], param)
  }
  /**
   * Загружает файл и привязывает его к блоку.
   */
  public uploadFile(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $block, $uploadFile], param)
  }
}

