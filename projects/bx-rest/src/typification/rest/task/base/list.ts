import SelectRequestApiTaskBX from '@/lib/typification/bitrix/api/rest/task/requests/SelectRequestApiTaskBX'
import ApiPaginationBX from '@/lib/typification/bitrix/api/rest/base/ApiPaginationBX'
import { iBXRestYesNo } from '@/lib/typification/bitrix/api/rest/base/YesNo'


export interface RequestApiTaskListBX extends ApiPaginationBX {
    order?: RequestApiTaskListBXOrder,
    filter?: RequestApiTaskListBXFilter,
    select?: SelectRequestApiTaskBX[], // массив выводимых полей
}

type BXOrderDirection = 'asc' | 'desc' // asc - по возрастанию; desc - по убыванию;

export interface RequestApiTaskListBXOrder { // Массив для сортировки результата. Массив вида {"поле_сортировки": 'направление сортировки' [, ...]}.
                                             // Поле для сортировки может принимать значения:
    ID?: BXOrderDirection, // идентификатор задачи
    TITLE?: BXOrderDirection, // название задачи
    TIME_SPENT_IN_LOGS?: BXOrderDirection, // затраченное время из истории изменений
    DATE_START?: BXOrderDirection, // дата старта
    CREATED_DATE?: BXOrderDirection, // дата создания
    CHANGED_DATE?: BXOrderDirection, //  дата последнего изменения
    CLOSED_DATE?: BXOrderDirection, // дата завершения
    START_DATE_PLAN?: BXOrderDirection, // плановое начало
    END_DATE_PLAN?: BXOrderDirection, // плановое завершение
    DEADLINE?: BXOrderDirection, // крайний срок
    REAL_STATUS?: BXOrderDirection, //  статус задачи. Константы отражающие статусы задач:
                          // STATE_NEW = 1
                          // STATE_PENDING = 2
                          // STATE_IN_PROGRESS = 3
                          // STATE_SUPPOSEDLY_COMPLETED = 4
                          // STATE_COMPLETED = 5
                          // STATE_DEFERRED = 6
                          // STATE_DECLINED = 7
    STATUS_COMPLETE?: BXOrderDirection, // флаг завершенности задачи
    PRIORITY?: BXOrderDirection // приоритет
    MARK?: BXOrderDirection, // оценка
    CREATED_BY_LAST_NAME?: BXOrderDirection, // постановщик
    RESPONSIBLE_LAST_NAME?: BXOrderDirection, // ответственный
    GROUP_ID?: BXOrderDirection, // рабочая группа
    TIME_ESTIMATE?: BXOrderDirection, // затраченное время
    ALLOW_CHANGE_DEADLINE?: BXOrderDirection, // флаг "Разрешить ответственному менять крайний срок"
    ALLOW_TIME_TRACKING?: BXOrderDirection, // флаг включения учета затраченного времени по задаче
    MATCH_WORK_TIME?: BXOrderDirection // пропустить выходные дни
    FAVORITE?: BXOrderDirection //  Избранное
    SORTING?: BXOrderDirection, // индекс сортировки
    MESSAGE_ID?: BXOrderDirection // идентификатор поискового индекса
}

export interface RequestApiTaskListBXFilter { // Массив вида {"фильтруемое_поле": "значение фильтра" [, ...]}. Фильтруемое поле может принимать значения:
    ID?: number | number[], // идентификатор задачи
    '>ID'?: number,
    '<ID'?: number,
    '>=ID'?: number,
    '<=ID'?: number,
    '=ID'?: number,
    '!ID'?: number,
    ACTIVITY_DATE?: string, // дата последней активности
    '>ACTIVITY_DATE'?: string,
    '>=ACTIVITY_DATE'?: string,
    '<ACTIVITY_DATE'?: string,
    '<=ACTIVITY_DATE'?: string,
    '!ACTIVITY_DATE'?: string,
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
    '>CREATED_DATE'?: string,
    '<CREATED_DATE'?: string,
    '>=CREATED_DATE'?: string,
    '<=CREATED_DATE'?: string,
    CLOSED_DATE?: string, // дата завершения
    CHANGED_DATE?: string, //  дата последнего изменения
    '>CHANGED_DATE'?: string, // дата создания
    '<CHANGED_DATE'?: string, // дата создания
    '>=CHANGED_DATE'?: string, // дата создания
    '<=CHANGED_DATE'?: string, // дата создания
    ACCOMPLICE?: number, // идентификатор соисполнителя
    AUDITOR?: number, // идентификатор наблюдателя
    DEPENDS_ON?: number, // идентификатор предыдущей задачи;
    ONLY_ROOT_TASKS?: iBXRestYesNo, // только задачи, которые не являются подзадачами (корневые задачи),
    // а также подзадачи родительской задачи,
    // к которой текущий пользователь доступа не имеет (Y|N).
    STAGE_ID?: number | number[] | string | string[]
    UF_CRM_TASK?: number | number[] | string | string[] | any
}
