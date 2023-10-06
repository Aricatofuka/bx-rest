import { iBXRestParamSort } from '../../base/sort'
import { iBXRestFilterGenerator } from '../../base/filterGenerator'
import { iBXRestAlternativePagination } from '../../base/ApiPaginationBX'

export interface iBXRestParamElapseditemGet extends iBXRestAlternativePagination{
  TASKID?: number | number[]
  ORDER?: { // Массив для сортировки результата. Поле для сортировки может принимать значения:
    ID?: iBXRestParamSort // идентификатор записи о затраченном времени
    USER_ID?: iBXRestParamSort // идентификатор пользователя, от имени которого была сделана запись о затраченном времени
    MINUTES?: iBXRestParamSort // затраченное время, минуты
    SECONDS?: iBXRestParamSort  // затраченное время, секунды
    CREATED_DATE?: iBXRestParamSort // дата создания записи
    DATE_START?: iBXRestParamSort // дата начала
    DATE_STOP?: iBXRestParamSort // дата конца
  }
    // Направление сортировки может принимать значения
    //   asc - по возрастанию
    // desc - по убыванию
    // Необязательный. По умолчанию фильтруется по убыванию идентификатора записи о затраченном времени
  FILTER?: iBXRestFilterGenerator<iBXRestParamElapseditemGetFilter>
  SELECT?: string[]	// Массив полей записей, которые будут возвращены методом. Можно указать только те поля, которые необходимы
                    // Если в массиве присутствует значение "*", то будут возвращены все доступные поля
  // Значение по умолчанию - пустой массив array() - означает, что будут возвращены все поля основной таблицы запроса
}

interface iBXRestParamElapseditemGetFilter {
  ID?: number, // идентификатор комментария
  USER_ID?: number | number[] // идентификатор пользователя, от имени которого была сделана запись о затраченном времени
  CREATED_DATE?: string, // дата создания записи
}
