import { Injectable } from '@angular/core'
import SessionKeyServices from '@/lib/services/api/bitrix/http/sessionKey'
import { map, mergeMap, of } from 'rxjs'
import SnackBarService from '@/lib/services/snack-bar/snack-bar.service'

@Injectable({
  providedIn: 'root'
})
export default class IFrameVanillaJS {
  parent = window.parent

  constructor(
    private session: SessionKeyServices,
    private snackBar: SnackBarService
  ) {
  }

  sendMessage(message: any, targetOrigin = '') {
    return this.session.authData$.pipe(
      mergeMap(
        v => {
          if(v){
            if (message && !message.id){
              message.id = v.access_token
            }
            if (this.parent && this.parent['postMessage']) {
              if (targetOrigin.length) {
                this.parent.postMessage(message, targetOrigin)
                return of(true)
              } else {
                return this.session.getBaseUrl().pipe(
                  map(v => {
                    if (v) {
                      this.parent.postMessage(message, v)
                      return true
                    }
                    this.snackBar.error('Не удалось получить адрес родителя для фрейма')
                    return false
                  })
                )
              }
            }
            this.snackBar.error('Не удалось получить адрес родителя для фрейма')
            return of(false)
          }
          this.snackBar.error('Не удалось получить авторизационные данные')
          return of(false)
        }
      )
    )

  }

  getMassage(func: Function){
    window.addEventListener('message', func())
  }
}
