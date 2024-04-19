import { iBXRestYesNo } from '../../base/YesNo'

export interface iBXRestParamTaskAdd {
  fields: iBXRestParamTaskAddFields
}

export interface iBXRestParamTaskAddFields {
  /**
   * Идентификатор задачи
   */
  ID?: number
  /**
   * ID родительской задачи
   *
   * По умолчанию - отсутствует
   */
  PARENT_ID?: number
  /**
   * Название
   */
  TITLE: string
  /**
   * Описание
   */
  DESCRIPTION?: string
  /**
   * Оценка:
   * N - Отрицательная,
   * P - Положительная.
   *
   * По умолчанию - null
   */
  MARK?: 'N' | 'P' | null
  /**
   * Приоритет:
   * 2 - Высокий,
   * 1 - Средний,
   * 0 - Низкий.
   *
   * По умолчанию - 1
   */
  PRIORITY?: 2 | 1 | 0,
  /**
   * Статус	enum:
   * 2 - Ждет выполнения,
   * 3 - Выполняется,
   * 4 - Ожидает контроля,
   * 5 - Завершена,
   * 6 - Отложена.
   *
   * По умолчанию - 2
   */
  STATUS?: 2 | 3 | 4 | 5 | 6
  /**
   * Множественная задача. По умолчанию - Нет
   */
  MULTITASK?: iBXRestYesNo
  /**
   * По умолчанию - Нет
   */
  NOT_VIEWED?: iBXRestYesNo
  /**
   * Повторяемая задача. По умолчанию - Нет
   */
  REPLICATE?: iBXRestYesNo
  /**
   * Проект. По умолчанию - 0
   */
  GROUP_ID?: number
  /**
   * Стадия.	По умолчанию - 0
   */
  STAGE_ID?: number
  /**
   * Постановщик, если оставить парамер пустым, им будет тот кто отправил запрос
   */
  CREATED_BY?: number
  /**
   * Дата создания
   */
  CREATED_DATE?: Date
  /**
   * Исполнитель
   */
  RESPONSIBLE_ID: number
  /**
   * Соисполнители (id)
   */
  ACCOMPLICES?: number[]
  /**
   * Наблюдатели (id)
   */
  AUDITORS?: number[]
  /**
   * Изменил кто (id)
   */
  CHANGED_BY?: number
  /**
   * Дата изменения
   */
  CHANGED_DATE?: Date
  /**
   * Изменил статус
   */
  STATUS_CHANGED_BY?: number
  /**
   * Закрыл задачу
   */
  CLOSED_BY?: number
  /**
   * Дата закрытия
   */
  CLOSED_DATE?: Date
  /**
   * Дата начала
   */
  DATE_START?: Date
  /**
   * Крайний срок
   */
  DEADLINE?: Date
  /**
   * Плановое начало
   */
  START_DATE_PLAN?: Date
  /**
   * Плановое завершение
   */
  END_DATE_PLAN?: Date
  /**
   * GUID
   */
  GUID?: string
  /**
   * XML_ID
   */
  XML_ID?: string
  /**
   * Кол-во комментариев
   */
  COMMENTS_COUNT?: string
  /**
   * Кол-во новых комментариев
   */
  NEW_COMMENTS_COUNT?: string
  /**
   * Разрешить менять сроки. По умолчанию - Нет
   */
  ALLOW_CHANGE_DEADLINE?: iBXRestYesNo
  /**
   * Принять работу По умолчанию - Нет
   */
  TASK_CONTROL?: iBXRestYesNo
  /**
   * Добавить в отчёт. По умолчанию - Нет
   */
  ADD_IN_REPORT?: iBXRestYesNo
  /**
   * Создано из шаблона. По умолчанию - Нет
   */
  FORKED_BY_TEMPLATE_ID?: iBXRestYesNo
  /**
   * Затраченное время
   */
  TIME_ESTIMATE?: number
  /**
   * Затраченное время из истории изменений
   */
  TIME_SPENT_IN_LOGS?: number
  /**
   * Пропустить выходные дни
   */
  MATCH_WORK_TIME?: number
  /**
   * Идентификатор темы форума
   */
  FORUM_TOPIC_ID?: number
  /**
   * Идентификатор форума
   */
  FORUM_ID?: number
  /**
   * Идентификатор сайта
   */
  SITE_ID?: string
  /**
   * Задача подчиненного. По умолчанию - Нет
   */
  SUBORDINATE?: iBXRestYesNo
  /**
   * Добавлен в Избранное. По умолчанию - Нет
   */
  FAVORITE?: iBXRestYesNo
  EXCHANGE_MODIFIED?: Date
  EXCHANGE_ID?: number
  OUTLOOK_VERSION?: number
  /**
   * Дата последнего просмотра
   */
  VIEWED_DATE?: Date
  /**
   * Индекс сортировки
   */
  SORTING?: number
  /**
   * Затрачено (план)
   */
  DURATION_PLAN?: number
  /**
   * Затрачено (фактически)
   */
  DURATION_FACT?: number
  /**
   * Чеклист ???
   */
  CHECKLIST?: any[]
  /**
   * DURATION_TYPE	 По умолчанию - 3
   */
  DURATION_TYPE?: 1 | 2 | 3 | 4 | 5 | 6
  /**
   * Привязка к элементам CRM L_XX - lead, C_XX - contact,D_XX - deal
   */
  UF_CRM_TASK?: string
  /**
   * Файл (Диск)	disk_file
   */
  UF_TASK_WEBDAV_FILES?: string[]
  /**
   * Письмо (email)	mail_message ???
   */
  UF_MAIL_MESSAGE?: any
  /**
   * Уведомления. По умолчанию - Нет
   */
  IS_MUTED?: iBXRestYesNo
  /**
   * Закреплён. По умолчанию - Нет
   */
  IS_PINNED?: iBXRestYesNo
  /**
   * Закреплён в группе. По умолчанию - Нет
   */
  IS_PINNED_IN_GROUP?: iBXRestYesNo
  /**
   * Разрешить учет времени в задаче, по умолчанию - нет
   */
  ALLOW_TIME_TRACKING?: iBXRestYesNo
  SERVICE_COMMENTS_COUNT?: number
  /**
   * Теги
   */
  TAGS?: string[]
}
