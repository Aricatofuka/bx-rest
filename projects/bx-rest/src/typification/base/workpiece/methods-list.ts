export interface iBXRestWorkpieceMethodsUser<admin, _get, current, update, search, access, fields, userfield> {
  admin: admin
  get: _get
  current: current
  update: update
  search: search
  access: access
  fields: fields
  userfield: userfield
}

export interface iBXRestWorkpieceMethodsUserField<
  add,
  update,
  _delete,
  list,
  file extends iBXRestWorkpieceMethodsUserFieldList<file['get']>> {
  /**
   * Добавляет пользовательское поле
   */
  add: add
  /**
   * Обновляет пользовательское поле
   */
  update: update
  /**
   * Удаляет пользовательское поле
   */
  delete: _delete
  /**
   *  Получает список пользовательских полей
   */
  list: list,
  file: file
}

export interface iBXRestWorkpieceMethodsUserFieldList<get> {
  get: get
}

export interface iBXRestWorkpieceMethodsTasks<
  task extends iBXRestWorkpieceMethodsTasksTask<
    task['add'],
    task['approve'],
    task['complete'],
    task['defer'],
    task['delegate'],
    task['get'],
    task['getFields'],
    task['getAccess'],
    task['list'],
    task['update'],
    iBXRestWorkpieceMethodsTasksTaskResult<
      task['result']['list'],
      task['result']['addFromComment'],
      task['result']['deleteFromComment']
    >
  >> {
  task: task
}

export interface iBXRestWorkpieceMethodsTasksTask<
  add,
  approve,
  complete,
  defer,
  delegate,
  _get,
  getFields,
  getAccess,
  list,
  update,
  result
> {
  add: add
  approve: approve
  complete: complete
  // counters: {
  //   get: [$tasks, $task, $counters, $get], //Получает счетчики пользователя
  // },
  defer: defer
  delegate: delegate
  // delete: [$tasks, $task, $delete], // Удаляет задачу
  // disapprove: [$tasks, $task, $disapprove], // Позволяет отклонить задачу
  // favorite: {
  //   add: [$tasks, $task, $favorite, $add], // Добавляет задачи в "Избранное"
  //   delete: [$tasks, $task, $favorite, $delete], // Удаляет задачи из "Избранного"
  // },
  // files: {
  //   attach: [$tasks, $task, $files, $attach], // Прикрепляет загруженный на диск файл к задаче
  // },
  get: _get, // Возвращает информацию о конкретной задаче
  getFields: getFields, // Возвращает все доступные поля
  getAccess: getAccess
  // history: {
  //   list: [$tasks, $task, $history, $list], // Получает историю задачи
  // },
  list: list, // Возвращает массив задач, каждая из которых содержит массив полей
  // pause: [$tasks, $task, $pause], // Останавливает выполнение задачи, переводя ее в статус "ждет выполнения"
  // renew: [$tasks, $task, $renew], // Возобновляет задачу после ее завершения
  // start: [$tasks, $task, $start], // Переводит задачу в статус «выполняется»
  // startWatch: [$tasks, $task, 'startwatch'], // Позволяет наблюдать за задачей
  // stopwatch: [$tasks, $task, 'stopwatch'], // Останавливает наблюдение за задачей
  update: update, // Обновляет задачу,
  result: result
}

export interface iBXRestWorkpieceMethodsTasksTaskResult<list, addFromComment, deleteFromComment> {
  list: list
  addFromComment: addFromComment
  /**
   * Удаление результата задачи по комментарию из которого он был создан
   */
  deleteFromComment: deleteFromComment,
}

export interface iBXRestWorkpieceMethodsTask<
  elapsedItem extends iBXRestWorkpieceMethodsTaskElapsedItem<
    elapsedItem['getList'],
    elapsedItem['add'],
    elapsedItem['delete'],
    elapsedItem['isActionAllowed'],
    elapsedItem['update']
  >,
  commentItem extends iBXRestWorkpieceMethodsTaskCommentItem<
    commentItem['getList'],
    commentItem['get'],
    commentItem['add'],
    commentItem['update'],
    commentItem['delete']
  >,
  planner extends iBXRestWorkpieceMethodsTaskPlanner<
    planner['getList']
  >,
  item extends iBXRestWorkpieceMethodsTaskItem<
    iBXRestWorkpieceMethodsTaskItemUserField<
      item['userField']['getList'],
      item['userField']['getFields']
    >
  >,
> {
  elapsedItem: elapsedItem
  commentItem: commentItem
  planner: planner
  item: item
}

