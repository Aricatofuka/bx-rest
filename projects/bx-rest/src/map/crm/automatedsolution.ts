import {
  iBXRestCrmAutomatedSolution,
  iBXRestCrmAutomatedSolutionListResult,
  iBXRestCrmAutomatedSolutionResult
} from '../../typification/rest/crm'

export class BXRestMapCrmAutomatedSolution {
  /** Возвращает цифровое рабочее место из контейнера REST-ответа. */
  static get(
    v: iBXRestCrmAutomatedSolutionResult | undefined
  ): iBXRestCrmAutomatedSolution | undefined {
    return v?.automatedSolution
  }

  /** Возвращает список цифровых рабочих мест из контейнера REST-ответа. */
  static list(
    v: iBXRestCrmAutomatedSolutionListResult | undefined
  ): iBXRestCrmAutomatedSolution[] | undefined {
    return v?.automatedSolutions
  }
}
