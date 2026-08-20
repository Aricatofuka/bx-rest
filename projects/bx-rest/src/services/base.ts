/**
 * Преобразует значение в строку
 *
 * @param val
 * @param throwError
 */
export function toStr(val: any, throwError = false): string {
  if (val === null || val === undefined) {
    if (throwError) {
      throw new Error(`Invalid value: ${val} cannot be converted to string`)
    }
    return ''
  }
  return String(val)
}

/**
 * Преобразует значение в число
 */
export function toNum(val: any, throwError = true, defValue = 0): number {
  const result = Number(val)

  if (isNaN(result)) {
    const error = new ToNumError(val)

    if (throwError) throw error

    // Если ошибка не пробрасывается — просто логируем
    console.error(error.toString())
    return defValue
  }

  return result
}

/**
 * Кастомный тип ошибки для числовых преобразований
 */
export class ToNumError extends Error {
  constructor(public readonly value: any) {
    const valueType = typeof value
    const formattedValue =
      valueType === 'object' ? JSON.stringify(value) : String(value)
    const message = `Invalid value passed to toNum(): ${formattedValue} (type: ${valueType})`
    super(message)
    this.name = 'ToNumError'

    // сохраняем стек вызова (отфильтровав сам конструктор)
    if (this.stack) {
      const stackLines = this.stack.split('\n')
      // Удаляем строку конструктора (чтобы стек начинался с места вызова toNum)
      this.stack = [stackLines[0], ...stackLines.slice(2)].join('\n')
    }
  }

  override toString(): string {
    return [
      `❌ [${this.name}] ${this.message}`,
      this.stack ? `   Stack trace:\n${this.stack}` : '',
    ].join('\n')
  }
}

/**
 * Опции для toDate(). Оставлены для обратной совместимости сигнатуры — ранее пробрасывались
 * в luxon (зона/локаль). Разбор даты теперь не зависит от внешних библиотек и поддерживает
 * только фиксированные числовые токены (см. parseDateWithFormat), поэтому опции сейчас не используются.
 */
export interface ToDateOptions {
  zone?: string
  locale?: string
}

/** Соответствие токенов формата регулярным группам захвата. Порядок важен: длинные токены проверяются раньше коротких */
const DATE_FORMAT_TOKENS: [string, string][] = [
  ['yyyy', '(?<yyyy>\\d{4})'],
  ['yy', '(?<yy>\\d{2})'],
  ['MM', '(?<MM>\\d{2})'],
  ['M', '(?<M>\\d{1,2})'],
  ['dd', '(?<dd>\\d{2})'],
  ['d', '(?<d>\\d{1,2})'],
  ['HH', '(?<HH>\\d{2})'],
  ['H', '(?<H>\\d{1,2})'],
  ['mm', '(?<mm>\\d{2})'],
  ['m', '(?<m>\\d{1,2})'],
  ['ss', '(?<ss>\\d{2})'],
  ['s', '(?<s>\\d{1,2})'],
]

const DATE_FORMAT_TOKEN_REGEX = new RegExp(DATE_FORMAT_TOKENS.map(([token]) => token).join('|'), 'g')

const TIME_ONLY_TOKENS = new Set(['HH', 'H', 'mm', 'm', 'ss', 's'])

/**
 * Выводит формат "только дата" из формата даты-и-времени — отрезает время и разделитель перед
 * ним (например, `'dd.MM.yyyy HH:mm:ss'` → `'dd.MM.yyyy'`). Порядок день/месяц/год у полей
 * "дата" и "дата-время" на одном портале Bitrix24 всегда согласован — различается только
 * наличие `HH:mm:ss`, поэтому нет смысла заставлять вызывающего передавать оба формата и
 * держать их в синхроне вручную.
 */
export function deriveDateOnlyFormat(dateTimeFormat: string): string {
  DATE_FORMAT_TOKEN_REGEX.lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = DATE_FORMAT_TOKEN_REGEX.exec(dateTimeFormat)) !== null) {
    if (TIME_ONLY_TOKENS.has(match[0])) {
      // Отрезаем любой разделитель перед временем, включая буквенный (например 'T' в ISO-стиле
      // 'dd.MM.yyyyTHH:mm:ss'), а не только пунктуацию — останавливаемся на последнем символе,
      // который реально относится к токенам даты (y/M/d).
      const datePart = dateTimeFormat.slice(0, match.index).replace(/[^yMd]+$/, '')
      return datePart || dateTimeFormat
    }
  }

  return dateTimeFormat
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Форматы дат, которые Bitrix24 реально присылает в разных методах REST и на разных
 * порталах — формат даты/времени в ответе зависит от настроек портала (Настройки → формат
 * даты и времени), поэтому один захардкоженный шаблон не универсален. Если явный `format`,
 * переданный в toDate(), не совпал со значением, перед тем как считать строку невалидной,
 * пробуем эти варианты по очереди — они не пересекаются по разделителям/порядку токенов,
 * так что ложных совпадений не будет.
 */