export interface iBXRestWorkpieceMethodsTaskElapsedItem<getList, add, _delete, isActionAllowed, update> {
  // getManifest:
  getList: getList
  // get: [$task, $elapseditem, $get],
  add: add
  delete: _delete
  isActionAllowed: isActionAllowed
  update: update
}

export interface iBXRestWorkpieceMethodsTaskCommentItem<getList, get, add, update, _delete> {
  //getManifest: [$task, $commentitem, $getmanifest],
  getList: getList
  get: get
  add: add
  update: update
  delete: _delete
  // isActionAllowed: [$task, $commentitem, $isactionallowed],
}

export interface iBXRestWorkpieceMethodsTaskPlanner<getList> {
  getList: getList
}

export interface iBXRestWorkpieceMethodsTaskItem<
  item extends iBXRestWorkpieceMethodsTaskItemUserField<
    item['getFields'],
    item['getList']
  >
> {
  userField: item
}

export interface iBXRestWorkpieceMethodsTaskItemUserField<getFields, getList> {
  getFields: getFields
  // getTypes: [$task, $item, $userfield, 'gettypes'],
  // add: [$task, $item, $userfield, $add],
  // get: [$task, $item, $userfield, $get],
  getList: getList
  // update: [$task, $item, $userfield, $update],
  // delete: [$task, $item, $,userfield $delete]
}

export interface iBXRestWorkpieceMethodsTimeman<status> {
  // /**
  //  * Получение настроек рабочего времени пользователя
  //  */
  // settings: [$timeMan, $settings],
  /**
   * Получение информации о текущем рабочем дне пользователя
   */
  status: status,
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
}

export interface iBXRestWorkpieceMethodsSonetGroup<_get> {
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
  get: _get
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
}

export interface iBXRestWorkpieceMethodsServer<time> {
  /**
   * Получить время сервера
   */
  time: time
}

export interface iBXRestWorkpieceMethodsLog<
  blogpost extends iBXRestWorkpieceMethodsLogBlogpost<blogpost['add'], blogpost['get']>
> {
  blogpost: blogpost,
  // blogcomment: {
  //   /**
  //    * Добавляет комментарий к сообщению Живой ленты
  //    */
  //   add: [$log, $blogcomment, $add],
  // }
}

export interface iBXRestWorkpieceMethodsLogBlogpost<add, _get> {
  /**
   * Добавляет в Живую Ленту сообщение от имени текущего пользователя
   */
  add: add
  // getusers: {
  //   important: 'log.blogpost.getusers.important' // Отдает массив ID пользователей, прочитавших Важное сообщение
  // },
  /**
   * Возвращает массив с доступными текущему пользователю сообщениями Живой ленты. Каждое из сообщений представляет собой массив значений полей (включая пользовательские поля)
   */
  get: _get
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
}

export interface iBXRestWorkpieceMethodsLists<
  _get,
  element extends iBXRestWorkpieceMethodsListsElement<element['add'], element['get']>,
  field extends iBXRestWorkpieceMethodsListsField<field['get']>
> {
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
  get: _get
  // /**
  //  * Метод обновляет существующий список
  //  */
  // update: [$lists, $update],
  // /**
  //  * Метод возвращает id типа инфоблока
  //  */
  // getIBlockTypeId: [$lists, $get, $iblock, $type, $id],
  element: element
  field: field
}

export interface iBXRestWorkpieceMethodsListsElement<add, _get> {
  /**
   * Метод создаёт элемент списка
   */
  add: add,
  // /**
  //  * Метод удаляет элемент списка TODO: Реализовать
  //  */
  // delete: [$lists, $element, $delete],
  /**
   * Метод возвращает список элементов или элемент
   */
  get: _get,
  // /**
  //  * Метод обновляет элемент списка TODO: Реализовать
  //  */
  // update: [$lists, $element, $update],
  // /**
  //  * Метод возвращает путь к файлу TODO: Реализовать
  //  */
  // getFileUrl: [$lists, $element, $get, $file, $url]
}

