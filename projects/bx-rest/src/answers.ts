import { iBXRestUserHttp, iBXRestUserHttpField } from './typification/rest/user/user'
import { iBXRestTasksTaskBaseAnswer } from './typification/rest/tasks/task/base'
import { iBXRestTasksTaskGetHttpDefault } from './typification/rest/tasks/task/get'
import { iBXRestTasksTaskApproveHttp } from './typification/rest/tasks/task/approve'
import { iBXRestParamTasksTaskComplete, iBXRestTasksTaskCompleteHttp } from './typification/rest/tasks/task/complete'
import { iBXRestTasksTaskDeferHttp } from './typification/rest/tasks/task/defer'
import { iBXRestTaskGetAccess } from './typification/rest/task/access/getaccess'
import { $list, $result, $task, $tasks } from './consts/part-name-methods'
import { iBXRestTasksTaskResultHttp } from './typification/rest/tasks/task/result/result'
import { iBXRestTaskElapsedItemHttp } from './typification/rest/task/elapseditem/item'
import { iBXRestTaskCommentHtml } from './typification/rest/task/commentitem/commentitem'
import { iBXRestTaskItemUserFieldGetlistHttp } from './typification/rest/task/item/userfield/getlist'
import { iBXRestTimeManStatusHttp } from './typification/rest/timeman/status'
import { iBXRestSonetGroupGetHttp } from './typification/rest/sonet_group/get'
import { iBXRestParamLogBlogPostAdd } from './typification/rest/log/blogpost/add';
import { iBXRestBlogPostHttp } from './typification/rest/log/blogpost/get';
import { iBXRestListItemHttp } from './typification/rest/lists/get';
import { BXRestHttpListsFieldGet, iBXRestParamListField } from './typification/rest/lists/field/get';
import { iBXRestHttpListsElement } from './typification/rest/lists/element/get';
import { iBXRestParamListsElementAdd } from './typification/rest/lists/element/add';
import { iBXRestDiskFileHttp } from './typification/rest/disk/file';
import { iBXRestFolderHttp } from './typification/rest/disk/folder';
import { iBXRestDiskFolderGetFieldsHttp } from './typification/rest/disk/folder/getFields';
import { iBXRestDiskAttachedObjectHttp } from './typification/rest/disk/AttachedObject';
import { iBXRestDepartmentHttp } from './typification/rest/department/department';
import { iBXRestCalendarEventGetAnswerHttp } from './typification/rest/calendar/get/answer';
import { iBXRestAppInfoHttp } from './typification/rest/app/info';

