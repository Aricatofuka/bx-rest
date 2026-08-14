import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $AttachedVote, $download, $get, $getAnswerVoted, $getMany, $getWithVoted, $recall, $resume, $stop, $vote } from '../../consts/part-name-methods'

export class BXRestNavvyVoteAttachedVote {
  private readonly Navvy = new Navvy()

  /**
   * Скачивает отчёт по голосованию.
   */
  download(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$vote, $AttachedVote, $download], param)
  }

  /**
   * Возвращает данные прикреплённого голосования.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$vote, $AttachedVote, $get], param)
  }

  /**
   * Возвращает список проголосовавших за ответ.
   */
  getAnswerVoted(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$vote, $AttachedVote, $getAnswerVoted], param)
  }

  /**
   * Возвращает несколько голосований.
   */
  getMany(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$vote, $AttachedVote, $getMany], param)
  }

  /**
   * Возвращает данные голосования вместе со списком проголосовавших.
   */
  getWithVoted(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$vote, $AttachedVote, $getWithVoted], param)
  }

  /**
   * Отзывает голос.
   */
  recall(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$vote, $AttachedVote, $recall], param)
  }

  /**
   * Возобновляет голосование.
   */
  resume(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$vote, $AttachedVote, $resume], param)
  }

  /**
   * Останавливает голосование.
   */
  stop(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$vote, $AttachedVote, $stop], param)
  }

  /**
   * Голосует в прикреплённом голосовании.
   */
  vote(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$vote, $AttachedVote, $vote], param)
  }
}

