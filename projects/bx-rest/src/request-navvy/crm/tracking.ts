import { BXRestNavvyCrmTrackingTrace } from './tracking/trace'

export class BXRestNavvyCrmTracking {
  /**
   * Трассировки сквозной аналитики (`crm.tracking.trace.*`).
   */
  public readonly trace = new BXRestNavvyCrmTrackingTrace()
}

