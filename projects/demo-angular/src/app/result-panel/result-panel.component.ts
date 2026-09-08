import { Component, Input } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { formatResultValueHtml, t, type SandboxResult } from 'bx-rest-demo-shared'

@Component({
  selector: 'app-result-panel',
  standalone: true,
  imports: [MatCardModule],
  template: `
    @if (results.length === 0) {
      <p class="result-panel__empty">{{ t.results.empty }}</p>
    } @else {
      <div class="result-panel">
        @for (result of results; track result.callId) {
          <mat-card class="result-card" [class]="'result-card--' + result.status">
            <mat-card-header>
              <mat-card-title>{{ t.results.callLabel(result.callId) }}</mat-card-title>
              <mat-card-subtitle>{{ t.results.status[result.status] }}</mat-card-subtitle>
            </mat-card-header>
            @if (result.status !== 'pending') {
              <mat-card-content>
                <!-- formatResultValueHtml сама экранирует данные ответа и оборачивает
                     только JSON-токены в <span> — Angular всё равно санитизирует
                     innerHTML, но опасных тегов/атрибутов там и так нет. -->
                <pre class="result-card__body" [innerHTML]="format(result.value)"></pre>
              </mat-card-content>
            }
          </mat-card>
        }
      </div>
    }
  `
})
export class ResultPanelComponent {
  @Input() results: SandboxResult[] = []
  readonly t = t

  format(value: unknown): string {
    return formatResultValueHtml(value)
  }
}