const FALLBACK_DATE_FORMATS = [
  'dd.MM.yyyy HH:mm:ss',
  'yyyy-MM-dd HH:mm:ss',
  'dd.MM.yyyy',
  'yyyy-MM-dd',
]

/**
 * Разбирает строку даты по простому шаблону (yyyy, MM, dd, HH, mm, ss и их однобуквенные
 * варианты, например 'dd.MM.yyyy HH:mm:ss'). Разделители между токенами берутся из шаблона
 * как есть. Не поддерживает локали, названия месяцев и часовые пояса — для REST-ответов
 * Bitrix24 они не требуются, значения всегда приходят в фиксированном числовом виде.
 */
function parseDateWithFormat(val: string, format: string): Date | null {
  const tokenMap = new Map(DATE_FORMAT_TOKENS)
  let pattern = ''
  let lastIndex = 0
  let match: RegExpExecArray | null

  DATE_FORMAT_TOKEN_REGEX.lastIndex = 0
  while ((match = DATE_FORMAT_TOKEN_REGEX.exec(format)) !== null) {
    pattern += escapeRegExp(format.slice(lastIndex, match.index))
    pattern += tokenMap.get(match[0])
    lastIndex = match.index + match[0].length
  }
  pattern += escapeRegExp(format.slice(lastIndex))

  const result = new RegExp(`^${pattern}$`).exec(val)
  if (!result?.groups) {
    return null
  }

  const g = result.groups
  const year = g['yyyy'] ? Number(g['yyyy']) : g['yy'] ? 2000 + Number(g['yy']) : new Date().getFullYear()
  const month = Number(g['MM'] ?? g['M'] ?? 1)
  const day = Number(g['dd'] ?? g['d'] ?? 1)
  const hour = Number(g['HH'] ?? g['H'] ?? 0)
  const minute = Number(g['mm'] ?? g['m'] ?? 0)
  const second = Number(g['ss'] ?? g['s'] ?? 0)

  // Токены — это просто "N цифр", без проверки диапазона (regex не отличит "13" месяца от
  // "13" дня). Без этой проверки new Date() молча "перекатывает" переполнение на соседний
  // месяц/год (например, месяц=13 → январь следующего года) вместо того, чтобы считать
  // строку невалидной.
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59 || second > 59) {
    return null
  }

  const date = new Date(year, month - 1, day, hour, minute, second)
  return isNaN(date.getTime()) ? null : date
}

/**
 * Последний резервный разбор — без знания конкретного формата. Работает только для чисто
 * числовых дат (никаких названий месяцев/дней — для этого нужны locale-таблицы, а это как
 * раз тот вес, ради ухода от которого luxon был убран из зависимостей).
 *
 * Идея: год — единственный сегмент длиной ровно 4 цифры, поэтому его позиция (первый или
 * последний из трёх сегментов даты) однозначно опознаётся при любом разделителе (`.`, `-`,
 * `/`, пробел...). Месяц по всем распространённым в мире соглашениям (ISO `yyyy-MM-dd` и
 * европейское `dd.MM.yyyy`) стоит между годом и днём, поэтому берётся как средний сегмент.
 * Время, если есть, всегда идёт как `HH:mm:ss` — этот порядок универсален.
 *
 * Не решает и не пытается решить неоднозначность день/месяц в чисто числовых форматах вида
 * `MM/dd/yyyy` (США), где оба сегмента могут быть ≤12 — угадывать это без знания локали
 * значило бы иногда молча путать день с месяцем, что хуже явной ошибки.
 */
function parseDateHeuristically(val: string): Date | null {
  const parts = val.match(/\d+/g)
  if (!parts || parts.length < 3 || parts.length > 6) {
    return null
  }

  const [d0, d1, d2, ...timeParts] = parts
  const dateParts = [d0, d1, d2]
  const yearIdx = dateParts.findIndex(p => p.length === 4)
  // Год должен быть однозначно найден (ровно 4 цифры) и стоять с края, а не в середине —
  // иначе позиция месяца/дня не определить безопасно.
  if (yearIdx !== 0 && yearIdx !== 2) {
    return null
  }

  const year = Number(dateParts[yearIdx])
  const month = Number(dateParts[1])
  const day = Number(dateParts[yearIdx === 0 ? 2 : 0])
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null
  }

  const [hh, mm, ss] = timeParts
  const hour = hh !== undefined ? Number(hh) : 0
  const minute = mm !== undefined ? Number(mm) : 0
  const second = ss !== undefined ? Number(ss) : 0
  if (hour > 23 || minute > 59 || second > 59) {
    return null
  }

  const date = new Date(year, month - 1, day, hour, minute, second)
  return isNaN(date.getTime()) ? null : date
}

