import { iBXRestHttpTask, iBXRestTask } from '../task'
import { CamelToSnake } from 'snake-camel-types'

type UppercaseKeys<T extends CamelToSnake<iBXRestHttpTask | iBXRestTask>> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

export type iBXRestTaskFieldsName = keyof UppercaseKeys<CamelToSnake<iBXRestHttpTask | iBXRestTask>>;
/*
export type iBXRestTaskFieldsName = 'ID' // идентификатор задачи
    | 'PARENT_ID' // идентификатор родительской задачи
    | 'TITLE' // название задачи
    | 'DESCRIPTION' // описание
    | 'MARK' // оценка
    | 'PRIORITY' // приоритет: 0 - низкий, 1 - средний, 2 - высокий
    | 'STATUS' // 'статус'
    | 'MULTITASK' // множественная задача
    | 'NOT_VIEWED'// непросмотренная задача
    | 'REPLICATE' //  повторяемая задача
    | 'GROUP_ID' // рабочая группа.
    | 'STAGE_ID' // стадия
    | 'CREATED_BY' // постановщик
    | 'CREATED_DATE' // дата создания
    | 'RESPONSIBLE_ID' // исполнитель
    | 'ACCOMPLICES' // идентификатор соисполнителя
    | 'AUDITORS' // идентификатор аудитора
    | 'CHANGED_BY' // кем изменена задача
    | 'CHANGED_DATE' // дата изменения
    | 'STATUS_CHANGED_DATE' // кто изменил статус
    | 'CLOSED_BY' // кто закрыл задачу
    | 'CLOSED_DATE' // дата закрытия задачи
    | 'DATE_START' // дата начала
    | 'DEADLINE' // крайний срок
    | 'START_DATE_PLAN' // плановое начало
    | 'END_DATE_PLAN' // плановое завершение
    | 'GUID' // GUID (статистически уникальный 128-битный идентификатор)
    | 'XML_ID' // внешний код
    | 'COMMENTS_COUNT' // количество комментариев
    | 'NEW_COMMENTS_COUNT' // количество новых комментариев
    | 'TASK_CONTROL' // принять в работу
    | 'ADD_IN_REPORT' // добавить в отчет
    | 'FORKED_BY_TEMPLATE_ID' // создано из шаблона
    | 'TIME_ESTIMATE' // затраченное время
    | 'TIME_SPENT_IN_LOGS' // затраченное время из истории изменений
    | 'MATCH_WORK_TIME' // пропустить выходные дни
    | 'FORUM_TOPIC_ID' // идентификатор темы форума
    | 'FORUM_ID' // идентификатор форума
    | 'SITE_ID' // идентификатор сайта
    | 'SUBORDINATE' // задача подчиненного
    | 'FAVORITE' // Избранное
    | 'VIEWED_DATE' // дата последнего просмотра
    | 'SORTING' // индекс сортировки
    | 'DURATION_PLAN' // затрачено (план)
    | 'DURATION_FACT' // затрачено (фактически)
    | 'DURATION_TYPE' // тип единицы измерения в планируемой длительности: days, hours или minutes
    | 'ACTIVITY_DATE'
    | 'TAGS'
    | 'ALLOW_TIME_TRACKING' // разрешён трек времени
*/
