import { Component, inject, Inject, ViewEncapsulation } from '@angular/core'
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar'

@Component({
  selector: 'app-view',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToastMessageComponent {

  snackBarRef = inject(MatSnackBarRef)

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, type: 'error' | 'warning' | 'success' }) {
  }

  getClass():string{
    switch (this.data.type){
      case 'error':
      case 'warning':
      case 'success':
        return this.data.type + '-message';
    }
    return '';
  }
}