/**
 * Преобразует значение в дату.
 *
 * Если передан `format`, но значение ему не соответствует (см. FALLBACK_DATE_FORMATS —
 * актуально для полей, где Bitrix24 отдаёт дату в формате, настроенном на портале, а не в
 * том, что захардкожен в маппере), перед тем как считать значение невалидным, делаются ещё
 * две попытки: другие распространённые форматы Bitrix24, а затем — позиционная эвристика
 * (см. parseDateHeuristically), которая распознаёт практически любой чисто числовой формат
 * даты независимо от разделителя. Если приложению точно известен формат конкретного портала,
 * его стоит передавать явным `format` — это всегда приоритетнее угадывания.
 */
export function toDate(val: number | string | Date, format?: string, opt?: ToDateOptions, throwError = true): Date {
  if (val instanceof Date) {
    return val
  } else if (typeof val === 'string') {
    if (format) {
      const parsed = parseDateWithFormat(val, format)
      if (parsed) {
        return parsed
      }

      for (const fallbackFormat of FALLBACK_DATE_FORMATS) {
        if (fallbackFormat === format) continue
        const fallbackParsed = parseDateWithFormat(val, fallbackFormat)
        if (fallbackParsed) {
          return fallbackParsed
        }
      }

      const heuristicParsed = parseDateHeuristically(val)
      if (heuristicParsed) {
        return heuristicParsed
      }
    } else {
      return new Date(val)
    }
  } else if (typeof val === 'number') {
    return new Date(val)
  }

  if (throwError) {
    console.error('Wrong date format', val, format)
    throw new Error('Wrong date format')
  }

  return new Date()
}

/**
 * Преобразует дату в строку с учетом временной зоны
 *
 * @param date
 * @param throwError
 */
export function toISOStringWithTimezone(date: Date, throwError = true): string {
  if (!(date instanceof Date)) {
    if (throwError) throw new Error('Invalid value: not a valid Date object')
    return ''
  }

  const tzOffset = -date.getTimezoneOffset()
  const diff = tzOffset >= 0 ? '+' : '-'
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0')
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60)
}

/**
 * Преобразует значение в булево значение
 *
 * @param val
 * @param throwError
 */
export function toBool(val: any, throwError = true): boolean {
  switch (typeof val) {
    case 'string':
      val = val.toLowerCase()
      if (val === 'n' || val === 'y') { // битриксовые понятия о bool
        return val === 'y'
      } else if (val === 'true' || val === 'false') { // битриксовые понятия о bool
        return val === 'true'
      } else {
        if (throwError) throw new Error('Invalid value: cannot be converted to boolean')
        return false
      }
    default:
      return Boolean(val)
  }
}

/**
 * Преобразует булево значение в 'Y' или 'N'
 *
 * @param val
 */
export function toBXYorN(val: boolean): string {
  return val ? 'Y' : 'N'
}

export function getBaseUrlHttps(url: string, component = false): string {
  if (component) {
    return encodeURI(cropUrl(url) + '/')
  } else {
    return encodeURI('https://' + cropUrl(url) + '/')
  }
}

/**
 * Обрезает URL (удаляет протокол)
 *
 * @param url
 */
export function cropUrl(url: string): string {
  url = url ? url.replace('https://', '') : ''
  url = url ? url.replace('http://', '') : ''
  url = url ? url.replace('https:', '') : ''
  url = url ? url.replace('http:', '') : ''
  return url
}

/**
 * Преобразует файл в base64
 *
 * @param file
 */
export function getBase64File(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

/**
 * Получить файл в формате base64 с разбивкой на заголовок и данные
 *
 * @param file
 */
export async function getBase64FileLikeStr(file: File): Promise<{
  header: string,
  val: string
} | undefined> {
  const result = await getBase64File(file)
  if (typeof result === 'string') {
    const split = result.split(',')
    return {
      header: split[0],
      val: split[1]
    }
  }
  return undefined
}

export function prepareBaseAddress(url: string, add: string | undefined = '') {
  // if (url.search('https://') !== 0 && url.search('http://')) {
  //   url = 'https://' + url
  // }

  if (add && add.length > 0) {
    if (url.lastIndexOf('/') !== (url.length - 1)) {
      url = url + '/'
    }

    url = url + add
  }

  if (url.lastIndexOf('/') !== (url.length - 1)) {
    url = url + '/'
  }

  return url
}