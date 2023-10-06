import { iBXRestParamSort } from '../../base/sort'
import { iBXRestYesNo } from '../../base/YesNo'
import { iBXRestTaskFieldsName } from '../../task/base/fieldsName'
import { iBXRestFilterGenerator } from '../../base/filterGenerator'
import { iBXRestPagination } from '../../base/ApiPaginationBX'
import { iBXRestHttpTask, iBXRestHttpTaskGroupHttp, iBXRestTask } from '../../task/task'

export interface iBXRestTasksTaskListHttp<T extends iBXRestHttpTasksTaskList | iBXRestTasksTaskListHttpDefault> {
  tasks: T[] | undefined
}

export interface iBXRestHttpTasksTaskList extends iBXRestHttpTask {}

export interface iBXRestTasksTaskList extends iBXRestTask {}

/**
 * Если при запросе tasks.task.list не указывать выводимые поля (select) отдаст этот набор
 */
export interface iBXRestTasksTaskListHttpDefault extends iBXRestHttpTask {
  closedDate: null
  createdDate: string
  durationFact: string
  group: iBXRestHttpTaskGroupHttp
  additionalData: any[]
  id: string
  image: string
  membersCount: number
  name: string
  opened: boolean
  groupId: string
  projectId: string
  timeEstimate: string
  timeSpentInLogs: string
  title: string
}

/**
 * Если при запросе tasks.task.list не указывать выводимые поля (select) отдаст этот набор
 */
export interface iBXRestTasksTaskListDefault extends iBXRestTask {
  closedDate: Date | undefined
  createdDate: Date
  durationFact: string
  group: iBXRestHttpTaskGroupHttp
  additionalData: any[]
  id: number
  image: string
  membersCount: number
  name: string
  opened: boolean
  groupId: number
  projectId: string
  timeEstimate: string
  timeSpentInLogs: string
  title: string
}

export interface iBXRestParamTasksList extends iBXRestPagination{
    order?: iBXRestParamTaskListOrder,
    filter?: iBXRestParamTaskListFilter,
    select?: iBXRestFilterGenerator<iBXRestTaskFieldsName>[], // массив выводимых полей
}

export interface iBXRestParamTaskListOrder { // Массив для сортировки результата. Массив вида {"поле_сортировки": 'направление сортировки' [, ...]}.
                                             // Поле для сортировки может принимать значения:
    ID?: iBXRestParamSort, // идентификатор задачи
    TITLE?: iBXRestParamSort, // название задачи
    TIME_SPENT_IN_LOGS?: iBXRestParamSort, // затраченное время из истории изменений
    DATE_START?: iBXRestParamSort, // дата старта
    CREATED_DATE?: iBXRestParamSort, // дата создания
    CHANGED_DATE?: iBXRestParamSort, //  дата последнего изменения
    CLOSED_DATE?: iBXRestParamSort, // дата завершения
    START_DATE_PLAN?: iBXRestParamSort, // плановое начало
    END_DATE_PLAN?: iBXRestParamSort, // плановое завершение
    DEADLINE?: iBXRestParamSort, // крайний срок
    REAL_STATUS?: iBXRestParamSort, //  статус задачи. Константы отражающие статусы задач:
                          // STATE_NEW = 1
                          // STATE_PENDING = 2
                          // STATE_IN_PROGRESS = 3
                          // STATE_SUPPOSEDLY_COMPLETED = 4
                          // STATE_COMPLETED = 5
                          // STATE_DEFERRED = 6
                          // STATE_DECLINED = 7
    STATUS_COMPLETE?: iBXRestParamSort, // флаг завершенности задачи
    PRIORITY?: iBXRestParamSort // приоритет
    MARK?: iBXRestParamSort, // оценка
    CREATED_BY_LAST_NAME?: iBXRestParamSort, // постановщик
    RESPONSIBLE_LAST_NAME?: iBXRestParamSort, // ответственный
    GROUP_ID?: iBXRestParamSort, // рабочая группа
    TIME_ESTIMATE?: iBXRestParamSort, // затраченное время
    ALLOW_CHANGE_DEADLINE?: iBXRestParamSort, // флаг "Разрешить ответственному менять крайний срок"
    ALLOW_TIME_TRACKING?: iBXRestParamSort, // флаг включения учета затраченного времени по задаче
    MATCH_WORK_TIME?: iBXRestParamSort // пропустить выходные дни
    FAVORITE?: iBXRestParamSort //  Избранное
    SORTING?: iBXRestParamSort, // индекс сортировки
    MESSAGE_ID?: iBXRestParamSort // идентификатор поискового индекса
}

export interface iBXRestParamTaskListFilter { // Массив вида {"фильтруемое_поле": "значение фильтра" [, ...]}. Фильтруемое поле может принимать значения:
    ID?: number | number[], // идентификатор задачи
    ACTIVITY_DATE?: string, // дата последней активност
    PARENT_ID?: number, // идентификатор родительской задачи
    GROUP_ID?: number, // рабочая группа
    CREATED_BY?: number, // постановщик
    STATUS_CHANGED_BY?: number, // пользователь, последним изменивший статус задачи
    PRIORITY?: number // приоритет
    FORUM_TOPIC_ID?: number, // идентификатор темы форума
    RESPONSIBLE_ID?: number, // ответственный
    TITLE?: string, //  название задачи (можно искать по шаблону [%_])
    TAG?: string,
    REAL_STATUS?: number | number[], //  статус задачи. Константы отражающие статусы задач:
    // STATE_NEW = 1
    // STATE_PENDING = 2
    // STATE_IN_PROGRESS = 3
    // STATE_SUPPOSEDLY_COMPLETED = 4
    // STATE_COMPLETED = 5
    // STATE_DEFERRED = 6
    // STATE_DECLINED = 7
    STATUS?: number | number[], //  статус для сортировки. Аналогичен REAL_STATUS, но имеет дополнительно три мета-статуса:
    // -3 - задача почти просрочена;
    // -2 - не просмотренная задача;
    // -1 - просроченная задача.
    MARK?: number, // оценка
    SITE_ID?: number, // идентификатор сайта
    ADD_IN_REPORT?: 'Y' | 'N', //  задача в отчете (Y|N)
    ALLOW_TIME_TRACKING?: 'Y' | 'N', //  выключена ли возможность трекать время
    // TIME_SPENT_IN_LOGS?: number, // общее (всех людей) затреканное время этого параметра вроде нет
    // '>TIME_SPENT_IN_LOGS'?: number,
    // '<TIME_SPENT_IN_LOGS'?: number,
    // '>=TIME_SPENT_IN_LOGS'?: number,
    // '<=TIME_SPENT_IN_LOGS'?: number,
    DATE_START?: string, // дата начала выполнения
    DEADLINE?: string,  // крайний срок
    CREATED_DATE?: string, // дата создания
    CLOSED_DATE?: string, // дата завершения
    CHANGED_DATE?: string, //  дата последнего изменения
    ACCOMPLICE?: number, // идентификатор соисполнителя
    AUDITOR?: number, // идентификатор наблюдателя
    DEPENDS_ON?: number, // идентификатор предыдущей задачи;
    ONLY_ROOT_TASKS?: iBXRestYesNo, // только задачи, которые не являются подзадачами (корневые задачи),
    // а также подзадачи родительской задачи,
    // к которой текущий пользователь доступа не имеет (Y|N).
    STAGE_ID?: number | number[] | string | string[]
    UF_CRM_TASK?: number | number[] | string | string[] | any
}
