import { BXRestNavvyBookingV1Booking } from './v1/booking'
import { BXRestNavvyBookingV1ClientType } from './v1/clienttype'
import { BXRestNavvyBookingV1Resource } from './v1/resource'
import { BXRestNavvyBookingV1ResourceType } from './v1/resourcetype'
import { BXRestNavvyBookingV1Waitlist } from './v1/waitlist'

export class BXRestNavvyBookingV1 {
  public readonly booking = new BXRestNavvyBookingV1Booking()
  public readonly clientType = new BXRestNavvyBookingV1ClientType()
  public readonly resource = new BXRestNavvyBookingV1Resource()
  public readonly resourceType = new BXRestNavvyBookingV1ResourceType()
  public readonly waitlist = new BXRestNavvyBookingV1Waitlist()
}