export interface iBXRestWorkpieceMethodsListsField<_get> {
  // /**
  //  * Метод создает поле списка
  //  */
  //  add: add,
  // /**
  //  * Метод удаляет поле списка
  //  */
  // delete: [$lists, $field, $delete],
  /**
   * Метод возвращает данные поля
   */
  get: _get,
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

export interface iBXRestWorkpieceMethodsIm<chat extends iBXRestWorkpieceMethodsImChat<chat['add']>> {
  chat: chat
}

export interface iBXRestWorkpieceMethodsImChat<add> {
  add: add
  // list: [$im, $chat, $user, $list],
  // add: [$im, $chat, $user, $add],
  // delete: [$im, $chat, $user, $delete],
  // updateTitle: [$im, $chat, $updateTitle],
  // updateColor: [$im, $chat, $updateColor],
  // updateAvatar: [$im, $chat, $updateAvatar],
  // setOwner: [$im, $chat, $setOwner],systemctl start nginx
  // get: [$im, $chat, $get],
  // mute: [$im, $chat, $mute],
}

export interface iBXRestWorkpieceMethodsDisk<
  file extends iBXRestWorkpieceMethodsDiskFile<file['get'], file['markDeleted']>,
  folder extends iBXRestWorkpieceMethodsDiskFolder<
    folder['getFields'],
    folder['get'],
    folder['getChildren'],
    folder['addSubFolder'],
    folder['copyTo'],
    folder['moveTo'],
    folder['rename'],
    folder['deleteTree'],
    folder['markDeleted'],
    folder['restore'],
    folder['uploadFile'],
    folder['getExternalLink']
  >,
  attachedObject extends iBXRestWorkpieceMethodsDiskAttachedObject<attachedObject['get']>
> {
  file: file
  folder: folder
  attachedObject: attachedObject
}

export interface iBXRestWorkpieceMethodsDiskFile<_get, markDeleted> {
  // /**
  //  * Возвращает описание полей файла
  //  */
  // getFields: [$disk, $file, $getFields],
  /**
   * Возвращает файл по идентификатору
   */
  get: _get
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
  markDeleted: markDeleted
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
}

export interface iBXRestWorkpieceMethodsDiskFolder<
  getFields, _get, getChildren, addSubFolder, copyTo, moveTo,
  rename, deleteTree, markDeleted, restore, uploadFile, getExternalLink
> {
  getFields: getFields
  get: _get
  getChildren: getChildren
  addSubFolder: addSubFolder
  copyTo: copyTo
  moveTo: moveTo
  rename: rename
  deleteTree: deleteTree
  markDeleted: markDeleted
  restore: restore
  uploadFile: uploadFile
  getExternalLink: getExternalLink
}

export interface iBXRestWorkpieceMethodsDiskAttachedObject<_get> {
  get: _get
}

export interface iBXRestWorkpieceMethodsDepartment<_get, del, add, update> {
  get: _get
  del: del
  add: add
  update: update
}

export interface iBXRestWorkpieceMethodsCalendar<
  event extends iBXRestWorkpieceMethodsCalendarEvent<event['get']>
> {
  event: event
}

export interface iBXRestWorkpieceMethodsCalendarEvent<_get> {
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
  get: _get
  // /**
  //  * Возвращает список будущих событий для текущего пользователя
  //  */
  // getNearest: [$calendar, $event, $get, $nearest],
  // /**
  //  * Редактирует существующее событие
  //  */
  // update: [$calendar, $event, $get, $update],
}

export interface iBXRestWorkpieceMethodsBizProc<
  workflow extends iBXRestWorkpieceMethodsBizProcWorkflow<workflow['start']>
> {
  workflow: workflow
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
}

export interface iBXRestWorkpieceMethodsBizProcWorkflow<start> {
  // /**
  //  * Возвращает список запущенных бизнес-процессов TODO: реализовать
  //  */
  // instances: [$bizproc, $workflow, $instances],
  // terminate: {
  //   // /**
  //   //  * Добавляет шаблон Бизнес-процесса
  //   //  */
  //   // add: [$bizproc, $workflow, $template, $add],
  //   // /**
  //   //  * Удаляет шаблон Бизнес-процесса
  //   //  */
  //   // delete: [$bizproc, $workflow, $template, $delete],
  //   // /**
  //   //  * Изменяет шаблон Бизнес-процесса
  //   //  */
  //   // update: [$bizproc, $workflow, $template, $update],
  //   // /**
  //   //  * Возвращает список шаблонов Бизнес-процессов, установленных на сайте
  //   //  */
  //   // list: iBXRestParamBizprocWorkflowTemplateList
  // },
  /**
   * Запускает Бизнес-процесс
   */
  start: start
  /**
   * Удаляет запущенный бизнес-процесс TODO: реализовать
   */
  // kill: [$bizproc, $workflow, $kill],
}

export interface iBXRestWorkpieceMethodsApp<info> {
  /**
   * Показ информации о приложении. Метод поддерживает безопасный вызов
   */
  info: info
}