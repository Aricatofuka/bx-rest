import { iBXRestYesNo } from '../../base/YesNo';

export interface iBXRestParamTaskAdd {
    ID?: number, // Идентификатор задачи
    PARENT_ID?: number, //	ID родительской задачи	По умолчанию - 0
    TITLE: string, //	Название	Да
    DESCRIPTION?: string, //	Описание
    MARK?: 'N' | 'P' | null, //	Оценка	N - Отрицательная, P - Положительная. По умолчанию - null
    PRIORITY?: 2 | 1 | 0, //	Приоритет	2 - Высокий,  1 - Средний,  0 - Низкий.  По умолчанию - 1
    STATUS?: 2 | 3 | 4 | 5 | 6, //	Статус	enum	2 - Ждет выполнения,  3 - Выполняется, 4 - Ожидает контроля, 5 - Завершена, 6 - Отложена. По умолчанию - 2
    MULTITASK?: iBXRestYesNo, // Множественная задача. По умолчанию - Нет
    NOT_VIEWED?: iBXRestYesNo, //	 По умолчанию - Нет
    REPLICATE?: iBXRestYesNo, // 	Повторяемая задача. По умолчанию - Нет
    GROUP_ID?: number, //	Проект. По умолчанию - 0
    STAGE_ID?: number, // Стадия.	По умолчанию - 0
    CREATED_BY?: number, // Постановщик, если оставить парамер пустым, им будет тот кто отправил запрос
    CREATED_DATE?: Date, // Дата создания
    RESPONSIBLE_ID: number, // Исполнитель
    ACCOMPLICES?: number[], //	Соисполнители
    AUDITORS?: number[], // Наблюдатели
    CHANGED_BY?: number, //	Изменил
    CHANGED_DATE?: Date, //	Дата изменения
    STATUS_CHANGED_BY?: number, // Изменил статус
    CLOSED_BY?: number, //	Закрыл задачу
    CLOSED_DATE?: Date, // Дата закрытия
    DATE_START?: Date, //	Дата начала
    DEADLINE?: Date, //	Крайний срок
    START_DATE_PLAN?: Date, //	Плановое начало
    END_DATE_PLAN?: Date, // Плановое завершение
    GUID?: string, // GUID
    XML_ID?: string, // XML_ID
    COMMENTS_COUNT?: string, //	Кол-во комментариев
    NEW_COMMENTS_COUNT?: string, // Кол-во новых комментариев
    ALLOW_CHANGE_DEADLINE?: iBXRestYesNo,	// Разрешить менять сроки. По умолчанию - Нет
    TASK_CONTROL?: iBXRestYesNo,	// Принять работу По умолчанию - Нет
    ADD_IN_REPORT?: iBXRestYesNo, //	Добавить в отчёт. По умолчанию - Нет
    FORKED_BY_TEMPLATE_ID?: iBXRestYesNo, //	Создано из шаблона. По умолчанию - Нет
    TIME_ESTIMATE?: number,	// Затраченое время
    TIME_SPENT_IN_LOGS?: number, // Затраченое время из истории изменений
    MATCH_WORK_TIME?: number,	// Пропустить выходные дни
    FORUM_TOPIC_ID?: number, // Идентификатор темы форума
    FORUM_ID?: number, // Идентификатор форума
    SITE_ID?: string, // Идентификатор сайта
    SUBORDINATE?: iBXRestYesNo, //	Задача подчиненного. По умолчанию - Нет
    FAVORITE?: iBXRestYesNo, //	Добавлен в Избранное. По умолчанию - Нет
    EXCHANGE_MODIFIED?: Date,
    EXCHANGE_ID?: number,
    OUTLOOK_VERSION?: number,
    VIEWED_DATE?: Date, // Дата последнего просмотра
    SORTING?: number, // Индекс сортировки
    DURATION_PLAN?: number, //	Затрачено (план)
    DURATION_FACT?: number, //	Затрачено (фактически)
    CHECKLIST?: any[], // Чеклист ???
    DURATION_TYPE?: 1 | 2 | 3 | 4 | 5 | 6 // DURATION_TYPE	 По умолчанию - 3
    UF_CRM_TASK?: string, //	Привязка к элементам CRM L_XX - lead, C_XX - contact,D_XX - deal
    UF_TASK_WEBDAV_FILES?: string[], //	Файл (Диск)	disk_file
    UF_MAIL_MESSAGE?: any, // 	Письмо (email)	mail_message ???
    IS_MUTED?: iBXRestYesNo, // Уведомления. По умолчанию - Нет
    IS_PINNED?: iBXRestYesNo, // Закреплён. По умолчанию - Нет
    IS_PINNED_IN_GROUP?: iBXRestYesNo, //	Закреплён в группе. По умолчанию - Нет.
    SERVICE_COMMENTS_COUNT?: number
}
