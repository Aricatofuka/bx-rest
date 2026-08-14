import { BXRestNavvyCatalogCatalog } from './catalog'
import { BXRestNavvyCatalogDocument } from './document'
import { BXRestNavvyCatalogDocumentContractor } from './documentcontractor'
import { BXRestNavvyCatalogEnum } from './enum'
import { BXRestNavvyCatalogExtra } from './extra'
import { BXRestNavvyCatalogMeasure } from './measure'
import { BXRestNavvyCatalogPrice } from './price'
import { BXRestNavvyCatalogPriceType } from './pricetype'
import { BXRestNavvyCatalogPriceTypeGroup } from './pricetypegroup'
import { BXRestNavvyCatalogPriceTypeLang } from './pricetypelang'
import { BXRestNavvyCatalogProduct } from './product'
import { BXRestNavvyCatalogProductImage } from './productimage'
import { BXRestNavvyCatalogProductProperty } from './productproperty'
import { BXRestNavvyCatalogProductPropertyEnum } from './productpropertyenum'
import { BXRestNavvyCatalogProductPropertyFeature } from './productpropertyfeature'
import { BXRestNavvyCatalogProductPropertySection } from './productpropertysection'
import { BXRestNavvyCatalogRatio } from './ratio'
import { BXRestNavvyCatalogRoundingRule } from './roundingrule'
import { BXRestNavvyCatalogSection } from './section'
import { BXRestNavvyCatalogStore } from './store'
import { BXRestNavvyCatalogStoreProduct } from './storeproduct'
import { BXRestNavvyCatalogUserfield } from './userfield'
import { BXRestNavvyCatalogVat } from './vat'

export class BXRestNavvyCatalog {
  /**
   * Регистрация торговых каталогов (`catalog.catalog.*`).
   */
  public readonly catalog = new BXRestNavvyCatalogCatalog()
  /**
   * Документы складского учёта (`catalog.document.*`).
   */
  public readonly document = new BXRestNavvyCatalogDocument()
  /**
   * Поставщики в документах учёта (`catalog.documentContractor.*`).
   */
  public readonly documentContractor = new BXRestNavvyCatalogDocumentContractor()
  /**
   * Справочники каталога (`catalog.enum.*`).
   */
  public readonly enum = new BXRestNavvyCatalogEnum()
  /**
   * Наценки (`catalog.extra.*`).
   */
  public readonly extra = new BXRestNavvyCatalogExtra()
  /**
   * Единицы измерения (`catalog.measure.*`).
   */
  public readonly measure = new BXRestNavvyCatalogMeasure()
  /**
   * Цены (`catalog.price.*`).
   */
  public readonly price = new BXRestNavvyCatalogPrice()
  /**
   * Типы цен (`catalog.priceType.*`).
   */
  public readonly priceType = new BXRestNavvyCatalogPriceType()
  /**
   * Привязки типов цен к группам покупателей (`catalog.priceTypeGroup.*`).
   */
  public readonly priceTypeGroup = new BXRestNavvyCatalogPriceTypeGroup()
  /**
   * Переводы названий типов цен (`catalog.priceTypeLang.*`).
   */
  public readonly priceTypeLang = new BXRestNavvyCatalogPriceTypeLang()
  /**
   * Товары (`catalog.product.*`).
   */
  public readonly product = new BXRestNavvyCatalogProduct()
  /**
   * Изображения товаров (`catalog.productImage.*`).
   */
  public readonly productImage = new BXRestNavvyCatalogProductImage()
  /**
   * Свойства товаров (`catalog.productProperty.*`).
   */
  public readonly productProperty = new BXRestNavvyCatalogProductProperty()
  /**
   * Значения списочных свойств товаров (`catalog.productPropertyEnum.*`).
   */
  public readonly productPropertyEnum = new BXRestNavvyCatalogProductPropertyEnum()
  /**
   * Параметры свойств товаров (`catalog.productPropertyFeature.*`).
   */
  public readonly productPropertyFeature = new BXRestNavvyCatalogProductPropertyFeature()
  /**
   * Секционные настройки свойств (`catalog.productPropertySection.*`).
   */
  public readonly productPropertySection = new BXRestNavvyCatalogProductPropertySection()
  /**
   * Коэффициенты единиц измерения (`catalog.ratio.*`).
   */
  public readonly ratio = new BXRestNavvyCatalogRatio()
  /**
   * Правила округления цен (`catalog.roundingRule.*`).
   */
  public readonly roundingRule = new BXRestNavvyCatalogRoundingRule()
  /**
   * Разделы каталога (`catalog.section.*`).
   */
  public readonly section = new BXRestNavvyCatalogSection()
  /**
   * Склады (`catalog.store.*`).
   */
  public readonly store = new BXRestNavvyCatalogStore()
  /**
   * Остатки товаров на складах (`catalog.storeProduct.*`).
   */
  public readonly storeProduct = new BXRestNavvyCatalogStoreProduct()
  /**
   * Пользовательские поля каталога (`catalog.userfield.*`).
   */
  public readonly userfield = new BXRestNavvyCatalogUserfield()
  /**
   * Ставки НДС (`catalog.vat.*`).
   */
  public readonly vat = new BXRestNavvyCatalogVat()
}

