import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $answer, $finish, $imopenlines, $operator, $skip, $spam, $transfer } from '../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesOperatorAnother } from './operator/another'

export class BXRestNavvyImOpenLinesOperator  {
  private readonly Navvy = new Navvy()

  /**
   * Завершение диалога другого оператора (`imopenlines.operator.another.*`).
   */
  public readonly another = new BXRestNavvyImOpenLinesOperatorAnother()

  /**
   * Передаёт диалог текущему оператору.
   */
  answer(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $operator, $answer], param)
  }

  /**
   * Завершает диалог от имени текущего оператора.
   */
  finish(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $operator, $finish], param)
  }

  /**
   * Передаёт диалог следующему оператору в очереди.
   */
  skip(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $operator, $skip], param)
  }

  /**
   * Отмечает диалог как спам.
   */
  spam(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $operator, $spam], param)
  }

  /**
   * Передаёт диалог другому оператору или в другую линию.
   */
  transfer(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $operator, $transfer], param)
  }
}