export interface iBXRestAnswers {
  user: {
    admin: boolean
    get: iBXRestUserHttp[]
    current: iBXRestUserHttp
    update: iBXRestUserHttp[]
    search: iBXRestUserHttp[]
    access: boolean
    fields: iBXRestUserHttpField
  },
  tasks: {
    task: {
      add: iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskGetHttpDefault>
      approve: iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskApproveHttp>
      complete: iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskCompleteHttp>
      // counters: {
      //   get: [$tasks, $task, $counters, $get], //Получает счетчики пользователя
      // },
      defer: iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskDeferHttp>
      delegate: iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskDeferHttp>
      // delete: [$tasks, $task, $delete], // Удаляет задачу
      // disapprove: [$tasks, $task, $disapprove], // Позволяет отклонить задачу
      // favorite: {
      //   add: [$tasks, $task, $favorite, $add], // Добавляет задачи в "Избранное"
      //   delete: [$tasks, $task, $favorite, $delete], // Удаляет задачи из "Избранного"
      // },
      // files: {
      //   attach: [$tasks, $task, $files, $attach], // Прикрепляет загруженный на диск файл к задаче
      // },
      // get: [$tasks, $task, $get], // Возвращает информацию о конкретной задаче
      // getFields: [$tasks, $task, $getFields], // Возвращает все доступные поля
      getAccess: iBXRestTaskGetAccess
      // history: {
      //   list: [$tasks, $task, $history, $list], // Получает историю задачи
      // },
      // list: [$tasks, $task, $list], // Возвращает массив задач, каждая из которых содержит массив полей
      // pause: [$tasks, $task, $pause], // Останавливает выполнение задачи, переводя ее в статус "ждет выполнения"
      // renew: [$tasks, $task, $renew], // Возобновляет задачу после ее завершения
      // start: [$tasks, $task, $start], // Переводит задачу в статус «выполняется»
      // startWatch: [$tasks, $task, 'startwatch'], // Позволяет наблюдать за задачей
      // stopwatch: [$tasks, $task, 'stopwatch'], // Останавливает наблюдение за задачей
      // update: [$tasks, $task, $update], // Обновляет задачу,
      result: {
        list: iBXRestTasksTaskResultHttp[]
        addFromComment: iBXRestTasksTaskResultHttp
        // deleteFromComment: [$tasks, $task, $result, 'deleteFromComment'], // Удаление результата задачи по комментарию из которого он был создан
      }
    }
  },
  task: {
    elapsedItem: {
      // getManifest:
      getList: iBXRestTaskElapsedItemHttp[]
     // get: [$task, $elapseditem, $get],
      add: number,
      delete: null
      isActionAllowed: boolean
      update: null
    },
    commentItem: {
      //getManifest: [$task, $commentitem, $getmanifest],
      getList: iBXRestTaskCommentHtml[],
      get: iBXRestTaskCommentHtml,
      add: number,
      update: boolean,
      delete: boolean,
      // isActionAllowed: [$task, $commentitem, $isactionallowed],
    },
    planner: {
      getList: (string | number)[]
    },
    item: {
      userField: {
        getFields: iBXRestTaskItemUserFieldGetlistHttp[],
        // getTypes: [$task, $item, $userfield, 'gettypes'],
        // add: [$task, $item, $userfield, $add],
        // get: [$task, $item, $userfield, $get],
        getList: iBXRestTaskItemUserFieldGetlistHttp[],
        // update: [$task, $item, $userfield, $update],
        // delete: [$task, $item, $userfield, $delete]
      }
    }
  },
  timeman: {
    // /**
    //  * Получение настроек рабочего времени пользователя
    //  */
    // settings: [$timeMan, $settings],
    /**
     * Получение информации о текущем рабочем дне пользователя
     */
    status: iBXRestTimeManStatusHttp,
    // /**
    //  * Начать новый рабочий день либо возобновить закрытый или приостановленный
    //  */
    // open: [$timeMan, 'open'],
    // /**
    //  * Закрыть рабочий день
    //  */
    // close: [$timeMan, 'close'],
    // /**
    //  * Приостановить рабочий день
    //  */
    // pause: [$timeMan, $pause],
    // // networkrange: {
    //   check: this.baseUrl + 'networkrange.check', // Метод для проверки IP-адреса на вхождение в диапазоны сетевых адресов офисной сети
    //   get: this.baseUrl + 'networkrange.get', // Метод для получения диапазонов сетевых адресов, входящих в офисную сеть
    //   set: this.baseUrl + 'networkrange.set'	// Метод для установки диапазонов сетевых адресов, входящих в офисную сеть.	18.5.0
    // },
    // timecontrol: {
    //   report: {
    //     add: this.baseUrl + 'timecontrol.report.add', // Метод для отправки отчета о выявленном отсутствии
    //     get: this.baseUrl + 'timecontrol.reports.get', // Метод для получения отчета о выявленных отсутствиях
    //     settings: {
    //       get: this.baseUrl + 'timecontrol.reports.settings.get' // Метод для получения пользовательских настроек для построения интерфейса отчетов инструмента контроля времени
    //     },
    //     users: {
    //       get: this.baseUrl + 'timecontrol.reports.users.get'	// Метод для получения списка пользователей, относящихся к указанному подразделению.	18.5.0
    //     }
    //   },
    //   settings: {
    //     get: this.baseUrl + 'timecontrol.settings.get', // Метод для получения настроек инструмента контроля времени
    //     set: this.baseUrl + 'timecontrol.settings.set'	// Метод для установки настроек инструмента контроля времени
    //   },
    // },
    // schedule: {
    //   get: this.baseUrl + 'schedule.get'	// Метод позволяет получить рабочий график по его идентификатору
    // }
  },
  sonet_group: {
    // /**
    //  * Создает группу соцсети, используя метод API CSocNetGroup::CreateGroup(), указывая владельцем группы текущего пользователя
    //  */
    // create: [$sonet_group, $create],
    // /**
    //  * Удаляет группу соцсети
    //  */
    // delete: [$sonet_group, $delete],
    // feature: {
    //     access: [$sonet_group, $feature, $access] // Проверяет, имеет ли текущий пользователь право на совершение операции в группе соцсети, осуществляя вызов функции CSocNetFeaturesPerms::CurrentUserCanPerformOperation()
    // },
    /**
     * Возвращает массив групп соцсети, каждая из которых содержит массив полей, осуществляя вызов CSocNetGroup::GetList(), при этом возвращаются только те группы, которые доступны пользователю по правам
     */
    get: iBXRestSonetGroupGetHttp[],
    // /**
    //  * Изменяет владельца группы
    //  */
    // setOwner: [$sonet_group, 'setowner'],
    // /**
    //  * Изменяет параметры группы соцсети, используя метод API CSocNetGroup::Update()
    //  */
    // update: [$sonet_group, $update],
    // user: {
    //     add: [$sonet_group, $user, $add], // sonet_group.user.add	Добавляет пользователей в качестве участников рабочей группы (без приглашения и подтверждения)
    //     delete: [$sonet_group, $user, $delete], //	Удаляет пользователей из рабочей группы
    //     get: [$sonet_group, $user, $get], // Возвращает массив участников группы соцсети, осуществляя вызов CSocNetUserToGroup::GetList(), при этом проверяются права на доступ текущего пользователя к группе
    //     groups: [$sonet_group, $user, 'groups'], // Возвращает массив групп соцсети текущего пользователя, осуществляя вызов CSocNetUserToGroup::GetList()
    //     invite: [$sonet_group, $user, 'invite'], // Выполняет приглашение пользователей в группу соцсети от лица текущего пользователя, при этом проверяются права на доступ текущего пользователя к группе
    //     request: [$sonet_group, $user, $request], // Отправляет запрос текущего пользователя на вступление в группу соцсети, при этом проверяются права на доступ текущего пользователя к группе.
    //     update: [$sonet_group, $user, $update], // Изменяет роль пользователей в рабочей группе События при работе с группами СоцСети	Список событий при добавлении, изменении и удалении группы.
    // },
    // workgroup: {
    //     list: [$socialnetwork, $api, $workgroup, $list], // Метод возвращает список групп,
    //     get: [$socialnetwork, $api, $workgroup, $get] // Метод возвращает данные по рабочей группе
    // }
  },
  server: {
    /**
     * Получить время сервера
     */
    time: string
  },
  log: {
    blogpost: {
      /**
       * Добавляет в Живую Ленту сообщение от имени текущего пользователя
       */
      add: boolean, //
      // getusers: {
      //   important: 'log.blogpost.getusers.important' // Отдает массив ID пользователей, прочитавших Важное сообщение
      // },
      /**
       * Возвращает массив с доступными текущему пользователю сообщениями Живой ленты. Каждое из сообщений представляет собой массив значений полей (включая пользовательские поля)
       */
      get: iBXRestBlogPostHttp[],
      // /**
      //  * Удаляет сообщение Живой Ленты
      //  */
      // delete: [$log, $blogpost, $delete],
      // /**
      //  * Добавляет получателей в сообщение Живой Ленты
      //  */
      // share: [$log, $blogpost, $share],
      // /**
      //  * Изменяет сообщение Живой Ленты
      //  */
      // update: [$log, $blogpost, $update],
    },
    // blogcomment: {
    //   /**
    //    * Добавляет комментарий к сообщению Живой ленты
    //    */
    //   add: [$log, $blogcomment, $add],
    // }
  },
  lists: {
    // /**
    //  * Метод создаёт список
    //  */
    // add: [$lists, $add],
    // /**
    //  * Метод удаляет список
    //  */
    // delete: [$lists, $delete],
    /**
     * Метод возвращает данные по спискам
     */
    get: iBXRestListItemHttp[],
    // /**
    //  * Метод обновляет существующий список
    //  */
    // update: [$lists, $update],
    // /**
    //  * Метод возвращает id типа инфоблока
    //  */
    // getIBlockTypeId: [$lists, $get, $iblock, $type, $id],
    element: {
      /**
       * Метод создаёт элемент списка
       */
      add: number,
      // /**
      //  * Метод удаляет элемент списка TODO: Реализовать
      //  */
      // delete: [$lists, $element, $delete],
      /**
       * Метод возвращает список элементов или элемент
       */
      get: iBXRestHttpListsElement,
      // /**
      //  * Метод обновляет элемент списка TODO: Реализовать
      //  */
      // update: [$lists, $element, $update],
      // /**
      //  * Метод возвращает путь к файлу TODO: Реализовать
      //  */
      // getFileUrl: [$lists, $element, $get, $file, $url]
    },
    field: {
      // /**
      //  * Метод создает поле списка
      //  */
      // add: [$lists, $field, $add],
      // /**
      //  * Метод удаляет поле списка
      //  */
      // delete: [$lists, $field, $delete],
      /**
       * Метод возвращает данные поля
       */
      get: BXRestHttpListsFieldGet,
      // type: {
      //   /**
      //    * Метод возвращает доступные типа полей для указанного списка
      //    */
      //   get: [$lists, $field, $type, $get],
      // },
      // /**
      //  * Метод обновляет поле списка
      //  */
      // update: [$lists, $field, $update],
    }
  },
  im: {
    chat: {
      add: number,
      // list: [$im, $chat, $user, $list],
      // add: [$im, $chat, $user, $add],
      // delete: [$im, $chat, $user, $delete],
      // updateTitle: [$im, $chat, $updateTitle],
      // updateColor: [$im, $chat, $updateColor],
      // updateAvatar: [$im, $chat, $updateAvatar],
      // setOwner: [$im, $chat, $setOwner],
      // get: [$im, $chat, $get],
      // mute: [$im, $chat, $mute],
    }
  },
  disk: {
    file: {
      // /**
      //  * Возвращает описание полей файла
      //  */
      // getFields: [$disk, $file, $getFields],
      /**
       * Возвращает файл по идентификатору
       */
      get: iBXRestDiskFileHttp,
      // /**
      //  * Переименовывает файл
      //  */
      // rename: [$disk, $file, $rename],
      // /**
      //  * Копирует файл в указанную папку
      //  */
      // copyTo: [$disk, $file, $copyto],
      // /**
      //  * Перемещает файл в указанную папку
      //  */
      // moveto: [$disk, $file, $moveto],
      // /**
      //  * Уничтожает файл навсегда
      //  */
      // delete: [$disk, $file, $delete],
      /**
       * Перемещает файл в корзину
       */
      markDeleted: iBXRestDiskFileHttp,
      // /**
      //  * Восстанавливает файл из корзины
      //  */
      // restore: [$disk, $file, $restore],
      // /**
      //  * Загружает новую версию файла
      //  */
      // uploadVersion: [$disk, $file, 'uploadversion'],
      // /**
      //  * Возвращает список версий файла
      //  */
      // getVersions: [$disk, $file, 'getVersions'],
      // /**
      //  * Восстанавливает файл из конкретной версии
      //  */
      // restoreFromVersion: [$disk, $file, 'restoreFromVersion'],
      // /**
      //  * Возвращает публичную ссылку на файл
      //  */
      // getExternalLink: [$disk, $file, 'getexternallink']
    },
    folder: {
      getFields: iBXRestDiskFolderGetFieldsHttp
      get: iBXRestFolderHttp
      getChildren: (iBXRestFolderHttp | iBXRestDiskFileHttp)[]
      addSubFolder: iBXRestFolderHttp
      copyTo: iBXRestFolderHttp
      moveTo: iBXRestFolderHttp
      rename: iBXRestFolderHttp
      deleteTree: boolean
      markDeleted: iBXRestFolderHttp
      restore: iBXRestFolderHttp
      uploadFile: iBXRestFolderHttp
      getExternalLink: string
    },
    attachedObject: {
      get: iBXRestDiskAttachedObjectHttp
    }
  },
  department: {
    get: iBXRestDepartmentHttp[]
    del: boolean
    add: number
    update: boolean
  },
  calendar: {
    event: {
      // /**
      //  * Добавляет новое событие
      //  */
      // add: [$calendar, $event, $add],
      // /**
      //  * Удаляет событие
      //  */
      // delete: [$calendar, $event, $delete],
      /**
       * Возвращает список событий календаря
       */
      get: iBXRestCalendarEventGetAnswerHttp[]
      // /**
      //  * Возвращает список будущих событий для текущего пользователя
      //  */
      // getNearest: [$calendar, $event, $get, $nearest],
      // /**
      //  * Редактирует существующее событие
      //  */
      // update: [$calendar, $event, $get, $update],
    }
  },
  bizProc: {
    workflow: {
      // /**
      //  * Возвращает список запущенных бизнес-процессов TODO: реализовать
      //  */
      // instances: [$bizproc, $workflow, $instances],
      terminate: {
        // /**
        //  * Добавляет шаблон Бизнес-процесса
        //  */
        // add: [$bizproc, $workflow, $template, $add],
        // /**
        //  * Удаляет шаблон Бизнес-процесса
        //  */
        // delete: [$bizproc, $workflow, $template, $delete],
        // /**
        //  * Изменяет шаблон Бизнес-процесса
        //  */
        // update: [$bizproc, $workflow, $template, $update],
        // /**
        //  * Возвращает список шаблонов Бизнес-процессов, установленных на сайте
        //  */
        // list: iBXRestParamBizprocWorkflowTemplateList
      },
      /**
       * Запускает Бизнес-процесс
       */
      start: string
      /**
       * Удаляет запущенный бизнес-процесс TODO: реализовать
       */
      // kill: [$bizproc, $workflow, $kill],
    },
    // activity: {
    //   /**
    //    * Добавляет новое действие в бизнес-процесс
    //    */
    //   add: [$bizproc, $activity, $add],
    //   /**
    //    * Удаляет действие
    //    */
    //   delete: [$bizproc, $activity, $delete],
    //   /**
    //    * Возвращает список установленных приложением действий
    //    */
    //   list: [$bizproc, $activity, $list],
    //   /**
    //    * Позволяет обновить поля действия
    //    */
    //   update: [$bizproc, $activity, $update],
    //   /**
    //    * Записывает информацию в лог бизнес-процесса
    //    */
    //   log: [$bizproc, $activity, $log]
    // },
    // task: {
    //   /**
    //    * Осуществляет выполнение заданий БП
    //    */
    //   complete: [$bizproc, $task, $complete],
    //   /**
    //    * Возвращает список заданий бизнес-процессов
    //    */
    //   list: [$bizproc, $task, $list],
    // },
    // robot: {
    //   /**
    //    * Регистрирует нового робота
    //    */
    //   add: [$bizproc, $robot, $add],
    //   /**
    //    * Удаляет зарегистрированного робота
    //    */
    //   delete: [$bizproc, $robot, $delete],
    //   /**
    //    * Список зарегистрированных приложением роботов
    //    */
    //   list: [$bizproc, $robot, $list], //
    //   /**
    //    * Обновляет поля робота
    //    */
    //   update: [$bizproc, $robot, $update] //
    // },
    // event: {
    //   /**
    //    * Возвращает действию выходные параметры, заданные в описании действия
    //    */
    //   send: [$bizproc, $event, $send],
    // }
  },
  app: {
    /**
     * Показ информации о приложении. Метод поддерживает безопасный вызов
     */
    info: iBXRestAppInfoHttp
  }
}