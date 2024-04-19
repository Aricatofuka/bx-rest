export interface iBXRestBaseMethodsObj<T> {
  user: {
    admin: T
    get: T
    current: T
    update: T
    search: T
    access: T
    fields: T
  }
  tasks: {
    task: {
      add: T
      approve: T
      complete: T
      counters: {
        get: T
      }
      defer: T
      delegate: T
      delete: T
      disapprove: T
      favorite: {
        add: T
        delete: T
      }
      files: {
        attach: T
      }
      get: T
      getFields: T
      getAccess: T
      history: {
        list: T
      }
      list: T
      pause: T
      renew: T
      start: T
      startWatch: T
      stopwatch: T
      update: T
    }
  }
  task: {
    elapsedItem: {
      getManifest: T
      getList: T
      get: T
      add: T
      delete: T
      isActionAllowed: T
      update: T
    }
    commentItem: {
      getManifest: T
      getList: T
      get: T
      add: T
      update: T
      delete: T
      isActionAllowed: T
    }
    planner: {
      getList: T
    }
    item: {
      userField: {
        getFields: T
        getTypes: T
        add: T
        get: T
        getList: T
        update: T
        delete: T
      }
    }
  }
  timeman: {
    settings: T
    status: T
    open: T
    close: T
    pause: T
    networkrange: {
      check: T
      get: T
      set: T
    }
    timecontrol: {
      report: {
        add: T
        get: T
        settings: { get: T }
        users: { get: T }
      }
      settings: {
        get: T
        set: T
      }
    }
    schedule: {
      get: T
    }
  }
  sonet_group: {
    create: T
    delete: T
    feature: {
      access: T
    }
    get: T
    setOwner: T
    update: T
  }
  server: {
    time: T
  }
  log: {
    blogpost: {
      add: T
      getusers: T
      get: T
      delete: T
      share: T
      update: T
    }
    blogcomment: {
      add: T
    }
  }
  lists: {
    add: T
    delete: T
    get: T
    update: T
    getIBlockTypeId: T
    element: {
      add: T
      delete: T
      get: T
      update: T
      getFileUrl: T
    }
    field: {
      add: T
      delete: T
      get: T
      type: {
        get: T
      }
      update: T
    }
  }
  im: {
    chat: {
      add: T
      list: T
      delete: T
      updateTitle: T
      updateColor: T
      updateAvatar: T
      setOwner: T
      get: T
      mute: T
    }
  }
  disk: {
    file: {
      getFields: T
      get: T
      rename: T
      copyTo: T
      moveto: T
      delete: T
      markDeleted: T
      restore: T
      uploadVersion: T
      getVersions: T
      restoreFromVersion: T
      getExternalLink: T
    }
    folder: {
      getFields: T
      get: T
      getChildren: T
      addSubFolder: T
      copyTo: T
      moveTo: T
      rename: T
      deleteTree: T
      markDeleted: T
      restore: T
      uploadFile: T
      getExternalLink: T
    }
    attachedObject: {
      get: T
    }
  }
  department: {
    get: T
    del: T
    add: T
    update: T
  }
  calendar: {
    event: {
      add: T
      delete: T
      get: T
      getNearest: T
      update: T
    }
  }
  bizProc: {
    workflow: {
      instances: T
      terminate: T
      start: T
      kill: T
    }
    activity: {
      add: T
      delete: T
      list: T
      update: T
      log: T
    }
    task: {
      complete: T
      list: T
    }
    robot: {
      add: T
      delete: T
      list: T
      update: T
    }
    event: {
      send: T
    }
  }
  app: {
    info: T
  }
}