import { BXRestNavvyVoteAttachedVote } from './attachedvote'
import { BXRestNavvyVoteIntegration } from './integration'

export class BXRestNavvyVote {
  /**
   * Прикреплённые голосования (`vote.AttachedVote.*`).
   */
  public readonly AttachedVote = new BXRestNavvyVoteAttachedVote()
  /**
   * Интеграция голосований с чатами (`vote.Integration.*`).
   */
  public readonly Integration = new BXRestNavvyVoteIntegration()
}

