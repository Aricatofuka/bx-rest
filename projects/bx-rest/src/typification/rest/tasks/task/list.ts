import { iBXRestParamSort } from '../../base/sort'
import { iBXRestYesNo } from '../../base/YesNo'
import { iBXRestFilterGenerator } from '../../base/filterGenerator'
import { iBXRestPagination } from '../../base/ApiPaginationBX'
import { iBXRestHttpTask, iBXRestHttpTaskGroupHttp, iBXRestTask } from '../task'
import { iBXRestTaskFieldsName } from '../base/fieldsName'
import { SnakeToCamelCase } from 'snake-camel-types'
import { ToUpperCaseKeys } from '../../../base/upper-case-keys'
import { ObjectToSnake } from 'ts-case-convert/lib/caseConvert'

export interface iBXRestTasksTaskListHttp<S extends iBXRestTaskFieldsName[], CustomFields = {}> {
  tasks: iBXRestHttpTasksTaskList<S, CustomFields>[] | undefined
}

export type iBXRestHttpTasksTaskList<S extends iBXRestTaskFieldsName[], CustomFields = {}> = {
  [K in SnakeToCamelCase<Lowercase<S[number]>>]: iBXRestHttpTask[K]
} & CustomFields

export type iBXRestTasksTaskList<S extends iBXRestTaskFieldsName[], CustomFields = {}> = {
  [K in SnakeToCamelCase<Lowercase<S[number]>>]: iBXRestTask[K]
} & CustomFields

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
export interface iBXRestTasksTaskListDefault extends Partial<iBXRestTask> {
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

export interface iBXRestParamTasksList <CustomFields extends object> extends iBXRestPagination{
    order?: iBXRestParamTaskListOrder
      // & {[key in keyof ToUpperCaseKeys<ObjectToSnake<CustomFields>>]?: iBXRestParamSort}, // так не работает, сортируються только встроенные в битрикс ключи
    filter?: iBXRestFilterGenerator<iBXRestParamTaskListFilter>,
    select?: (iBXRestTaskFieldsName | keyof ToUpperCaseKeys<ObjectToSnake<CustomFields>> | '*' | 'UF_*')[], // массив выводимых полей
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
    MESSAGE_ID?: iBXRestParamSort, // идентификатор поискового индекса
}

export interface iBXRestParamTaskListFilter { // Массив вида {"фильтруемое_поле": "значение фильтра" [, ...]}. Фильтруемое поле может принимать значения:
    ID?: number | number[], // идентификатор задачи
    ACTIVITY_DATE?: string, // дата последней активност
    PARENT_ID?: number, // идентификатор родительской задачи
    GROUP_ID?: number | number[], // рабочая группа
    CREATED_BY?: number | number[], // постановщик
    STATUS_CHANGED_BY?: number, // пользователь, последним изменивший статус задачи
    PRIORITY?: number // приоритет
    FORUM_TOPIC_ID?: number, // идентификатор темы форума
    RESPONSIBLE_ID?: number | number[], // ответственный
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
    // -3 - задача почти просрочена
    // -2 - не просмотренная задача
    // -1 - просроченная задача.
    MARK?: number, // оценка
    SITE_ID?: number, // идентификатор сайта
    ADD_IN_REPORT?: iBXRestYesNo//  задача в отчете (Y|N)
    ALLOW_TIME_TRACKING?: iBXRestYesNo //  выключена ли возможность трекать время
    // TIME_SPENT_IN_LOGS?: number, // общее (всех людей) затреканное время этого параметра вроде нет
    // '>TIME_SPENT_IN_LOGS'?: number,
    // '<TIME_SPENT_IN_LOGS'?: number,
    // '>=TIME_SPENT_IN_LOGS'?: number,
    // '<=TIME_SPENT_IN_LOGS'?: number,
    DATE_START?: Date | string, // дата начала выполнения
    DEADLINE?: Date | string,  // крайний срок
    CREATED_DATE?: Date | string, // дата создания
    CLOSED_DATE?: Date | string, // дата завершения
    CHANGED_DATE?: Date | string, //  дата последнего изменения
    ACCOMPLICE?: number | number[], // идентификатор соисполнителя
    AUDITOR?: number | number[], // идентификатор наблюдателя
    DEPENDS_ON?: number, // идентификатор предыдущей задачи
    ONLY_ROOT_TASKS?: iBXRestYesNo, // только задачи, которые не являются подзадачами (корневые задачи),
    // а также подзадачи родительской задачи,
    // к которой текущий пользователь доступа не имеет (Y|N).
    STAGE_ID?: number | number[] | string | string[]
    UF_CRM_TASK?: number | number[] | string | string[] | any
}
