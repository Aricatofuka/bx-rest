
export interface iBXRestParamUploadFile {
  id: number, //	Идентификатор хранилища
  fileContent: string[],	// Аналогично 'DETAIL_PICTURE' в примере https://dev.1c-bitrix.ru/rest_help/js_library/rest/files.php.
  data: {
    NAME: string
  },	// Массив, описывающий файл. Обязательное поле NAME - имя нового файла.
  generateUniqueName?: boolean // Необязательный, по умолчанию false. При указании true, для загружаемого файла будет уникализировано имя, добавлением суффикса (1), (2) и т.п.
  rights?: any[] // Необязательный, по умолчанию пустой массив. Массив прав доступа на загружаемый файл.
}
