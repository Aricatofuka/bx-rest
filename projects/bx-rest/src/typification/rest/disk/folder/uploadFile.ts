export interface iBXRestDiskFolderUploadFileParam {
  id: number, // Идентификатор папки. В текущем API загружать файл по пути к папке невозможно. Необходимо обязательно вычислить ID папки
  fileContent: string, // Аналогично 'DETAIL_PICTURE' в примере Обработка файлов (['имя файла', 'содержимое в base64'])
  data: {
    NAME: string
  } // Обязательное поле NAME - имя нового файла TODO: Выяснить какие там другие поля
  generateUniqueName?: boolean // Необязательный, по умолчанию false. При указании true, для загружаемого файла будет уникализировано имя, добавлением суффикса (1), (2) и т.п.
  rights?: [] // Необязательный, по умолчанию пустой массив. Массив прав доступа на загружаемый файл.
}

export interface iBXRestDiskFolderUploadFileParamRights {
  TASK_ID: number,
  ACCESS_CODE: string,  // 'U35' - доступ для пользователя с ID=35, для получения названия типа доступа можно воспользоваться https://dev.1c-bitrix.ru/rest_help/general/access_name.php
}
