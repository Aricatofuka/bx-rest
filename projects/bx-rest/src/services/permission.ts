import { SessionStorage } from './vanilla/sessionStorage'
import { iBXRestPermission, iBXRestPermissionAddictionItem } from '../typification/permission'

export class Permission {

  static get(){
    return SessionStorage.getItem('permission') as iBXRestPermission
  }

  static set(param: iBXRestPermission){
    SessionStorage.setItem('permission', Object.assign(this.get(), param))
  }

  static setTaskElapsedItem(idTask: number, ElapsedItem: iBXRestPermissionAddictionItem){
    let permission = Permission.get()
    if(permission.tasks) {
      let findTask = permission.tasks.find(i => i.id === idTask)
      if(findTask){
        let findTaskElapsedItem = findTask.elapsedItem.find(i => i.id === ElapsedItem.id)
        if(findTaskElapsedItem) {
          if(ElapsedItem.verified.edit){
            findTaskElapsedItem.verified.edit = ElapsedItem.verified.edit
            findTaskElapsedItem.edit = ElapsedItem.edit
          }
          if(ElapsedItem.verified.del){
            findTaskElapsedItem.verified.del = ElapsedItem.verified.del
            findTaskElapsedItem.del = ElapsedItem.del
          }
        } else {
          findTask.elapsedItem.push(ElapsedItem)
        }
      }
      SessionStorage.setItem('permission', permission)
    }
  }
}
