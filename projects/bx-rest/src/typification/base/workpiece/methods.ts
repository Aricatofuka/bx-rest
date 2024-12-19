import {
  iBXRestWorkpieceMethodsApp,
  iBXRestWorkpieceMethodsBizProc,
  iBXRestWorkpieceMethodsBizProcWorkflow,
  iBXRestWorkpieceMethodsCalendar,
  iBXRestWorkpieceMethodsCalendarEvent,
  iBXRestWorkpieceMethodsDepartment,
  iBXRestWorkpieceMethodsDisk,
  iBXRestWorkpieceMethodsDiskAttachedObject,
  iBXRestWorkpieceMethodsDiskFile,
  iBXRestWorkpieceMethodsDiskFolder,
  iBXRestWorkpieceMethodsIm,
  iBXRestWorkpieceMethodsImChat,
  iBXRestWorkpieceMethodsLists,
  iBXRestWorkpieceMethodsListsElement,
  iBXRestWorkpieceMethodsListsField,
  iBXRestWorkpieceMethodsLog,
  iBXRestWorkpieceMethodsLogBlogpost,
  iBXRestWorkpieceMethodsServer,
  iBXRestWorkpieceMethodsSonetGroup,
  iBXRestWorkpieceMethodsTask,
  iBXRestWorkpieceMethodsTaskCommentItem,
  iBXRestWorkpieceMethodsTaskElapsedItem,
  iBXRestWorkpieceMethodsTaskItem,
  iBXRestWorkpieceMethodsTaskItemUserField,
  iBXRestWorkpieceMethodsTaskPlanner,
  iBXRestWorkpieceMethodsTasks,
  iBXRestWorkpieceMethodsTaskStages,
  iBXRestWorkpieceMethodsTasksTask,
  iBXRestWorkpieceMethodsTasksTaskResult,
  iBXRestWorkpieceMethodsTimeman,
  iBXRestWorkpieceMethodsUser,
  iBXRestWorkpieceMethodsUserField,
  iBXRestWorkpieceMethodsUserFieldList,
  iBXRestWorkpieceSocialNetWork,
  iBXRestWorkpieceSocialNetWorkApi,
  iBXRestWorkpieceSocialNetWorkApiContentView,
  iBXRestWorkpieceSocialNetWorkApiLiveFeed,
  iBXRestWorkpieceSocialNetWorkApiLiveFeedBlogpost,
  iBXRestWorkpieceSocialNetWorkApiLiveFeedBlogpostImportant
} from './methods-list'


export interface iBXRestWorkpieceMethodsFullOneArgument<T> extends iBXRestWorkpieceMethodsFull<
  iBXRestWorkpieceMethodsUser<T, T, T, T, T, T, T,
    iBXRestWorkpieceMethodsUserField<T, T, T, T, iBXRestWorkpieceMethodsUserFieldList<T>>
  >,
  iBXRestWorkpieceMethodsTasks<
    iBXRestWorkpieceMethodsTasksTask<
      T, T, T, T, T, T, T, T, T, T,
      iBXRestWorkpieceMethodsTasksTaskResult<T, T, T>
    >
  >,
  iBXRestWorkpieceMethodsTask<
    iBXRestWorkpieceMethodsTaskElapsedItem<T, T, T, T, T>,
    iBXRestWorkpieceMethodsTaskCommentItem<T, T, T, T, T>,
    iBXRestWorkpieceMethodsTaskPlanner<T>,
    iBXRestWorkpieceMethodsTaskItem<
      iBXRestWorkpieceMethodsTaskItemUserField<T, T>
    >,
    iBXRestWorkpieceMethodsTaskStages<T, T, T, T, T, T>
  >,
  iBXRestWorkpieceMethodsTimeman<T>,
  iBXRestWorkpieceMethodsSonetGroup<T>,
  iBXRestWorkpieceMethodsServer<T>,
  iBXRestWorkpieceMethodsLog<
    iBXRestWorkpieceMethodsLogBlogpost<T, T>
  >,
  iBXRestWorkpieceMethodsLists<
    T,
    iBXRestWorkpieceMethodsListsElement<T, T>,
    iBXRestWorkpieceMethodsListsField<T>
  >,
  iBXRestWorkpieceMethodsIm<
    iBXRestWorkpieceMethodsImChat<T>
  >,
  iBXRestWorkpieceMethodsDisk<
    iBXRestWorkpieceMethodsDiskFile<T, T>,
    iBXRestWorkpieceMethodsDiskFolder<T, T, T, T, T, T, T, T, T, T, T, T>,
    iBXRestWorkpieceMethodsDiskAttachedObject<T>
  >,
  iBXRestWorkpieceMethodsDepartment<T, T, T, T>,
  iBXRestWorkpieceMethodsCalendar<
    iBXRestWorkpieceMethodsCalendarEvent<T>
  >,
  iBXRestWorkpieceMethodsBizProc<
    iBXRestWorkpieceMethodsBizProcWorkflow<T>
  >,
  iBXRestWorkpieceMethodsApp<T>,
  iBXRestWorkpieceSocialNetWork<
    iBXRestWorkpieceSocialNetWorkApi<
      iBXRestWorkpieceSocialNetWorkApiContentView<T>,
      iBXRestWorkpieceSocialNetWorkApiLiveFeed<
        iBXRestWorkpieceSocialNetWorkApiLiveFeedBlogpost<
          iBXRestWorkpieceSocialNetWorkApiLiveFeedBlogpostImportant<T>
        >
      >
    >
  >
