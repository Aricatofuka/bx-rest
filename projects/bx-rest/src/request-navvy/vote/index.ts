import { BXRestNavvyVoteAttachedVote } from './attachedvote'
import { BXRestNavvyVoteIntegration } from './integration'

export class BXRestNavvyVote {
  public readonly AttachedVote = new BXRestNavvyVoteAttachedVote()
  public readonly Integration = new BXRestNavvyVoteIntegration()
}

