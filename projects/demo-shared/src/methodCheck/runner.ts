// Проверка методов клиента на живом портале. Порядок: сначала все методы чтения с проверкой
// маппера, затем сценарии записи — все добавления, все изменения и все удаления.
// Остальные методы пока не проверяются, в таблице они отмечены как пропущенные.
import { defaultIfEmpty, firstValueFrom, from, type ObservableInput } from 'rxjs'
import { BXRestNavvy, BXRestSettings, isBXRestAnswerSuccess, type BXRestRequestLogEntry } from 'bx-rest'
import { CLIENT_METHODS } from '../generated/clientMethods'
import { t } from '../i18n'
import { isListMethod, isSingleGet, type MethodPhase, phaseOf, sectionOf } from './classify'
import { mappingIssues } from './mapping'
import { type ScenarioContext, type ScenarioStep, WRITE_SCENARIOS, type WriteScenario } from './scenarios'

export type CheckStatus = 'pending' | 'ok' | 'mapping' | 'api-error' | 'error' | 'skipped'

export interface CheckRow {
  index: number
  /** Путь от клиента: `crm.deal.list` */
  path: string
  rest?: string
  /** Класс объекта запроса в клиенте: `NavvySimple`, `NavvyPag`… */
  kind?: string
  phase: MethodPhase
  status: CheckStatus
  /** Код ошибки Bitrix24: по нему удобно группировать */
  code?: string
  /** Описание ошибки, проблемы маппера или причина пропуска */
  details: string
  /** Параметры, с которыми ушёл запрос */
  params?: unknown
  /** Запрос ушёл на адрес REST v3 `rest/api/` */
  restApi?: boolean
  /** HTTP-статус ответа, если запрос завершился ошибкой */
  httpStatus?: number
  /**
   * Тело ответа портала целиком — у строк с ошибкой или проблемой маппера.
   * У успешных строк не хранится: на сотнях списков отчёт вырос бы до десятков мегабайт
   */
  response?: unknown
  /** Что вернул маппер — у строк с проблемой маппера */
  mapped?: unknown
  /** Стек исключения, если упал маппер или метод клиента */
  stack?: string
  /** Длительность запроса, мс */
  ms?: number
}

export interface CheckProgress {
  done: number
  total: number
  phase: MethodPhase
  /** REST-имя метода, который выполняется сейчас */
  current?: string
}

export interface MethodCheckOptions {
  /** Запускать ли сценарии записи: они создают, меняют и удаляют записи на портале */
  write: boolean
  /** Остановка. Если запись уже началась, созданное всё равно удаляется */
  signal?: AbortSignal
  onProgress?(progress: CheckProgress): void
  onRow?(row: CheckRow): void
  /** Свой клиент. По умолчанию — из текущих `BXRestSettings` с очередью и повтором */
  client?: BXRestNavvy
}

/** Тип сделки в универсальных методах CRM (`entityTypeId`) */
const DEAL_TYPE_ID = 2

interface ReadContext {
  userId: number
  /** Раздел → id первой записи из ответа на чтение */
  firstIds: Record<string, number | string>
}

/**
 * Параметры чтения, которые по имени метода не угадать. `undefined` — вызвать нечем,
 * метод пропускается
 */
const READ_PARAMS: Record<string, (ctx: ReadContext) => object | undefined> = {
  'calendar.section.get': ctx => (ctx.userId ? { type: 'user', ownerId: ctx.userId } : undefined),
  'crm.item.list': () => ({ entityTypeId: DEAL_TYPE_ID }),
  'crm.item.fields': () => ({ entityTypeId: DEAL_TYPE_ID }),
  'crm.item.get': ctx => withFirstId(ctx, 'crm.item', id => ({ entityTypeId: DEAL_TYPE_ID, id })),
  'tasks.task.get': ctx => withFirstId(ctx, 'tasks.task', taskId => ({ taskId })),
}

function withFirstId(ctx: ReadContext, section: string, params: (id: number | string) => object) {
  const id = ctx.firstIds[section]
  return id === undefined ? undefined : params(id)
}

