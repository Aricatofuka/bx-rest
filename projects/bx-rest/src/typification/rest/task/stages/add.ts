export interface iBXRestAddTaskStage {
  TITLE: string, //	Заголовок стадии
  COLOR: string, //	Цвет стадии
  AFTER_ID?: number,	// Идентификатор стадии, после которой надо добавить. Если не указано или равно 0, добавится в начало.
  ENTITY_ID?: number,	// Идентификатор сущности. Может равняться ID группы, тогда стадия добавится в Канбан группы При недостаточном уровне прав выводится ошибка доступа. Если равняется 0 или отсутствует, то стадия добавляется в Мой план текущего пользователя.
  isAdmin?: boolean	// Если установлено true, то проверки прав происходить не будет. При условии, что запрашивающий является админом портала.
}