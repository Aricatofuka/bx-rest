import { Component, inject, Inject, ViewEncapsulation } from '@angular/core'
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar'
import { BxRestModule } from '../../../request/bx-rest.module'

@Component({
  selector: 'app-view',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [BxRestModule],
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
