import { BXRestNavvySaleBasketItem } from './basketitem'
import { BXRestNavvySaleBasketProperties } from './basketproperties'
import { BXRestNavvySaleBusinessValuePersonDomain } from './businessvaluepersondomain'
import { BXRestNavvySaleCashbox } from './cashbox'
import { BXRestNavvySaleDelivery } from './delivery'
import { BXRestNavvySaleOrder } from './order'
import { BXRestNavvySalePayment } from './payment'
import { BXRestNavvySalePaymentItemBasket } from './paymentitembasket'
import { BXRestNavvySalePaymentItemShipment } from './paymentitemshipment'
import { BXRestNavvySalePaySystem } from './paysystem'
import { BXRestNavvySalePersonType } from './persontype'
import { BXRestNavvySaleProperty } from './property'
import { BXRestNavvySalePropertyGroup } from './propertygroup'
import { BXRestNavvySalePropertyRelation } from './propertyrelation'
import { BXRestNavvySalePropertyValue } from './propertyvalue'
import { BXRestNavvySalePropertyVariant } from './propertyvariant'
import { BXRestNavvySaleShipment } from './shipment'
import { BXRestNavvySaleShipmentItem } from './shipmentitem'
import { BXRestNavvySaleShipmentProperty } from './shipmentproperty'
import { BXRestNavvySaleShipmentPropertyValue } from './shipmentpropertyvalue'
import { BXRestNavvySaleStatus } from './status'
import { BXRestNavvySaleStatusLang } from './statuslang'
import { BXRestNavvySaleTradeBinding } from './tradebinding'
import { BXRestNavvySaleTradePlatform } from './tradeplatform'

export class BXRestNavvySale {
  /**
   * Элементы корзины (`sale.basketItem.*`).
   */
  public readonly basketItem = new BXRestNavvySaleBasketItem()
  /**
   * Свойства элементов корзины (`sale.basketProperties.*`).
   */
  public readonly basketProperties = new BXRestNavvySaleBasketProperties()
  /**
   * Соответствия типов плательщиков (`sale.businessValuePersonDomain.*`).
   */
  public readonly businessValuePersonDomain = new BXRestNavvySaleBusinessValuePersonDomain()
  /**
   * Кассы (`sale.cashbox.*`).
   */
  public readonly cashbox = new BXRestNavvySaleCashbox()
  /**
   * Службы доставки (`sale.delivery.*`).
   */
  public readonly delivery = new BXRestNavvySaleDelivery()
  /**
   * Заказы (`sale.order.*`).
   */
  public readonly order = new BXRestNavvySaleOrder()
  /**
   * Оплаты (`sale.payment.*`).
   */
  public readonly payment = new BXRestNavvySalePayment()
  /**
   * Привязки элементов корзины к оплатам (`sale.paymentItemBasket.*`).
   */
  public readonly paymentItemBasket = new BXRestNavvySalePaymentItemBasket()
  /**
   * Привязки оплат к отгрузкам (`sale.paymentItemShipment.*`).
   */
  public readonly paymentItemShipment = new BXRestNavvySalePaymentItemShipment()
  /**
   * Платёжные системы (`sale.paysystem.*`).
   */
  public readonly paySystem = new BXRestNavvySalePaySystem()
  /**
   * Типы плательщиков (`sale.personType.*`).
   */
  public readonly personType = new BXRestNavvySalePersonType()
  /**
   * Свойства заказа (`sale.property.*`).
   */
  public readonly property = new BXRestNavvySaleProperty()
  /**
   * Группы свойств заказа (`sale.propertyGroup.*`).
   */
  public readonly propertyGroup = new BXRestNavvySalePropertyGroup()
  /**
   * Привязки свойств заказа (`sale.propertyRelation.*`).
   */
  public readonly propertyRelation = new BXRestNavvySalePropertyRelation()
  /**
   * Значения свойств заказа (`sale.propertyValue.*`).
   */
  public readonly propertyValue = new BXRestNavvySalePropertyValue()
  /**
   * Значения списочных свойств заказа (`sale.propertyVariant.*`).
   */
  public readonly propertyVariant = new BXRestNavvySalePropertyVariant()
  /**
   * Отгрузки (`sale.shipment.*`).
   */
  public readonly shipment = new BXRestNavvySaleShipment()
  /**
   * Товарные позиции отгрузки (`sale.shipmentItem.*`).
   */
  public readonly shipmentItem = new BXRestNavvySaleShipmentItem()
  /**
   * Свойства отгрузки (`sale.shipmentProperty.*`).
   */
  public readonly shipmentProperty = new BXRestNavvySaleShipmentProperty()
  /**
   * Значения свойств отгрузки (`sale.shipmentPropertyValue.*`).
   */
  public readonly shipmentPropertyValue = new BXRestNavvySaleShipmentPropertyValue()
  /**
   * Статусы (`sale.status.*`).
   */
  public readonly status = new BXRestNavvySaleStatus()
  /**
   * Локализации статусов (`sale.statusLang.*`).
   */
  public readonly statusLang = new BXRestNavvySaleStatusLang()
  /**
   * Привязки источников заказов (`sale.tradeBinding.*`).
   */
  public readonly tradeBinding = new BXRestNavvySaleTradeBinding()
  /**
   * Источники заказов (`sale.tradePlatform.*`).
   */
  public readonly tradePlatform = new BXRestNavvySaleTradePlatform()
}

