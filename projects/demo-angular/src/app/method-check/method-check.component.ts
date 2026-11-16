import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSelectModule } from '@angular/material/select'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { formatResultValueHtml, t } from 'bx-rest-demo-shared'
// Отдельная точка входа: проверка тянет список всех методов клиента, а этот компонент
// грузится только при открытии вкладки (см. @defer в app.component.html)
import {
  checkReportCsv,
  checkReportJson,
  PHASE_ORDER,
  runMethodCheck,
  summarize,
  type CheckProgress,
  type CheckRow,
  type CheckStatus,
  type CheckSummary
} from 'bx-rest-demo-shared/method-check'

/** Сколько последних проверенных методов показывать во время проверки */
const LOG_SIZE = 12

const STATUSES: CheckStatus[] = ['ok', 'mapping', 'api-error', 'error', 'skipped']

/** Подписи пагинатора на языке демо: у Material они только английские */
function paginatorIntl(): MatPaginatorIntl {
  const intl = new MatPaginatorIntl()
  const labels = t.methodCheck.paginator
  intl.itemsPerPageLabel = labels.itemsPerPage
  intl.firstPageLabel = labels.firstPage
  intl.previousPageLabel = labels.previousPage
  intl.nextPageLabel = labels.nextPage
  intl.lastPageLabel = labels.lastPage
  intl.getRangeLabel = (page, pageSize, length) => {
    const start = length ? page * pageSize + 1 : 0
    return labels.range(start, Math.min((page + 1) * pageSize, length), length)
  }
  return intl
}

