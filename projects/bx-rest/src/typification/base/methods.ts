import {
  $add, $api, $approve, $bizproc, $blogpost, $calendar, $chat, $commentitem,
  $complete, $copyto, $defer, $delegate, $delete, $department, $disk,
  $elapseditem, $element, $event, $field, $file, $folder, $get, $getaccess, $getchildren,
  $getFields, $getlist, $im, $isactionallowed, $item,
  $list, $lists, $log, $markdeleted, $moveto, $planner, $rename, $restore,
  $result, $search, $server, $set, $socialnetwork, $sonet_group, $stages, $start, $status, $task,
  $tasks, $time, $timeMan, $update,
  $uploadfile, $user, $userfield, $workflow
} from '../../consts/part-name-methods'
import { iBXRestWorkpieceMethodsFullOneArgument } from './workpiece/methods'

export const methods: iBXRestWorkpieceMethodsFullOneArgument<string[]> = {
  user: {
    admin: [$user, 'admin'],
    get: [$user, $get],
    current: [$user, 'current'],
    update: [$user, $update],
    search: [$user, $search],
    access: [$user, 'access'], // U1 - пользователь с id =1
    // AU - все авторизованные пользователи
    // D1 - подразделение с id=1
    // G1 - группа с id=1
    fields: [$user, 'fields'],
    userfield: {
      /**
       * Добавляет пользовательское поле
       */
      add: [$user, $userfield, $add],
      /**
       * Обновляет пользовательское поле
       */
      update: [$user, $userfield, $update],
      /**
       * Удаляет пользовательское поле
       */
      delete: [$user, $userfield, $delete],
      /**
       *  Получает список пользовательских полей
       */
      list: [$user, $userfield, $list],
      file: {
        /**
         *  Получает файл из пользовательского поля
         */
        get: [$user, $userfield, $file, $get]
      }
    }
  },
  tasks: {
    task: {
      /**
       * Создает задачу
       */
      add: [$tasks, $task, $add],
      /**
       * Позволяет принять задачу
       */
      approve: [$tasks, $task, $approve],
      /**
       * Переводит задачу в статус «завершена»
       */
      complete: [$tasks, $task, $complete],
      // counters: {
      //   /**
      //    * Получает счетчики пользователя
      //    */
      //   get: [$tasks, $task, $counters, $get],
      // },
      /**
       * Переводит задачу в статус «отложена»
       */
      defer: [$tasks, $task, $defer],
      /**
       * Метод для делегирования задачи
       */
      delegate: [$tasks, $task, $delegate],
      /**
       * Возвращает информацию о конкретной задаче
       */
      get: [$tasks, $task, $get],
      // /**
      //  * Удаляет задачу
      //  */
      // delete: [$tasks, $task, $delete],
      // /**
      //  * Позволяет отклонить задачу
      //  */
      // disapprove: [$tasks, $task, $disapprove],
      // favorite: {
      //   /**
      //    * Добавляет задачи в "Избранное"
      //    */
      //   add: [$tasks, $task, $favorite, $add],
      //   /**
      //    * Удаляет задачи из "Избранного"
      //    */
      //   delete: [$tasks, $task, $favorite, $delete],
      // },
      // files: {
      //   /**
      //    * Прикрепляет загруженный на диск файл к задаче
      //    */
      //   attach: [$tasks, $task, $files, $attach],
      // },
      /**
       * Возвращает все доступные поля
       */
      getFields: [$tasks, $task, $getFields],
      /**
       * Метод для проверки доступа к задаче
       */
      getAccess: [$tasks, $task, $getaccess],
      // history: {
      //   /**
      //    * Получает историю задачи
      //    */
      //   list: [$tasks, $task, $history, $list],
      // },
      /**
       * Возвращает массив задач, каждая из которых содержит массив полей
       */
      list: [$tasks, $task, $list],
      // /**
      //  * Останавливает выполнение задачи, переводя ее в статус "ждет выполнения"
      //  */
      // pause: [$tasks, $task, $pause],
      // /**
      //  * Возобновляет задачу после ее завершения
      //  */
      // renew: [$tasks, $task, $renew],
      // /**
      //  * Переводит задачу в статус «выполняется»
      //  */
      // start: [$tasks, $task, $start],
      // /**
      //  * Позволяет наблюдать за задачей
      //  */
      // startWatch: [$tasks, $task, 'startwatch'],
      // /**
      //  * Останавливает наблюдение за задачей
      //  */
      // stopwatch: [$tasks, $task, 'stopwatch'],
      /**
       * Обновляет задачу
       */
      update: [$tasks, $task, $update],
      result: {
        /**
         *  Просмотр списка результатов к задаче
         */
        list: [$tasks, $task, $result, $list],
        /**
         * Создание результата задачи из комментария
         */
        addFromComment: [$tasks, $task, $result, 'addFromComment'],
        /**
         * Удаление результата задачи по комментарию из которого он был создан
         */
        deleteFromComment: [$tasks, $task, $result, 'deleteFromComment'],
      }
    }
  },
  task: {
    elapsedItem: {
      // /**
      //  * Возвращает список методов и их описание
      //  */
      // getManifest: [$task, $elapseditem, $getmanifest],
      /**
       * Возвращает список записей о затраченном времени по задаче
       */
      getList: [$task, $elapseditem, $getlist],
      // /**
      //  * Возвращает запись о затраченном времени по ее идентификатору
      //  */
      // get: [$task, $elapseditem, $get],
      /**
       * Добавляет затраченное время к задаче
       */
      add: [$task, $elapseditem, $add],
      /**
       * Удаляет запись о затраченном времени
       */
      delete: [$task, $elapseditem, $delete],
      /**
       * Проверяет разрешено ли действие
       */
      isActionAllowed: [$task, $elapseditem, $isactionallowed],
      /**
       * Изменяет параметры записи о затраченном времени
       */
      update: [$task, $elapseditem, $update],
    },
    commentItem: {
      // /**
      //  * Возвращает список методов и их описание
      //  */
      // getManifest: [$task, $commentitem, $getmanifest],
      /**
       * Возвращает список комментариев к задаче
       */
      getList: [$task, $commentitem, $getlist],
      /**
       * Возвращает комментарий к задаче
       */
      get: [$task, $commentitem, $get],
      /**
       * Создает новый комментарий к задаче
       */
      add: [$task, $commentitem, $add],
      /**
       * Обновляет данные комментария
       */
      update: [$task, $commentitem, $update],
      /**
       * Удаляет комментарий
       */
      delete: [$task, $commentitem, $delete],
      // /**
      //  * Проверяет, разрешено ли действие
      //  */
      // isActionAllowed: [$task, $commentitem, $isactionallowed],
    },
    planner: {
      getList: [$task, $planner, $getlist]
    },
    item: {
      userField: {
        /**
         * Получение всех доступных полей свойства
         */
        getFields: [$task, $item, $userfield, 'getfields'],
        // /**
        //  * Получение всех доступных типов данных
        //  */
        // getTypes: [$task, $item, $userfield, 'gettypes'],
        // /**
        //  * Создание нового свойства
        //  */
        // add: [$task, $item, $userfield, $add],
        // /**
        //  * Получение свойства по идентификатору
        //  */
        // get: [$task, $item, $userfield, $get],
        /**
         * Получение списка свойств
         */
        getList: [$task, $item, $userfield, 'getlist'],
        // /**
        //  * Редактирование параметров свойства
        //  */
        // update: [$task, $item, $userfield, $update],
        // /**
        //  * Удаление свойства
        //  */
        // delete: [$task, $item, $userfield, $delete]
      }
    },
    stages: {
      add: [$task, $stages, $add], // Метод добавляет стадии Канбана / Моего плана
      canmovetask: [$task, $stages, 'canmovetask'], // Метод определяет, может ли текущий пользователь перемещать задачи в указанной сущности
      delete: [$task, $stages, $delete], // Метод удаляет стадии Канбана / Моего плана
      get: [$task, $stages, $get], // Метод получает стадии Канбана / Моего плана
      movetask: [$task, $stages, 'movetask'], // Метод перемещает задачи из одной стадии в другую
      update: [$task, $stages, $update] // Метод обновляет стадии Канбана / Моего плана.
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
    status: [$timeMan, $status],
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
    // networkrange: {
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
    get: [$sonet_group, $get],
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
    time: [$server, $time]
  },
  log: {
    blogpost: {
      /**
       * Добавляет в Живую Ленту сообщение от имени текущего пользователя
       */
      add: [$log, $blogpost, $add], //
      // getusers: {
      //   important: 'log.blogpost.getusers.important' // Отдает массив ID пользователей, прочитавших Важное сообщение
      // },
      /**
       * Возвращает массив с доступными текущему пользователю сообщениями Живой ленты. Каждое из сообщений представляет собой массив значений полей (включая пользовательские поля)
       */
      get: [$log, $blogpost, $get],
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
    get: [$lists, $get],
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
      add: [$lists, $element, $add],
      // /**
      //  * Метод удаляет элемент списка TODO: Реализовать
      //  */
      // delete: [$lists, $element, $delete],
      /**
       * Метод возвращает список элементов или элемент
       */
      get: [$lists, $element, $get],
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
      get: [$lists, $field, $get],
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
      add: [$im, $chat, $add],
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
      get: [$disk, $file, $get], //
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
      markDeleted: [$disk, $file, $markdeleted],
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
      getFields: [$disk, $folder, $getFields],
      get: [$disk, $folder, $get],
      getChildren: [$disk, $folder, $getchildren],
      addSubFolder: [$disk, $folder, 'addsubfolder'],
      copyTo: [$disk, $folder, $copyto],
      moveTo: [$disk, $folder, $moveto],
      rename: [$disk, $folder, $rename],
      deleteTree: [$disk, $folder, 'deletetree'],
      markDeleted: [$disk, $folder, $markdeleted],
      restore: [$disk, $folder, $restore],
      uploadFile: [$disk, $folder, $uploadfile],
      getExternalLink: [$disk, $folder, 'getExternalLink']
    },
    attachedObject: {
      get: [$disk, 'attachedObject', $get]
    }
  },
  department: {
    get: [$department, $get],
    del: [$department, $delete],
    add: [$department, $add],
    update: [$department, $update]
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
      get: [$calendar, $event, $get],
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
      // instances: {
      //   /**
      //    * Возвращает список запущенных бизнес-процессов. Алиас bizproc.workflow.instances
      //    */
      //   list: [$bizproc, $workflow, $instances, $list]
      // },
      // /**
      //  * Останавливает активный Бизнес-процесс TODO: реализовать
      //  */
      // terminate: {
      //   /**
      //    * Добавляет шаблон Бизнес-процесса // TODO: реализовать
      //    */
      //   add: [$bizproc, $workflow, $template, $add],
      //   /**
      //    * Удаляет шаблон Бизнес-процесса // TODO: реализовать
      //    */
      //   delete: [$bizproc, $workflow, $template, $delete],
      //   /**
      //    * Изменяет шаблон Бизнес-процесса // TODO: реализовать
      //    */
      //   update: [$bizproc, $workflow, $template, $update],
      //   /**
      //    * Возвращает список шаблонов Бизнес-процессов, установленных на сайте
      //    */
      //   list: [$bizproc, $workflow, $template, $list]
      // },
      /**
       * Запускает Бизнес-процесс
       */
      start: [$bizproc, $workflow, $start],
      // /**
      //  * Удаляет запущенный бизнес-процесс TODO: реализовать
      //  */
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
  socialNetWork: {
    api: {
      contentView: {
        set: [$socialnetwork, $api, 'contentView', $set]
      },
      liveFeed: {
        blogPost: {
          important: {
            vote: [$socialnetwork, $api, 'liveFeed', 'blogPost', 'important', 'vote']
          }
        }
      }
    }
  },
  app: {
    /**
     * Показ информации о приложении. Метод поддерживает безопасный вызов
     */
    info: ['app', 'info']
  }
}