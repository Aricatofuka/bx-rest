import { Navvy } from '../../../services/navvy'
import {
  $add,
  $crm,
  $delete,
  $documentgenerator,
  $get,
  $list,
  $numerator,
  $update
} from '../../../consts/part-name-methods'
import {
  iBXRestCrmDocumentGeneratorNumerator,
  iBXRestParamCrmDocumentGeneratorNumeratorAdd,
  iBXRestParamCrmDocumentGeneratorNumeratorDelete,
  iBXRestParamCrmDocumentGeneratorNumeratorGet,
  iBXRestParamCrmDocumentGeneratorNumeratorList,
  iBXRestParamCrmDocumentGeneratorNumeratorUpdate
} from '../../../typification/rest/crm'

interface NumeratorResult { numerator?: iBXRestCrmDocumentGeneratorNumerator }
interface NumeratorListResult { numerators?: iBXRestCrmDocumentGeneratorNumerator[] }

/** Методы нумераторов генератора документов (`crm.documentgenerator.numerator.*`). */
export class BXRestNavvyCrmDocumentGeneratorNumerator {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Добавляет новый нумератор. */
    add: [$crm, $documentgenerator, $numerator, $add],
    /** Обновляет существующий нумератор. */
    update: [$crm, $documentgenerator, $numerator, $update],
    /** Возвращает нумератор по идентификатору. */
    get: [$crm, $documentgenerator, $numerator, $get],
    /** Возвращает список нумераторов. */
    list: [$crm, $documentgenerator, $numerator, $list],
    /** Удаляет созданный через REST нумератор. */
    delete: [$crm, $documentgenerator, $numerator, $delete]
  }

  /**
   * Добавляет новый нумератор.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.html
   */
  add(param: iBXRestParamCrmDocumentGeneratorNumeratorAdd) {
    return this.Navvy.simple<
      NumeratorResult,
      iBXRestCrmDocumentGeneratorNumerator,
      iBXRestParamCrmDocumentGeneratorNumeratorAdd
    >(this.url.add, param, result => result?.numerator)
  }

  /**
   * Обновляет существующий нумератор и возвращает его актуальные данные.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/numerator/crm-document-generator-numerator-update.html
   */
  update(param: iBXRestParamCrmDocumentGeneratorNumeratorUpdate) {
    return this.Navvy.simple<
      iBXRestCrmDocumentGeneratorNumerator,
      iBXRestCrmDocumentGeneratorNumerator,
      iBXRestParamCrmDocumentGeneratorNumeratorUpdate
    >(this.url.update, param)
  }

  /**
   * Возвращает информацию о нумераторе по идентификатору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/numerator/crm-document-generator-numerator-get.html
   */
  get(param: iBXRestParamCrmDocumentGeneratorNumeratorGet) {
    return this.Navvy.simple<
      NumeratorResult,
      iBXRestCrmDocumentGeneratorNumerator,
      iBXRestParamCrmDocumentGeneratorNumeratorGet
    >(this.url.get, param, result => result?.numerator)
  }

  /**
   * Возвращает список нумераторов с поддержкой постраничной навигации.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/numerator/crm-document-generator-numerator-list.html
   */
  list(param: iBXRestParamCrmDocumentGeneratorNumeratorList = {}) {
    return this.Navvy.pagNavResultKey<
      iBXRestCrmDocumentGeneratorNumerator,
      iBXRestCrmDocumentGeneratorNumerator,
      iBXRestParamCrmDocumentGeneratorNumeratorList,
      'numerators'
    >(this.url.list, param, 'numerators', (result: NumeratorListResult | undefined) => result?.numerators)
  }

  /**
   * Удаляет нумератор. Удалить можно только нумератор, созданный через REST.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/numerator/crm-document-generator-numerator-delete.html
   */
  delete(param: iBXRestParamCrmDocumentGeneratorNumeratorDelete) {
    return this.Navvy.simple<null, null, iBXRestParamCrmDocumentGeneratorNumeratorDelete>(
      this.url.delete,
      param
    )
  }
}