@Component({
  selector: 'app-method-check',
  standalone: true,
  providers: [{ provide: MatPaginatorIntl, useFactory: paginatorIntl }],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule
  ],
  template: `
    <section class="method-check">
      <h2>{{ t.methodCheck.heading }}</h2>
      <p class="method-check__intro">{{ t.methodCheck.intro }}</p>

      <mat-checkbox [checked]="write" [disabled]="running" (change)="write = $event.checked">
        {{ t.methodCheck.writeLabel }}
      </mat-checkbox>
      @if (write) {
        <p class="method-check__warning">{{ t.methodCheck.writeWarning }}</p>
      }

      <div class="method-check__actions">
        <button mat-raised-button color="primary" [disabled]="!applied || running" (click)="start()">
          {{ t.methodCheck.startButton }}
        </button>
        <button mat-stroked-button [disabled]="!running || stopping" (click)="stop()">
          {{ t.methodCheck.stopButton }}
        </button>
        @if (rows.length && !running) {
          <button mat-stroked-button (click)="downloadCsv()">{{ t.methodCheck.downloadCsvButton }}</button>
          <button mat-stroked-button (click)="downloadJson()">{{ t.methodCheck.downloadButton }}</button>
        }
      </div>
      @if (!applied) {
        <p class="method-check__hint">{{ t.methodCheck.connectFirstHint }}</p>
      }

      @if (progress) {
        <div class="method-check__progress">
          <mat-progress-bar mode="determinate" [value]="percent"></mat-progress-bar>
          <div class="method-check__progress-text">
            <span>{{ t.methodCheck.phases[progress.phase] }} · {{ t.methodCheck.progress(progress.done, progress.total) }}</span>
            @if (progress.current) {
              <code>{{ t.methodCheck.current(progress.current) }}</code>
            }
          </div>
          @if (stopping) {
            <p class="method-check__warning">{{ t.methodCheck.stopping }}</p>
          }
        </div>
      }

      @if (running && log.length) {
        <ol class="method-check__log">
          @for (row of log; track row.index) {
            <li [class]="'method-check__status--' + row.status">
              <span>{{ t.methodCheck.statuses[row.status] }}</span>
              <code>{{ row.rest ?? row.path }}</code>
              <span class="method-check__details">{{ row.code }} {{ row.details }}</span>
            </li>
          }
        </ol>
      }

      @if (summary && !running) {
        <h3>{{ t.methodCheck.summaryHeading }}</h3>
        <table class="method-check__summary">
          <thead>
            <tr>
              <th></th>
              @for (status of statuses; track status) {
                <th>{{ t.methodCheck.statuses[status] }}</th>
              }
            </tr>
          </thead>
          <tbody>
            @for (phase of phases; track phase) {
              <tr>
                <th>{{ t.methodCheck.phases[phase] }}</th>
                @for (status of statuses; track status) {
                  <td>{{ summary.byPhase[phase][status] || '' }}</td>
                }
              </tr>
            }
          </tbody>
        </table>

        @if (summary.topCodes.length) {
          <h3>{{ t.methodCheck.topCodesHeading }}</h3>
          <p class="method-check__codes">
            @for (code of summary.topCodes.slice(0, 10); track code.code) {
              <button mat-stroked-button (click)="search(code.code)">{{ code.code }}: {{ code.count }}</button>
            }
          </p>
        }
      }

      <div class="method-check__table" [hidden]="!rows.length || running">
        <div class="method-check__filters">
          <mat-form-field>
            <mat-label>{{ t.methodCheck.filterLabel }}</mat-label>
            <mat-select [value]="statusFilter" (selectionChange)="filterStatus($event.value)">
              <mat-option value="">{{ t.methodCheck.filterAll }}</mat-option>
              @for (status of statuses; track status) {
                <mat-option [value]="status">{{ t.methodCheck.statuses[status] }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field class="method-check__search">
            <mat-label>{{ t.methodCheck.searchLabel }}</mat-label>
            <input matInput [value]="searchText" (input)="search($any($event.target).value)" />
          </mat-form-field>
        </div>
        <p class="method-check__hint">{{ t.methodCheck.detailsHint }}</p>

        <table mat-table [dataSource]="dataSource" multiTemplateDataRows>
          <ng-container matColumnDef="method">
            <th mat-header-cell *matHeaderCellDef>{{ t.methodCheck.columns.method }}</th>
            <td mat-cell *matCellDef="let row">
              <code>{{ row.rest ?? row.path }}</code>
              @if (row.rest && row.rest !== row.path) {
                <div class="method-check__path">{{ row.path }}</div>
              }
            </td>
          </ng-container>
          <ng-container matColumnDef="phase">
            <th mat-header-cell *matHeaderCellDef>{{ t.methodCheck.columns.phase }}</th>
            <td mat-cell *matCellDef="let row">{{ phaseLabel(row) }}</td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>{{ t.methodCheck.columns.status }}</th>
            <td mat-cell *matCellDef="let row" [class]="'method-check__status--' + row.status">
              {{ statusLabel(row) }}
            </td>
          </ng-container>
          <ng-container matColumnDef="details">
            <th mat-header-cell *matHeaderCellDef>{{ t.methodCheck.columns.details }}</th>
            <td mat-cell *matCellDef="let row" class="method-check__details">
              @if (row.code) {
                <code>{{ row.code }}</code>
              }
              {{ row.details }}
            </td>
          </ng-container>
          <ng-container matColumnDef="ms">
            <th mat-header-cell *matHeaderCellDef>{{ t.methodCheck.columns.ms }}</th>
            <td mat-cell *matCellDef="let row">{{ row.ms ?? '' }}</td>
          </ng-container>
          <!-- Подробности строки: параметры и ответ портала, раскрываются по клику -->
          <ng-container matColumnDef="expanded">
            <td mat-cell *matCellDef="let row" [attr.colspan]="columns.length">
              @if (row === expanded) {
                <div class="method-check__expanded">
                  <dl class="method-check__facts">
                    @if (row.restApi !== undefined) {
                      <dt>{{ t.methodCheck.details.address }}</dt>
                      <dd><code>{{ row.restApi ? 'rest/api/' : 'rest/' }}</code></dd>
                    }
                    @if (row.httpStatus) {
                      <dt>{{ t.methodCheck.details.httpStatus }}</dt>
                      <dd>{{ row.httpStatus }}</dd>
                    }
                    @if (row.kind) {
                      <dt>{{ t.methodCheck.details.kind }}</dt>
                      <dd><code>{{ row.kind }}</code></dd>
                    }
                  </dl>
                  @if (row.params !== undefined) {
                    <h4>{{ t.methodCheck.details.params }}</h4>
                    <pre class="result-card__body" [innerHTML]="json(row.params)"></pre>
                  }
                  <h4>{{ t.methodCheck.details.response }}</h4>
                  @if (row.response !== undefined) {
                    <pre class="result-card__body" [innerHTML]="json(row.response)"></pre>
                  } @else {
                    <p class="method-check__hint">{{ t.methodCheck.details.notStored }}</p>
                  }
                  @if (row.mapped !== undefined) {
                    <h4>{{ t.methodCheck.details.mapped }}</h4>
                    <pre class="result-card__body" [innerHTML]="json(row.mapped)"></pre>
                  }
                  @if (row.stack) {
                    <h4>{{ t.methodCheck.details.stack }}</h4>
                    <pre class="result-card__body">{{ row.stack }}</pre>
                  }
                  <button mat-stroked-button (click)="copyRow(row); $event.stopPropagation()">
                    {{ copied === row ? t.methodCheck.details.copied : t.methodCheck.details.copy }}
                  </button>
                </div>
              }
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns" class="method-check__row"
              [class.method-check__row--open]="row === expanded" (click)="toggle(row)"></tr>
          <tr mat-row *matRowDef="let row; columns: ['expanded']" class="method-check__expanded-row"
              [class.method-check__expanded-row--open]="row === expanded"></tr>
        </table>
        <mat-paginator [pageSize]="50" [pageSizeOptions]="[25, 50, 100, 500]"></mat-paginator>
      </div>
    </section>
  `
})
export class MethodCheckComponent implements AfterViewInit, OnDestroy {
  @Input() applied = false
  @ViewChild(MatPaginator) paginator?: MatPaginator

