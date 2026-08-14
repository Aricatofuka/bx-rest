import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $addCatalogProduct, $basketItem, $delete, $get, $getFieldsCatalogProduct, $getFieldsExact, $list, $sale, $update, $updateCatalogProduct } from '../../consts/part-name-methods'

export class BXRestNavvySaleBasketItem  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет элемент корзины.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketItem, $add], param)
  }
  /**
   * Добавляет в корзину товар из каталога.
   */
  public addCatalogProduct(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketItem, $addCatalogProduct], param)
  }
  /**
   * Удаляет элемент корзины.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketItem, $delete], param)
  }
  /**
   * Возвращает элемент корзины по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketItem, $get], param)
  }
  /**
   * Возвращает описание полей элемента корзины.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketItem, $getFieldsExact], param)
  }
  /**
   * Возвращает описание полей элемента корзины для товара каталога.
   */
  public getFieldsCatalogProduct(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $sale, $basketItem, $getFieldsCatalogProduct
  ], param)
  }
  /**
   * Возвращает список элементов корзины.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketItem, $list], param)
  }
  /**
   * Обновляет элемент корзины.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $basketItem, $update], param)
  }
  /**
   * Обновляет элемент корзины для товара каталога.
   */
  public updateCatalogProduct(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $sale, $basketItem, $updateCatalogProduct
  ], param)
  }
}

