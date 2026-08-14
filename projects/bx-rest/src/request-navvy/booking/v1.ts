import { BXRestNavvyBookingV1Booking } from './v1/booking'
import { BXRestNavvyBookingV1ClientType } from './v1/clienttype'
import { BXRestNavvyBookingV1Resource } from './v1/resource'
import { BXRestNavvyBookingV1ResourceType } from './v1/resourcetype'
import { BXRestNavvyBookingV1Waitlist } from './v1/waitlist'

export class BXRestNavvyBookingV1 {
  /**
   * Бронирования (`booking.v1.booking.*`).
   */
  public readonly booking = new BXRestNavvyBookingV1Booking()
  /**
   * Типы клиентов онлайн-записи (`booking.v1.clientType.*`).
   */
  public readonly clientType = new BXRestNavvyBookingV1ClientType()
  /**
   * Ресурсы онлайн-записи (`booking.v1.resource.*`).
   */
  public readonly resource = new BXRestNavvyBookingV1Resource()
  /**
   * Типы ресурсов онлайн-записи (`booking.v1.resourceType.*`).
   */
  public readonly resourceType = new BXRestNavvyBookingV1ResourceType()
  /**
   * Лист ожидания онлайн-записи (`booking.v1.waitlist.*`).
   */
  public readonly waitlist = new BXRestNavvyBookingV1Waitlist()
}

