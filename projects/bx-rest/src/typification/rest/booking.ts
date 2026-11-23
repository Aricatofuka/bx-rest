/** Parameters required by the corresponding online-booking REST methods. */
export interface iBXRestParamBookingV1BookingClientList {
  bookingId: number
}

export interface iBXRestParamBookingV1BookingExternalDataList {
  bookingId: number
}

export interface iBXRestParamBookingV1ResourceGet {
  id: number
}

export interface iBXRestParamBookingV1ResourceSlotsList {
  resourceId: number
}

export interface iBXRestParamBookingV1WaitlistGet {
  id: number
}

export interface iBXRestParamBookingV1WaitlistClientList {
  waitListId: number
}

export interface iBXRestParamBookingV1WaitlistExternalDataList {
  waitListId: number
}
