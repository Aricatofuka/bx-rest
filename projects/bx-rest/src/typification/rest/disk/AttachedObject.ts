export interface iBXRestParamRestDiskAttachedObject {
  id: number
}

export interface iBXRestDiskAttachedObject extends iBXRestDiskAttachedObjectBase{
  ID: number,
  OBJECT_ID: number, //идентификатор файла из Диска
  ENTITY_ID: number, //идентификатор сущности, к которой идет прикрепление
  CREATE_TIME: Date, //время создания
  CREATED_BY: number, //идентификатор пользователя, который создал привязку
  SIZE: number //размер файла в байтах
}

export interface iBXRestDiskAttachedObjectHttp extends iBXRestDiskAttachedObjectBase{
  ID: string,
  OBJECT_ID: string, //идентификатор файла из Диска
  ENTITY_ID: string, //идентификатор сущности, к которой идет прикрепление
  CREATE_TIME: string, //время создания
  CREATED_BY: string, //идентификатор пользователя, который создал привязку
  SIZE: string //размер файла в байтах
}

interface iBXRestDiskAttachedObjectBase {
  MODULE_ID: string, //модуль, который владеет пользовательским свойством
  ENTITY_TYPE: string, //тип сущности
  DOWNLOAD_URL: string,
  NAME: string, //имя файла
}
