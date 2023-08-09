import { Action, createReducer, on, props } from '@ngrx/store'
import { createAction } from '@ngrx/store'
import clone from 'just-clone'
import { iBXRestUser } from 'bx-rest/typification/rest/user/user'

export interface storeUsers {
  load: {
    all: boolean,
    department: number[]
  }
  self: iBXRestUser  | undefined
  data: iBXRestUser []
}

export const save = createAction('[Users Component] Save', props<iBXRestUser >())
export const saveArr = createAction('[Users Component] Save Arr', props<{ arr: iBXRestUser [] }>())
export const update = createAction('[Users Component] Update', props<iBXRestUser >())
export const loadAll = createAction('[Users Component] loadAll', props<{ load: true }>())
export const saveSelf = createAction('[Users Component] saveSelf', props<{ self: iBXRestUser  }>())
export const saveIDLoadedDepartment = createAction('[Users Component] saveIDLoadedDepartment', props<{id: number[]}>())

export const initialState: storeUsers = {
  load: {
    all: false,
    department: []
  },
  self: undefined,
  data: []
}

const _usersReducer = createReducer(
  initialState,
  on(saveIDLoadedDepartment, (s, data) => {
    let copy = clone(s)
    copy.load.department = [...copy.load.department, ...data.id]
    return copy
  }),
  on(save, (s, data) => {
    const find = s.data.find(v => v.ID === data.ID)
    if (!find) {
      const copy = clone(s)
      copy.data.push(data)
      return copy
    }
    return s
  }),
  on(saveArr, (s, data) => {
    const copy = clone(s)
    if(copy.data && copy.data.length) {
      for (const user of data.arr) {
        const find = copy.data.find(v => v.ID === user.ID)
        if (!find) {
          copy.data.push(user)
        }
      }
    } else {
      copy.data = [...data.arr]
    }
    return copy
  }),
  on(update, (s, data) => {
    const copy = clone(s)
    let find = copy.data.findIndex(v => v.ID === data.ID)
    if (find !== -1) {
      const copy = clone(s)
      copy.data.splice(find, 1, data);
      // copy.data.push(data)
      return copy
    }
    return s
  }),
  on(loadAll, (s, data) => {
    if (data.load !== s.load.all) {
      const copy = clone(s)
      copy.load.all = data.load
      return copy
    }
    return s
  }),
  on(saveSelf, (s, data) => {
    return { ...s, self: data.self}
  })
)


export function usersReducer(state = initialState, action: Action) {
  return _usersReducer(state, action)
}