> {

}

export interface iBXRestWorkpieceMethodsFull<
  user extends iBXRestWorkpieceMethodsUser<
    user['admin'],
    user['get'],
    user['current'],
    user['update'],
    user['search'],
    user['access'],
    user['fields'],
    iBXRestWorkpieceMethodsUserField<
      user['userfield']['add'],
      user['userfield']['update'],
      user['userfield']['delete'],
      user['userfield']['list'],
      iBXRestWorkpieceMethodsUserFieldList<
        user['userfield']['file']['get']
      >
    >
  >,
  tasks extends iBXRestWorkpieceMethodsTasks<
    iBXRestWorkpieceMethodsTasksTask<
      tasks['task']['add'],
      tasks['task']['approve'],
      tasks['task']['complete'],
      tasks['task']['defer'],
      tasks['task']['delegate'],
      tasks['task']['get'],
      tasks['task']['getFields'],
      tasks['task']['getAccess'],
      tasks['task']['list'],
      tasks['task']['update'],
      iBXRestWorkpieceMethodsTasksTaskResult<
        tasks['task']['result']['list'],
        tasks['task']['result']['addFromComment'],
        tasks['task']['result']['deleteFromComment']
      >
    >
  >,
  task extends iBXRestWorkpieceMethodsTask<
    iBXRestWorkpieceMethodsTaskElapsedItem<
      task['elapsedItem']['getList'],
      task['elapsedItem']['add'],
      task['elapsedItem']['delete'],
      task['elapsedItem']['isActionAllowed'],
      task['elapsedItem']['update']
    >,
    iBXRestWorkpieceMethodsTaskCommentItem<
      task['commentItem']['getList'],
      task['commentItem']['get'],
      task['commentItem']['add'],
      task['commentItem']['update'],
      task['commentItem']['delete']
    >,
    iBXRestWorkpieceMethodsTaskPlanner<
      task['planner']['getList']
    >,
    iBXRestWorkpieceMethodsTaskItem<
      iBXRestWorkpieceMethodsTaskItemUserField<
        task['item']['userField']['getFields'],
        task['item']['userField']['getList']
      >
    >,
    iBXRestWorkpieceMethodsTaskStages<
        task['stages']['add'],
        task['stages']['canmovetask'],
        task['stages']['delete'],
        task['stages']['get'],
        task['stages']['movetask'],
        task['stages']['update']
    >
  >,
  timeman extends iBXRestWorkpieceMethodsTimeman<
    timeman['status']
  >,
  sonet_group extends iBXRestWorkpieceMethodsSonetGroup<
    sonet_group['get']
  >,
  server extends iBXRestWorkpieceMethodsServer<
    server['time']
  >,
  log extends iBXRestWorkpieceMethodsLog<
    iBXRestWorkpieceMethodsLogBlogpost<
      log['blogpost']['add'],
      log['blogpost']['get']
    >
  >,
  lists extends iBXRestWorkpieceMethodsLists<
    lists['get'],
    iBXRestWorkpieceMethodsListsElement<
      lists['element']['add'],
      lists['element']['get']
    >,
    iBXRestWorkpieceMethodsListsField<lists['field']['get']>
  >,
  im extends iBXRestWorkpieceMethodsIm<
    iBXRestWorkpieceMethodsImChat<im['chat']['add']>
  >,
  disk extends iBXRestWorkpieceMethodsDisk<
    iBXRestWorkpieceMethodsDiskFile<disk['file']['get'], disk['file']['markDeleted']>,
    iBXRestWorkpieceMethodsDiskFolder<
      disk['folder']['getFields'],
      disk['folder']['get'],
      disk['folder']['getChildren'],
      disk['folder']['addSubFolder'],
      disk['folder']['copyTo'],
      disk['folder']['moveTo'],
      disk['folder']['rename'],
      disk['folder']['deleteTree'],
      disk['folder']['markDeleted'],
      disk['folder']['restore'],
      disk['folder']['uploadFile'],
      disk['folder']['getExternalLink']
    >,
    iBXRestWorkpieceMethodsDiskAttachedObject<disk['attachedObject']['get']>
  >,
  department extends iBXRestWorkpieceMethodsDepartment<
    department['get'],
    department['del'],
    department['add'],
    department['update']
  >,
  calendar extends iBXRestWorkpieceMethodsCalendar<
    iBXRestWorkpieceMethodsCalendarEvent<
      calendar['event']['get']
    >
  >,
  bizProc extends iBXRestWorkpieceMethodsBizProc<
    iBXRestWorkpieceMethodsBizProcWorkflow<bizProc['workflow']['start']>
  >,
  app extends iBXRestWorkpieceMethodsApp<
    app['info']
  >,
  socialNetWork extends iBXRestWorkpieceSocialNetWork<
    iBXRestWorkpieceSocialNetWorkApi<socialNetWork['api']['contentView'], socialNetWork['api']['liveFeed']>
  >,
> {
  user: user
  tasks: tasks
  task: task
  timeman: timeman
  sonet_group: sonet_group
  server: server
  log: log
  lists: lists
  im: im
  disk: disk
  department: department
  calendar: calendar
  bizProc: bizProc
  app: app
  socialNetWork: socialNetWork
}