/**
 * Клиент для проверки: настройки подключения плюс очередь, повтор при лимите и таймаут.
 * `onRequest` получает запись журнала о каждом HTTP-запросе, в том числе о каждой попытке повтора
 */
export function createCheckClient(onRequest?: (entry: BXRestRequestLogEntry) => void): BXRestNavvy {
  const settings = BXRestSettings.value
  return new BXRestNavvy({
    ...settings,
    throttle: true,
    retryOnQueryLimit: true,
    timeout: 30_000,
    logRequests: entry => {
      settings.logRequests?.(entry)
      onRequest?.(entry)
    },
  })
}

/**
 * Время HTTP-запросов текущего метода. Берётся из журнала `logRequests`: в нём нет ожидания
 * в очереди `throttle`, а она занимает до полсекунды на каждый метод. Со своим клиентом
 * журнала нет, и время меряется от отправки до ответа
 */
interface HttpTimer {
  fromLog: boolean
  ms: number
}

/** Строки таблицы для всех методов клиента, ещё без результата */
export function createCheckRows(): CheckRow[] {
  return CLIENT_METHODS.map((method, index) => ({
    index,
    path: method.path,
    rest: method.rest,
    kind: method.kind,
    phase: phaseOf(method.rest),
    status: 'pending',
    details: '',
  }))
}

export async function runMethodCheck(options: MethodCheckOptions): Promise<CheckRow[]> {
  const timer: HttpTimer = { fromLog: !options.client, ms: 0 }
  const client = options.client ?? createCheckClient(entry => (timer.ms += entry.duration))
  const rows = createCheckRows()
  const reads = orderReads(rows.filter(row => row.phase === 'read'))
  const scenarioSteps = options.write ? WRITE_SCENARIOS.reduce((sum, s) => sum + (s.update ? 3 : 2), 0) : 0
  const progress: CheckProgress = { done: 0, total: reads.length + scenarioSteps, phase: 'read' }
  const report = (row: CheckRow) => options.onRow?.(row)
  const step = (current?: string) => options.onProgress?.({ ...progress, current })

  const readCtx: ReadContext = { userId: 0, firstIds: {} }
  const requests: Requests = { cache: new Map(), timer }

  for (const row of reads) {
    if (options.signal?.aborted) break
    step(row.rest)
    await checkRead(client, row, readCtx, requests)
    progress.done++
    report(row)
  }

  if (options.write && !options.signal?.aborted) {
    await runScenarios(client, rows, readCtx, progress, options, timer)
  }

  for (const row of rows) {
    if (row.status !== 'pending') continue
    row.status = 'skipped'
    row.details = skipReason(row, options)
    report(row)
  }
  step()
  return rows
}

function skipReason(row: CheckRow, options: MethodCheckOptions): string {
  if (options.signal?.aborted) return t.methodCheck.reasons.stopped
  if (row.phase === 'other') return row.rest ? t.methodCheck.reasons.otherPhase : t.methodCheck.reasons.noRequest
  if (row.phase === 'read') return t.methodCheck.reasons.notRun
  return options.write ? t.methodCheck.reasons.noScenario : t.methodCheck.reasons.writeOff
}

/** `user.current` первым, затем списки и прочее чтение, а `*.get` — после списков своего раздела */
function orderReads(reads: CheckRow[]): CheckRow[] {
  const rank = (row: CheckRow) => (row.rest === 'user.current' ? 0 : isSingleGet(row.rest!) ? 2 : 1)
  return [...reads].sort((a, b) => rank(a) - rank(b) || a.index - b.index)
}

async function checkRead(client: BXRestNavvy, row: CheckRow, ctx: ReadContext, requests: Requests) {
  const rest = row.rest!
  let params: object | undefined = {}
  const override = READ_PARAMS[rest]
  if (override) {
    params = override(ctx)
  } else if (isSingleGet(rest)) {
    params = singleGetParams(client, row.path, ctx.firstIds[sectionOf(rest)])
  }
  if (params === undefined) {
    row.status = 'skipped'
    row.details = t.methodCheck.reasons.noParams
    return
  }
  row.params = params

  const outcome = await check(() => callMethod(client, row.path, params), requests, `${rest}|${JSON.stringify(params)}`)
  Object.assign(row, outcome.row)
  if (outcome.result === undefined) return

  if (rest === 'user.current') {
    ctx.userId = Number((outcome.result as { ID?: unknown } | undefined)?.ID) || 0
  }
  const section = sectionOf(rest)
  if (ctx.firstIds[section] === undefined && (isListMethod(rest) || Array.isArray(outcome.result))) {
    const id = firstRecordId(outcome.result)
    if (id !== undefined) ctx.firstIds[section] = id
  }
}

