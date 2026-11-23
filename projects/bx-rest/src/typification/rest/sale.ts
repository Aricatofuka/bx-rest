/** Parameters for `sale.delivery.config.get`. */
export interface iBXRestParamSaleDeliveryConfigGet {
  ID: number
}

/** Parameters for `sale.delivery.extra.service.get`. */
export interface iBXRestParamSaleDeliveryExtraServiceGet {
  DELIVERY_ID: number
}

/** Parameters for `sale.paysystem.settings.get`. */
export interface iBXRestParamSalePaySystemSettingsGet {
  ID: number
  PERSON_TYPE_ID: number
}

/** Parameters for `sale.paysystem.settings.payment.get`. */
export interface iBXRestParamSalePaySystemSettingsPaymentGet {
  PAYMENT_ID: number
  PAY_SYSTEM_ID: number
}

/** Parameters for catalog entities returned by `get` methods. */
export interface iBXRestParamSaleGet {
  id: number
}
