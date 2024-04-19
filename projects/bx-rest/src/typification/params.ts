import { iBXRestUserHttp, iBXRestUserHttpField } from './rest/user/user'
import { iBXRestParamUserGet } from './rest/user/get'
import { iBXRestParamTaskAdd } from './rest/tasks/task/add'

export interface iBXRestPrams {
  user: {
    admin: boolean
    get: iBXRestParamUserGet
    current: iBXRestUserHttp
    update: iBXRestUserHttp[]
    search: iBXRestUserHttp[]
    access: boolean
    fields: iBXRestUserHttpField
  },
  tasks: {
    task: {
      add: iBXRestParamTaskAdd
      approve: [$tasks, $task, $approve], // Позволяет принять задачу
      complete: [$tasks, $task, $complete], // Переводит задачу в статус «завершена»
      counters: {
        get: [$tasks, $task, $counters, $get], //Получает счетчики пользователя
      },
      defer: [$tasks, $task, $defer], // Переводит задачу в статус «отложена»
      delegate: [$tasks, $task, $delegate], // Метод для делегирования задачи
      delete: [$tasks, $task, $delete], // Удаляет задачу
      disapprove: [$tasks, $task, $disapprove], // Позволяет отклонить задачу
      favorite: {
        add: [$tasks, $task, $favorite, $add], // Добавляет задачи в "Избранное"
        delete: [$tasks, $task, $favorite, $delete], // Удаляет задачи из "Избранного"
      },
      files: {
        attach: [$tasks, $task, $files, $attach], // Прикрепляет загруженный на диск файл к задаче
      },
      get: [$tasks, $task, $get], // Возвращает информацию о конкретной задаче
      getFields: [$tasks, $task, $getFields], // Возвращает все доступные поля
      getAccess: [$tasks, $task, $getaccess], // Метод для проверки доступа к задаче
      history: {
        list: [$tasks, $task, $history, $list], // Получает историю задачи
      },
      list: [$tasks, $task, $list], // Возвращает массив задач, каждая из которых содержит массив полей
      pause: [$tasks, $task, $pause], // Останавливает выполнение задачи, переводя ее в статус "ждет выполнения"
      renew: [$tasks, $task, $renew], // Возобновляет задачу после ее завершения
      start: [$tasks, $task, $start], // Переводит задачу в статус «выполняется»
      startWatch: [$tasks, $task, 'startwatch'], // Позволяет наблюдать за задачей
      stopwatch: [$tasks, $task, 'stopwatch'], // Останавливает наблюдение за задачей
      update: [$tasks, $task, $update], // Обновляет задачу
    }
  },
  task: {
    elapsedItem: {
      /**
       * Возвращает список методов и их описание
       */
      getManifest: [$task, $elapseditem, $getmanifest],
      /**
       * Возвращает список записей о затраченном времени по задаче
       */
      getList: [$task, $elapseditem, $getlist],
      /**
       * Возвращает запись о затраченном времени по ее идентификатору
       */
      get: [$task, $elapseditem, $get],
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
      /**
       * Возвращает список методов и их описание
       */
      getManifest: [$task, $commentitem, $getmanifest],
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
      /**
       * Проверяет, разрешено ли действие
       */
      isActionAllowed: [$task, $commentitem, $isactionallowed],
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
        /**
         * Получение всех доступных типов данных
         */
        getTypes: [$task, $item, $userfield, 'gettypes'],
        /**
         * Создание нового свойства
         */
        add: [$task, $item, $userfield, $add],
        /**
         * Получение свойства по идентификатору
         */
        get: [$task, $item, $userfield, $get],
        /**
         * Получение списка свойств
         */
        getList: [$task, $item, $userfield, 'getlist'],
        /**
         * Редактирование параметров свойства
         */
        update: [$task, $item, $userfield, $update],
        /**
         * Удаление свойства
         */
        delete: [$task, $item, $userfield, $delete]
      }
    }
  },
  timeman: {
    /**
     * Получение настроек рабочего времени пользователя
     */
    settings: [$timeMan, $settings],
    /**
     * Получение информации о текущем рабочем дне пользователя
     */
    status: [$timeMan, $status],
    /**
     * Начать новый рабочий день либо возобновить закрытый или приостановленный
     */
    open: [$timeMan, 'open'],
    /**
     * Закрыть рабочий день
     */
    close: [$timeMan, 'close'],
    /**
     * Приостановить рабочий день
     */
    pause: [$timeMan, $pause],
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
    /**
     * Создает группу соцсети, используя метод API CSocNetGroup::CreateGroup(), указывая владельцем группы текущего пользователя
     */
    create: [$sonet_group, $create],
    /**
     * Удаляет группу соцсети
     */
    delete: [$sonet_group, $delete],
    // feature: {
    //     access: [$sonet_group, $feature, $access] // Проверяет, имеет ли текущий пользователь право на совершение операции в группе соцсети, осуществляя вызов функции CSocNetFeaturesPerms::CurrentUserCanPerformOperation()
    // },
    /**
     * Возвращает массив групп соцсети, каждая из которых содержит массив полей, осуществляя вызов CSocNetGroup::GetList(), при этом возвращаются только те группы, которые доступны пользователю по правам
     */
    get: [$sonet_group, $get],
    /**
     * Изменяет владельца группы
     */
    setOwner: [$sonet_group, 'setowner'],
    /**
     * Изменяет параметры группы соцсети, используя метод API CSocNetGroup::Update()
     */
    update: [$sonet_group, $update],
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
      /**
       * Удаляет сообщение Живой Ленты
       */
      delete: [$log, $blogpost, $delete],
      /**
       * Добавляет получателей в сообщение Живой Ленты
       */
      share: [$log, $blogpost, $share],
      /**
       * Изменяет сообщение Живой Ленты
       */
      update: [$log, $blogpost, $update],
    },
    blogcomment: {
      /**
       * Добавляет комментарий к сообщению Живой ленты
       */
      add: [$log, $blogcomment, $add],
    }
  },
  lists: {
    /**
     * Метод создаёт список
     */
    add: [$lists, $add],
    /**
     * Метод удаляет список
     */
    delete: [$lists, $delete],
    /**
     * Метод возвращает данные по спискам
     */
    get: [$lists, $get],
    /**
     * Метод обновляет существующий список
     */
    update: [$lists, $update],
    /**
     * Метод возвращает id типа инфоблока
     */
    getIBlockTypeId: [$lists, $get, $iblock, $type, $id],
    element: {
      /**
       * Метод создаёт элемент списка
       */
      add: [$lists, $element, $add],
      /**
       * Метод удаляет элемент списка TODO: Реализовать
       */
      delete: [$lists, $element, $delete],
      /**
       * Метод возвращает список элементов или элемент
       */
      get: [$lists, $element, $get],
      /**
       * Метод обновляет элемент списка TODO: Реализовать
       */
      update: [$lists, $element, $update],
      /**
       * Метод возвращает путь к файлу TODO: Реализовать
       */
      getFileUrl: [$lists, $element, $get, $file, $url]
    },
    field: {
      /**
       * Метод создает поле списка
       */
      add: [$lists, $field, $add],
      /**
       * Метод удаляет поле списка
       */
      delete: [$lists, $field, $delete],
      /**
       * Метод возвращает данные поля
       */
      get: [$lists, $field, $get],
      type: {
        /**
         * Метод возвращает доступные типа полей для указанного списка
         */
        get: [$lists, $field, $type, $get],
      },
      /**
       * Метод обновляет поле списка
       */
      update: [$lists, $field, $update],
    }
  },
  im: {
    chat: {
      add: [$im, $chat, $add],
      // list: [$im, $chat, $user, $list],
      // add: [$im, $chat, $user, $add],
      // delete: [$im, $chat, $user, $delete],
      updateTitle: [$im, $chat, $updateTitle],
      updateColor: [$im, $chat, $updateColor],
      updateAvatar: [$im, $chat, $updateAvatar],
      setOwner: [$im, $chat, $setOwner],
      get: [$im, $chat, $get],
      mute: [$im, $chat, $mute],
    }
  },
  disk: {
    file: {
      /**
       * Возвращает описание полей файла
       */
      getFields: [$disk, $file, $getFields],
      /**
       * Возвращает файл по идентификатору
       */
      get: [$disk, $file, $get], //
      /**
       * Переименовывает файл
       */
      rename: [$disk, $file, $rename],
      /**
       * Копирует файл в указанную папку
       */
      copyTo: [$disk, $file, $copyto],
      /**
       * Перемещает файл в указанную папку
       */
      moveto: [$disk, $file, $moveto],
      /**
       * Уничтожает файл навсегда
       */
      delete: [$disk, $file, $delete],
      /**
       * Перемещает файл в корзину
       */
      markDeleted: [$disk, $file, $markdeleted],
      /**
       * Восстанавливает файл из корзины
       */
      restore: [$disk, $file, $restore],
      /**
       * Загружает новую версию файла
       */
      uploadVersion: [$disk, $file, 'uploadversion'],
      /**
       * Возвращает список версий файла
       */
      getVersions: [$disk, $file, 'getVersions'],
      /**
       * Восстанавливает файл из конкретной версии
       */
      restoreFromVersion: [$disk, $file, 'restoreFromVersion'],
      /**
       * Возвращает публичную ссылку на файл
       */
      getExternalLink: [$disk, $file, 'getexternallink']
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
      /**
       * Добавляет новое событие
       */
      add: [$calendar, $event, $add],
      /**
       * Удаляет событие
       */
      delete: [$calendar, $event, $delete],
      /**
       * Возвращает список событий календаря
       */
      get: [$calendar, $event, $get],
      /**
       * Возвращает список будущих событий для текущего пользователя
       */
      getNearest: [$calendar, $event, $get, $nearest],
      /**
       * Редактирует существующее событие
       */
      update: [$calendar, $event, $get, $update],
    }
  },
  bizProc: {
    workflow: {
      /**
       * Возвращает список запущенных бизнес-процессов TODO: реализовать
       */
      instances: [$bizproc, $workflow, $instances],
      /**
       * Останавливает активный Бизнес-процесс TODO: реализовать
       */
      terminate: [$bizproc, $workflow, $terminate],
      /**
       * Запускает Бизнес-процесс
       */
      start: [$bizproc, $workflow, $start], //
      /**
       * Удаляет запущенный бизнес-процесс TODO: реализовать
       */
      kill: [$bizproc, $workflow, $kill],
    },
    activity: {
      /**
       * Добавляет новое действие в бизнес-процесс
       */
      add: [$bizproc, $activity, $add],
      /**
       * Удаляет действие
       */
      delete: [$bizproc, $activity, $delete],
      /**
       * Возвращает список установленных приложением действий
       */
      list: [$bizproc, $activity, $list],
      /**
       * Позволяет обновить поля действия
       */
      update: [$bizproc, $activity, $update],
      /**
       * Записывает информацию в лог бизнес-процесса
       */
      log: [$bizproc, $activity, $log]
    },
    task: {
      /**
       * Осуществляет выполнение заданий БП
       */
      complete: [$bizproc, $task, $complete],
      /**
       * Возвращает список заданий бизнес-процессов
       */
      list: [$bizproc, $task, $list],
    },
    robot: {
      /**
       * Регистрирует нового робота
       */
      add: [$bizproc, $robot, $add],
      /**
       * Удаляет зарегистрированного робота
       */
      delete: [$bizproc, $robot, $delete],
      /**
       * Список зарегистрированных приложением роботов
       */
      list: [$bizproc, $robot, $list], //
      /**
       * Обновляет поля робота
       */
      update: [$bizproc, $robot, $update] //
    },
    event: {
      /**
       * Возвращает действию выходные параметры, заданные в описании действия
       */
      send: [$bizproc, $event, $send],
    }
  },
  app: {
    /**
     * Показ информации о приложении. Метод поддерживает безопасный вызов
     */
    info: ['app', 'info']
  }
}