/** Для `*.get` — id первой записи из списка того же раздела. Без id метод зовётся без параметров */
function singleGetParams(client: BXRestNavvy, path: string, id: number | string | undefined): object {
  if (id === undefined) return {}
  // REST v3 проверяет параметры строго, лишний `ID` он не примет
  const probe = callMethod(client, path, {}) as { restApi?: boolean }
  return probe?.restApi ? { id } : { id, ID: id }
}

function firstRecordId(result: unknown): number | string | undefined {
  const record = firstRecord(result) as Record<string, unknown> | undefined
  const id = record?.['ID'] ?? record?.['id']
  return (typeof id === 'number' || (typeof id === 'string' && id !== '')) ? id : undefined
}

function firstRecord(result: unknown): unknown {
  if (Array.isArray(result)) return result[0]
  if (!result || typeof result !== 'object') return undefined
  const values = Object.values(result)
  // `{ items: [...] }`, `{ tasks: [...] }`
  const list = values.find(value => Array.isArray(value) && value.length > 0) as unknown[] | undefined
  if (list) return list[0]
  // `{ "103": { id: 103, ... } }`
  return values.length && values.every(value => value && typeof value === 'object' && !Array.isArray(value)) ? values[0] : undefined
}

async function runScenarios(
  client: BXRestNavvy,
  rows: CheckRow[],
  readCtx: ReadContext,
  progress: CheckProgress,
  options: MethodCheckOptions,
  timer: HttpTimer
) {
  const byRest = new Map<string, CheckRow>()
  for (const row of rows) {
    if (row.rest && row.phase !== 'read' && !byRest.has(row.rest)) byRest.set(row.rest, row)
  }
  const ctx: ScenarioContext = {
    bx: client,
    userId: readCtx.userId,
    label: `bx-rest check ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`,
    created: {},
    found: Object.fromEntries(Object.entries(readCtx.firstIds).map(([section, id]) => [section, Number(id)])),
  }
  const requests: Requests = { cache: new Map(), timer }

  const runStep = async (scenario: WriteScenario, scenarioStep: ScenarioStep, phase: MethodPhase, id: number) => {
    progress.phase = phase
    options.onProgress?.({ ...progress, current: scenarioStep.rest })
    const row = byRest.get(scenarioStep.rest) ?? stepRow(rows, scenarioStep.rest, phase)
    const outcome = await check(() => scenarioStep.request(ctx, id), requests, `${scenario.id}|${phase}|${id}`)
    Object.assign(row, outcome.row)
    progress.done++
    options.onRow?.(row)
    return outcome
  }
  const skipStep = (scenarioStep: ScenarioStep | undefined, phase: MethodPhase, reason: string) => {
    if (!scenarioStep) return
    const row = byRest.get(scenarioStep.rest) ?? stepRow(rows, scenarioStep.rest, phase)
    Object.assign(row, { status: 'skipped', details: reason })
    progress.done++
    options.onRow?.(row)
  }

  // Добавление — в порядке списка: сценарии с `needs` стоят после тех, от кого зависят
  for (const scenario of WRITE_SCENARIOS) {
    const missing = scenario.needs?.find(need => ctx.created[need] === undefined)
    const reason = options.signal?.aborted
      ? t.methodCheck.reasons.stopped
      : missing ? t.methodCheck.reasons.needs(missing) : scenario.notReady?.(ctx)
    if (reason) {
      skipStep(scenario.add, 'add', reason)
      skipStep(scenario.update, 'update', reason)
      skipStep(scenario.delete, 'delete', reason)
      continue
    }
    const outcome = await runStep(scenario, scenario.add, 'add', 0)
    const id = outcome.result === undefined ? undefined : scenario.add.idOf(outcome.result)
    if (id === undefined) {
      if (outcome.row.status === 'ok') {
        Object.assign(byRest.get(scenario.add.rest)!, { status: 'error', details: t.methodCheck.reasons.noCreatedId })
      }
      skipStep(scenario.update, 'update', t.methodCheck.reasons.addFailed)
      skipStep(scenario.delete, 'delete', t.methodCheck.reasons.addFailed)
      continue
    }
    ctx.created[scenario.id] = id
  }

  for (const scenario of WRITE_SCENARIOS) {
    const id = ctx.created[scenario.id]
    if (id === undefined || !scenario.update) continue
    if (options.signal?.aborted) skipStep(scenario.update, 'update', t.methodCheck.reasons.stopped)
    else await runStep(scenario, scenario.update, 'update', id)
  }

  // Удаление — в обратном порядке и даже после остановки: на портале не должно остаться созданного
  for (const scenario of [...WRITE_SCENARIOS].reverse()) {
    const id = ctx.created[scenario.id]
    if (id !== undefined) await runStep(scenario, scenario.delete, 'delete', id)
  }
}

