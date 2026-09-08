import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { AUTH_MODE_META, AUTH_MODE_ORDER, t, type AuthModeId, type Connection } from 'bx-rest-demo-shared'

@Component({
  selector: 'app-connection-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './connection-form.component.html'
})
export class ConnectionFormComponent {
  @Input({ required: true }) connection!: Connection
  @Input() applied = false
  @Input() isValid = false

  @Output() connectionChange = new EventEmitter<Connection>()
  @Output() connect = new EventEmitter<void>()

  readonly authModes = AUTH_MODE_ORDER
  readonly t = t

  get meta() {
    return AUTH_MODE_META[this.connection.authMode]
  }

  get modeStrings() {
    return t.connection.modes[this.connection.authMode]
  }

  patch<K extends keyof Connection>(key: K, value: Connection[K] | AuthModeId): void {
    this.connectionChange.emit({ ...this.connection, [key]: value })
  }
}
