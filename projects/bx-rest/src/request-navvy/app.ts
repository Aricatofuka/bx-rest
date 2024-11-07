import { inject, Injectable } from '@angular/core'
import { Navvy } from '../services/navvy'
import { BXRestApp } from '../request/app'
import { BXRestMapApp } from '../map/app'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyApp {

  private readonly BXRestApp = inject(BXRestApp)
  private readonly BXRestMapApp = inject(BXRestMapApp)
  private readonly Navvy = new Navvy(this.BXRestApp, this.BXRestMapApp)

  /**
   * Показ информации о приложении. Метод поддерживает безопасный вызов
   */
  info(){
    return this.Navvy.simple(
      this.BXRestApp.info,
      this.BXRestMapApp.info
    )
  }
}