/**
 * Строка для метода сценария, которого нет в клиенте под этим REST-именем. Обычно это обёртка
 * вроде `tasks.task.update`: в списке методов у неё есть путь, но нет REST-имени
 */
function stepRow(rows: CheckRow[], rest: string, phase: MethodPhase): CheckRow {
  const byPath = rows.find(row => !row.rest && row.path.toLowerCase() === rest.toLowerCase())
  if (byPath) {
    return Object.assign(byPath, { rest, phase })
  }
  const row: CheckRow = { index: rows.length, path: rest, rest, phase, status: 'pending', details: '' }
  rows.push(row)
  return row
}

/** Запросы одного прогона: одинаковые уходят на портал один раз */
interface Requests {
  cache: Map<string, Promise<Answer>>
  timer: HttpTimer
}

interface Answer {
  ms: number
  answer?: unknown
  error?: unknown
}

interface Outcome {
  row: Pick<CheckRow, 'status' | 'details' | 'code' | 'ms' | 'params' | 'restApi' | 'httpStatus' | 'response' | 'mapped' | 'stack'>
  /** `result` из ответа портала, если запрос прошёл */
  result?: unknown
}

/**
 * Запрос и проверка маппера. Ответ берётся из `.resVanilla()`, а маппер запроса применяется
 * к его `result` здесь же: так один запрос даёт и сырые данные, и результат маппера.
 * Одинаковые запросы (один метод под разными путями клиента) уходят на портал один раз
 */
async function check(makeRequest: () => unknown, { cache, timer }: Requests, key: string): Promise<Outcome> {
  let request: RequestLike
  try {
    request = asRequest(makeRequest())
  } catch (error) {
    return { row: { status: 'error', details: `${t.methodCheck.reasons.clientThrew}: ${messageOf(error)}`, stack: stackOf(error) } }
  }
  // Параметры и адрес — из самого объекта запроса: так они видны и у сценариев записи
  const sent = { params: request.param, restApi: request.restApi === true }
  if (!cache.has(key)) {
    const started = performance.now()
    timer.ms = 0
    const elapsed = () => Math.round(timer.fromLog ? timer.ms : performance.now() - started)
    cache.set(key, firstValueFrom(from(request.resVanilla()).pipe(defaultIfEmpty(undefined))).then(
      answer => ({ ms: elapsed(), answer }),
      error => ({ ms: elapsed(), error })
    ))
  }
  const { ms, answer, error } = await cache.get(key)!

  if (error !== undefined) {
    // Только статус и тело ответа: в самой ошибке axios лежат адрес с секретом вебхука и токен
    const http = httpResponseOf(error)
    const apiError = apiErrorOf(http?.data)
    return apiError
      ? { row: { ...sent, status: 'api-error', code: apiError.code, details: apiError.description, ms, httpStatus: http?.status, response: http?.data } }
      : { row: { ...sent, status: 'error', details: messageOf(error), ms, httpStatus: http?.status, response: http?.data, stack: stackOf(error) } }
  }
  if (!answer || typeof answer !== 'object') {
    return { row: { ...sent, status: 'error', details: t.methodCheck.reasons.notRest, ms, response: answer } }
  }
  if (!isBXRestAnswerSuccess(answer)) {
    const apiError = apiErrorOf(answer)
    return { row: { ...sent, status: 'api-error', code: apiError?.code, details: apiError?.description ?? '', ms, response: answer } }
  }

  const result = (answer as { result?: unknown }).result
  let mapped: unknown
  try {
    mapped = request.map ? request.map(result) : result
  } catch (mapperError) {
    const details = `${t.methodCheck.reasons.mapperThrew}: ${messageOf(mapperError)}`
    return { row: { ...sent, status: 'mapping', details, ms, response: answer, stack: stackOf(mapperError) }, result }
  }
  const issues = mappingIssues(result, mapped)
  return issues.length
    ? { row: { ...sent, status: 'mapping', details: issues.join('; '), ms, response: answer, mapped }, result }
    : { row: { ...sent, status: 'ok', details: '', ms }, result }
}

