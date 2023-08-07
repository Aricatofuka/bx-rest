/**
 * Сервис для вывода сообщений пользователю
 * TODO: логирование
 */
import { Injectable } from '@angular/core'
import { ToastMessageComponent } from '@/lib/services/snack-bar/toast-message/toast-message.component'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export default class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  error(message: string, sec = 12): void {
    this.standardMessage(message, sec, 'error')
  }

  warning(message: string, sec = 7): void {
    this.standardMessage(message, sec, 'warning');
  }

  success(message: string, sec = 7): void {
    this.standardMessage(message, sec, 'success');
  }

  standardMessage(message: string, sec = 5, name = 'error'): void{
    this.snackBar.open(message);
    this.snackBar.openFromComponent(ToastMessageComponent, {
      duration: sec * 1000,
      data: {
        message: message,
        type: name
      },
      panelClass: name + '-box'
    });
  }
}
