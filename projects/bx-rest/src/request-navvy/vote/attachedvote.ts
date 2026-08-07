import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $AttachedVote, $download, $get, $getAnswerVoted, $getMany, $getWithVoted, $recall, $resume, $stop, $vote } from '../../consts/part-name-methods'

export class BXRestNavvyVoteAttachedVote {
  private readonly Navvy = new Navvy()

  download(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$vote, $AttachedVote, $download], param)
  }

  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$vote, $AttachedVote, $get], param)
  }

  getAnswerVoted(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$vote, $AttachedVote, $getAnswerVoted], param)
  }

  getMany(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$vote, $AttachedVote, $getMany], param)
  }

  getWithVoted(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$vote, $AttachedVote, $getWithVoted], param)
  }

  recall(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$vote, $AttachedVote, $recall], param)
  }

  resume(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$vote, $AttachedVote, $resume], param)
  }

  stop(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$vote, $AttachedVote, $stop], param)
  }

  vote(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$vote, $AttachedVote, $vote], param)
  }
}