  readonly t = t
  readonly statuses = STATUSES
  readonly phases = PHASE_ORDER
  readonly columns = ['method', 'phase', 'status', 'details', 'ms']
  readonly dataSource = new MatTableDataSource<CheckRow>([])

  write = false
  running = false
  stopping = false
  progress?: CheckProgress
  rows: CheckRow[] = []
  log: CheckRow[] = []
  summary?: CheckSummary
  statusFilter: CheckStatus | '' = ''
  searchText = ''
  /** Строка, у которой раскрыты подробности */
  expanded?: CheckRow
  /** Строка, которую только что скопировали */
  copied?: CheckRow

  private abort?: AbortController

  constructor() {
    this.dataSource.filterPredicate = (row, filter) => {
      const { status, text } = JSON.parse(filter) as { status: string, text: string }
      if (status && row.status !== status) return false
      if (!text) return true
      return [row.rest, row.path, row.code, row.details].some(value => value?.toLowerCase().includes(text))
    }
  }

  phaseLabel(row: CheckRow): string {
    return t.methodCheck.phases[row.phase]
  }

  statusLabel(row: CheckRow): string {
    return t.methodCheck.statuses[row.status]
  }

  get percent(): number {
    return this.progress?.total ? (this.progress.done / this.progress.total) * 100 : 0
  }

  ngAfterViewInit(): void {
    if (this.paginator) this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    this.abort?.abort()
  }

  async start(): Promise<void> {
    this.abort = new AbortController()
    this.running = true
    this.stopping = false
    this.rows = []
    this.log = []
    this.summary = undefined
    this.progress = undefined
    this.expanded = undefined
    this.copied = undefined
    try {
      this.rows = await runMethodCheck({
        write: this.write,
        signal: this.abort.signal,
        onProgress: progress => (this.progress = progress),
        onRow: row => {
          if (row.status !== 'skipped') this.log = [row, ...this.log].slice(0, LOG_SIZE)
        }
      })
      this.summary = summarize(this.rows)
      this.dataSource.data = this.rows
      this.applyFilter()
    } finally {
      this.running = false
      this.stopping = false
    }
  }

  stop(): void {
    this.stopping = true
    this.abort?.abort()
  }

  filterStatus(status: CheckStatus | ''): void {
    this.statusFilter = status
    this.applyFilter()
  }

  search(text: string): void {
    this.searchText = text
    this.applyFilter()
  }

  toggle(row: CheckRow): void {
    this.expanded = this.expanded === row ? undefined : row
  }

  json(value: unknown): string {
    return formatResultValueHtml(value)
  }

  async copyRow(row: CheckRow): Promise<void> {
    await navigator.clipboard.writeText(JSON.stringify(row, null, 2))
    this.copied = row
  }

  downloadJson(): void {
    this.save(checkReportJson(this.rows), 'application/json', 'json')
  }

  downloadCsv(): void {
    this.save(checkReportCsv(this.rows), 'text/csv;charset=utf-8', 'csv')
  }

  private save(content: string, type: string, extension: string): void {
    const url = URL.createObjectURL(new Blob([content], { type }))
    const link = document.createElement('a')
    link.href = url
    link.download = `bx-rest-method-check-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.${extension}`
    link.click()
    URL.revokeObjectURL(url)
  }

  private applyFilter(): void {
    this.dataSource.filter = JSON.stringify({ status: this.statusFilter, text: this.searchText.trim().toLowerCase() })
    this.dataSource.paginator?.firstPage()
  }
}
