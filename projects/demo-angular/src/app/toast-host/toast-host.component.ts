import { Component, OnDestroy, OnInit } from '@angular/core'
import { onStorageWarning, t } from 'bx-rest-demo-shared'

const AUTO_HIDE_MS = 7000

/**
 * Слушает предупреждения о сбоях хранилища (см. bx-rest-demo-shared/notifications.ts)
 * и показывает короткий тост — полная ошибка уже ушла в консоль на момент события.
 */
@Component({
  selector: 'app-toast-host',
  standalone: true,
  template: `
    @if (message) {
      <div class="toast" role="alert">
        <span>{{ message }}</span>
        <button type="button" class="toast__close" [attr.aria-label]="t.toast.close" (click)="close()">×</button>
      </div>
    }
  `
})
export class ToastHostComponent implements OnInit, OnDestroy {
  readonly t = t
  message: string | null = null

  private unsubscribe: (() => void) | null = null
  private hideTimer: ReturnType<typeof setTimeout> | null = null

  ngOnInit(): void {
    this.unsubscribe = onStorageWarning(warning => {
      this.message = warning.message
      if (this.hideTimer) clearTimeout(this.hideTimer)
      this.hideTimer = setTimeout(() => (this.message = null), AUTO_HIDE_MS)
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe?.()
    if (this.hideTimer) clearTimeout(this.hideTimer)
  }

  close(): void {
    this.message = null
    if (this.hideTimer) clearTimeout(this.hideTimer)
  }
}
