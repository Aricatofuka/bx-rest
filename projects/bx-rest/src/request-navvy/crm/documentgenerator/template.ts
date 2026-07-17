import { Navvy } from '../../../services/navvy'
import {
  $add,
  $crm,
  $delete,
  $documentgenerator,
  $get,
  $getFields,
  $list,
  $template,
  $update
} from '../../../consts/part-name-methods'
import {
  iBXRestCrmDocumentGeneratorField,
  iBXRestCrmDocumentGeneratorTemplate,
  iBXRestParamCrmDocumentGeneratorTemplateAdd,
  iBXRestParamCrmDocumentGeneratorTemplateDelete,
  iBXRestParamCrmDocumentGeneratorTemplateGet,
  iBXRestParamCrmDocumentGeneratorTemplateGetFields,
  iBXRestParamCrmDocumentGeneratorTemplateList,
  iBXRestParamCrmDocumentGeneratorTemplateUpdate
} from '../../../typification/rest/crm'

interface TemplateResult { template?: iBXRestCrmDocumentGeneratorTemplate }
interface TemplateListResult { templates?: Record<string, iBXRestCrmDocumentGeneratorTemplate> }
interface TemplateFieldsResult { templateFields?: Record<string, iBXRestCrmDocumentGeneratorField> }

/** Методы шаблонов генератора документов (`crm.documentgenerator.template.*`). */
export class BXRestNavvyCrmDocumentGeneratorTemplate {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Добавляет новый шаблон документа. */
    add: [$crm, $documentgenerator, $template, $add],
    /** Обновляет существующий шаблон документа. */
    update: [$crm, $documentgenerator, $template, $update],
    /** Возвращает шаблон документа по идентификатору. */
    get: [$crm, $documentgenerator, $template, $get],
    /** Возвращает список шаблонов документов. */
    list: [$crm, $documentgenerator, $template, $list],
    /** Удаляет шаблон документа. */
    delete: [$crm, $documentgenerator, $template, $delete],
    /** Возвращает доступные поля шаблона для CRM-объекта. */
    getFields: [$crm, $documentgenerator, $template, $getFields]
  }

  /**
   * Добавляет новый шаблон документа из файла DOCX.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/templates/crm-document-generator-template-add.html
   */
  add(param: iBXRestParamCrmDocumentGeneratorTemplateAdd) {
    return this.Navvy.simple<
      TemplateResult,
      iBXRestCrmDocumentGeneratorTemplate,
      iBXRestParamCrmDocumentGeneratorTemplateAdd
    >(this.url.add, param, result => result?.template)
  }

  /**
   * Обновляет существующий шаблон документа.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/templates/crm-document-generator-template-update.html
   */
  update(param: iBXRestParamCrmDocumentGeneratorTemplateUpdate) {
    return this.Navvy.simple<
      TemplateResult,
      iBXRestCrmDocumentGeneratorTemplate,
      iBXRestParamCrmDocumentGeneratorTemplateUpdate
    >(this.url.update, param, result => result?.template)
  }

  /**
   * Возвращает информацию о шаблоне документа по идентификатору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/templates/crm-document-generator-template-get.html
   */
  get(param: iBXRestParamCrmDocumentGeneratorTemplateGet) {
    return this.Navvy.simple<
      TemplateResult,
      iBXRestCrmDocumentGeneratorTemplate,
      iBXRestParamCrmDocumentGeneratorTemplateGet
    >(this.url.get, param, result => result?.template)
  }

  /**
   * Возвращает список шаблонов с поддержкой постраничной навигации.
   *
   * В ответе Битрикс24 шаблоны индексированы идентификаторами; навигатор преобразует их в массив.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/templates/crm-document-generator-template-list.html
   */
  list(param: iBXRestParamCrmDocumentGeneratorTemplateList = {}) {
    return this.Navvy.pagNavResultKeyObject<
      iBXRestCrmDocumentGeneratorTemplate,
      iBXRestCrmDocumentGeneratorTemplate,
      iBXRestParamCrmDocumentGeneratorTemplateList,
      'templates'
    >(
      this.url.list,
      param,
      'templates',
      (result: TemplateListResult | undefined) => result?.templates
        ? Object.values(result.templates)
        : undefined
    )
  }

  /**
   * Удаляет шаблон документа.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/templates/crm-document-generator-template-delete.html
   */
  delete(param: iBXRestParamCrmDocumentGeneratorTemplateDelete) {
    return this.Navvy.simple<null, null, iBXRestParamCrmDocumentGeneratorTemplateDelete>(
      this.url.delete,
      param
    )
  }

  /**
   * Возвращает карточку полей шаблона для указанного типа и элемента CRM.
   * Переданные `values` применяются временно и не изменяют данные CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/templates/crm-document-generator-template-get-fields.html
   */
  getFields(param: iBXRestParamCrmDocumentGeneratorTemplateGetFields) {
    return this.Navvy.simple<
      TemplateFieldsResult,
      Record<string, iBXRestCrmDocumentGeneratorField>,
      iBXRestParamCrmDocumentGeneratorTemplateGetFields
    >(this.url.getFields, param, result => result?.templateFields)
  }
}