/** Поля NavvyPagBase, которые нужны проверке. Снаружи они не описаны */
interface RequestLike {
  resVanilla(): ObservableInput<unknown>
  /** Маппер запроса */
  map?: (value: unknown) => unknown
  /** Параметры запроса */
  param?: unknown
  /** Запрос идёт на адрес REST v3 */
  restApi?: boolean
}

function asRequest(value: unknown): RequestLike {
  if (value && typeof (value as RequestLike).resVanilla === 'function') {
    return value as RequestLike
  }
  throw new Error(t.methodCheck.reasons.notRequest)
}

function callMethod(client: BXRestNavvy, path: string, params: unknown): unknown {
  const parts = path.split('.')
  let owner: unknown = client
  for (const part of parts.slice(0, -1)) {
    owner = (owner as Record<string, unknown> | undefined)?.[part]
  }
  const method = (owner as Record<string, unknown> | undefined)?.[parts[parts.length - 1]]
  if (typeof method !== 'function') {
    throw new Error(`${path} is not a method of the client`)
  }
  return method.call(owner, params)
}

/** Статус и тело ответа из ошибки axios или `BXRestHttpError` транспорта fetch */
function httpResponseOf(error: unknown): { status?: number, data?: unknown } | undefined {
  const response = (error as { response?: { data?: unknown, status?: number } } | undefined)?.response
  return response ? { status: response.status, data: response.data } : undefined
}

/** Код и описание ошибки Bitrix24 из тела ответа: старый формат и формат REST v3 */
function apiErrorOf(body: unknown): { code: string, description: string } | undefined {
  const data = body as { error?: unknown, error_description?: unknown } | undefined
  if (!data || typeof data !== 'object' || data.error === undefined) return undefined
  if (data.error && typeof data.error === 'object') {
    const v3 = data.error as { code?: unknown, message?: unknown }
    return { code: String(v3.code ?? ''), description: String(v3.message ?? '') }
  }
  return { code: String(data.error), description: String(data.error_description ?? '') }
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

function stackOf(error: unknown): string | undefined {
  return error instanceof Error ? error.stack : undefined
}

export interface CheckSummary {
  byStatus: Record<CheckStatus, number>
  byPhase: Record<MethodPhase, Record<CheckStatus, number>>
  /** Коды ошибок Bitrix24 по убыванию частоты */
  topCodes: { code: string, count: number }[]
}

export function summarize(rows: readonly CheckRow[]): CheckSummary {
  const empty = (): Record<CheckStatus, number> => ({ pending: 0, ok: 0, mapping: 0, 'api-error': 0, error: 0, skipped: 0 })
  const byStatus = empty()
  const byPhase = { read: empty(), add: empty(), update: empty(), delete: empty(), other: empty() }
  const codes = new Map<string, number>()
  for (const row of rows) {
    byStatus[row.status]++
    byPhase[row.phase][row.status]++
    if (row.status === 'api-error' && row.code) codes.set(row.code, (codes.get(row.code) ?? 0) + 1)
  }
  const topCodes = [...codes].map(([code, count]) => ({ code, count })).sort((a, b) => b.count - a.count)
  return { byStatus, byPhase, topCodes }
}
