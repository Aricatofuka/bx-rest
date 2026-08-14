import { BXRestNavvyVoteIntegrationIm } from './integration/im'

export class BXRestNavvyVoteIntegration {
  /**
   * Интеграция голосований с чатами (`vote.Integration.Im.*`).
   */
  public readonly Im = new BXRestNavvyVoteIntegrationIm()
}

