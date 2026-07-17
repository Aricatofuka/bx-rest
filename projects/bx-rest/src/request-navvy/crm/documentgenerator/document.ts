import { Navvy } from '../../../services/navvy'
import {
  $add,
  $crm,
  $delete,
  $document,
  $documentgenerator,
  $enablepublicurl,
  $get,
  $getFields,
  $list,
  $update,
  $upload
} from '../../../consts/part-name-methods'
import {
  iBXRestCrmDocumentGeneratorDocument,
  iBXRestCrmDocumentGeneratorField,
  iBXRestParamCrmDocumentGeneratorDocumentAdd,
  iBXRestParamCrmDocumentGeneratorDocumentDelete,
  iBXRestParamCrmDocumentGeneratorDocumentEnablePublicUrl,
  iBXRestParamCrmDocumentGeneratorDocumentGet,
  iBXRestParamCrmDocumentGeneratorDocumentGetFields,
  iBXRestParamCrmDocumentGeneratorDocumentList,
  iBXRestParamCrmDocumentGeneratorDocumentUpdate,
  iBXRestParamCrmDocumentGeneratorDocumentUpload
} from '../../../typification/rest/crm'

interface DocumentResult { document?: iBXRestCrmDocumentGeneratorDocument }
interface DocumentListResult { documents?: iBXRestCrmDocumentGeneratorDocument[] }
interface DocumentFieldsResult { documentFields?: Record<string, iBXRestCrmDocumentGeneratorField> }

/** Методы документов генератора документов (`crm.documentgenerator.document.*`). */
export class BXRestNavvyCrmDocumentGeneratorDocument {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Создаёт документ по шаблону. */
    add: [$crm, $documentgenerator, $document, $add],
    /** Обновляет существующий документ. */
    update: [$crm, $documentgenerator, $document, $update],
    /** Возвращает документ по идентификатору. */
    get: [$crm, $documentgenerator, $document, $get],
    /** Возвращает список документов. */
    list: [$crm, $documentgenerator, $document, $list],
    /** Удаляет документ. */
    delete: [$crm, $documentgenerator, $document, $delete],
    /** Включает или выключает публичную ссылку на документ. */
    enablePublicUrl: [$crm, $documentgenerator, $document, $enablepublicurl],
    /** Загружает готовый документ и прикрепляет его к CRM-объекту. */
    upload: [$crm, $documentgenerator, $document, $upload],
    /** Возвращает доступные поля созданного документа. */
    getFields: [$crm, $documentgenerator, $document, $getFields]
  }

  /**
   * Создаёт документ по шаблону для указанного CRM-объекта.
   *
   * `pdfUrl` и `imageUrl` могут появиться позднее, поскольку конвертация выполняется асинхронно.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/documents/crm-document-generator-document-add.html
   */
  add(param: iBXRestParamCrmDocumentGeneratorDocumentAdd) {
    return this.documentRequest(this.url.add, param)
  }

  /**
   * Обновляет значения существующего документа и запускает его повторную генерацию.
   *
   * `pdfUrl` и `imageUrl` могут появиться позднее, поскольку конвертация выполняется асинхронно.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/documents/crm-document-generator-document-update.html
   */
  update(param: iBXRestParamCrmDocumentGeneratorDocumentUpdate) {
    return this.documentRequest(this.url.update, param)
  }

  /**
   * Возвращает документ по идентификатору.
   *
   * Если конвертация ещё не завершилась, повторите запрос через 30–40 секунд.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/documents/crm-document-generator-document-get.html
   */
  get(param: iBXRestParamCrmDocumentGeneratorDocumentGet) {
    return this.documentRequest(this.url.get, param)
  }

  /**
   * Возвращает список документов по фильтру с поддержкой постраничной навигации.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/documents/crm-document-generator-document-list.html
   */
  list(param: iBXRestParamCrmDocumentGeneratorDocumentList = {}) {
    return this.Navvy.pagNavResultKey<
      iBXRestCrmDocumentGeneratorDocument,
      iBXRestCrmDocumentGeneratorDocument,
      iBXRestParamCrmDocumentGeneratorDocumentList,
      'documents'
    >(this.url.list, param, 'documents', (result: DocumentListResult | undefined) => result?.documents)
  }

  /**
   * Удаляет документ.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/documents/crm-document-generator-document-delete.html
   */
  delete(param: iBXRestParamCrmDocumentGeneratorDocumentDelete) {
    return this.Navvy.simple<null, null, iBXRestParamCrmDocumentGeneratorDocumentDelete>(
      this.url.delete,
      param
    )
  }

  /**
   * Включает или выключает публичную ссылку на документ.
   * Если `status` не передан, ссылка включается.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/documents/crm-document-generator-document-enable-public-url.html
   */
  enablePublicUrl(param: iBXRestParamCrmDocumentGeneratorDocumentEnablePublicUrl) {
    return this.Navvy.simple<
      { publicUrl: string | null },
      { publicUrl: string | null },
      iBXRestParamCrmDocumentGeneratorDocumentEnablePublicUrl
    >(this.url.enablePublicUrl, param)
  }

  /**
   * Загружает готовый DOCX-документ и прикрепляет его к CRM-объекту.
   * Дополнительно можно передать готовые PDF и изображение в Base64.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/documents/crm-document-generator-document-upload.html
   */
  upload(param: iBXRestParamCrmDocumentGeneratorDocumentUpload) {
    return this.documentRequest(this.url.upload, param)
  }

  /**
   * Возвращает карточку полей созданного документа.
   * Переданные `values` используются только для вычисления ответа и не изменяют документ.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/document-generator/documents/crm-document-generator-document-get-fields.html
   */
  getFields(param: iBXRestParamCrmDocumentGeneratorDocumentGetFields) {
    return this.Navvy.simple<
      DocumentFieldsResult,
      Record<string, iBXRestCrmDocumentGeneratorField>,
      iBXRestParamCrmDocumentGeneratorDocumentGetFields
    >(this.url.getFields, param, result => result?.documentFields)
  }

  private documentRequest<P>(url: string[], param: P) {
    return this.Navvy.simple<DocumentResult, iBXRestCrmDocumentGeneratorDocument, P>(
      url,
      param,
      result => result?.document
    )
  }
}
