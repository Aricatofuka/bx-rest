export interface iBXRestDiskFolderAddSubFolderParam {
  id: number // Идентификатор папки
  data: { // Массив, описывающий папку. Обязательное поле NAME - имя новой папки TODO: Выяснить что туда ещё можно добавить
    NAME: string
  }
}
