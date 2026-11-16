// Двуязычный интерфейс демо: русский, если язык браузера/ОС русский,
// иначе английский. У браузерного SPA нет прямого доступа к языку Windows в
// обход настроек браузера — если в самом браузере интерфейс/список языков
// переключён на английский, страница физически не может узнать, что ОС
// на самом деле русская (такого API в вебе не существует). Поэтому смотрим
// сразу несколько сигналов и считаем язык русским, если он русский хотя бы
// в одном из них — это охватывает частый случай "Windows русская, но в
// браузер добавлен ещё и английский язык вторым/третьим в списке".
export type Locale = 'ru' | 'en'

export function detectLocale(): Locale {
  const candidates: string[] = []

  if (typeof navigator !== 'undefined') {
    if (navigator.language) candidates.push(navigator.language)
    if (navigator.languages) candidates.push(...navigator.languages)
  }

  try {
    candidates.push(Intl.DateTimeFormat().resolvedOptions().locale)
  } catch {
    // Intl недоступен/не поддерживает resolvedOptions — не критично, у нас
    // уже есть navigator.language(s) выше.
  }

  return candidates.some(lang => lang?.toLowerCase().startsWith('ru')) ? 'ru' : 'en'
}

export interface AuthModeStrings {
  label: string
  hint: string
}

export interface Strings {
  app: {
    title: (framework: string) => string
    subtitle: string
  }
  connection: {
    authModeLabel: string
    portalUrlLabel: string
    portalUrlPlaceholder: string
    tokenLabel: string
    tokenPlaceholder: string
    webhookLabel: string
    webhookPlaceholder: string
    noValueNeeded: string
    connectButton: string
    reconnectButton: string
    privacyHint: string
    appliedStatus: string
    modes: Record<AuthModeId, AuthModeStrings>
  }
  editor: {
    runButton: string
    connectFirstHint: string
  }
  results: {
    heading: string
    empty: string
    status: Record<'pending' | 'next' | 'error' | 'complete', string>
    callLabel: (id: number) => string
    itemCount: (count: number) => string
  }
  recipes: {
    dealList: { title: string; description: string }
    contactAdd: { title: string; description: string }
    tasksPaginated: { title: string; description: string }
    errorHandling: { title: string; description: string }
  }
  errors: {
    storageUnavailable: string
  }
  toast: {
    close: string
  }
  methodCheck: {
    tabSandbox: string
    tabCheck: string
    heading: string
    intro: string
    writeLabel: string
    writeWarning: string
    startButton: string
    stopButton: string
    downloadButton: string
    downloadCsvButton: string
    detailsHint: string
    details: {
      address: string
      httpStatus: string
      kind: string
      params: string
      response: string
      mapped: string
      stack: string
      copy: string
      copied: string
      notStored: string
    }
    connectFirstHint: string
    progress: (done: number, total: number) => string
    current: (method: string) => string
    stopping: string
    summaryHeading: string
    filterLabel: string
    filterAll: string
    searchLabel: string
    topCodesHeading: string
    columns: { method: string, phase: string, status: string, details: string, ms: string }
    paginator: {
      itemsPerPage: string
      firstPage: string
      previousPage: string
      nextPage: string
      lastPage: string
      range: (start: number, end: number, total: number) => string
    }
    phases: Record<'read' | 'add' | 'update' | 'delete' | 'other', string>
    statuses: Record<'pending' | 'ok' | 'mapping' | 'api-error' | 'error' | 'skipped', string>
    reasons: {
      stopped: string
      otherPhase: string
      noRequest: string
      notRun: string
      noScenario: string
      writeOff: string
      noParams: string
      needs: (scenario: string) => string
      noCreatedId: string
      addFailed: string
      clientThrew: string
      notRest: string
      mapperThrew: string
      notRequest: string
    }
  }
}

export type AuthModeId =
  | 'token-function'
  | 'token-localStorage'
  | 'token-cookie'
  | 'webhook'
  | 'embedded-sessid'
  | 'oauth2-cookie'

const ru: Strings = {
  app: {
    title: framework => `bx-rest — демо (${framework})`,
    subtitle:
      'Подключитесь к своему порталу Bitrix24, выберите готовый пример или напишите свой — Monaco подскажет методы bxRest.* по типам библиотеки.'
  },
  connection: {
    authModeLabel: 'Режим авторизации',
    portalUrlLabel: 'URL портала',
    portalUrlPlaceholder: 'https://example.bitrix24.ru',
    tokenLabel: 'Access-токен',
    tokenPlaceholder: 'YOUR_ACCESS_TOKEN',
    webhookLabel: 'URL входящего вебхука',
    webhookPlaceholder: 'https://example.bitrix24.ru/rest/1/webhookcode',
    noValueNeeded: 'Дополнительное значение не требуется',
    connectButton: 'Подключить',
    reconnectButton: 'Переподключить',
    privacyHint:
      'Подключение вместе с токеном или вебхуком сохраняется в localStorage этого браузера и используется только для запросов к указанному порталу. Подключайте тестовый портал: хранилище браузера доступно всем страницам этого домена.',
    appliedStatus: '✓ Настройки применены',
    modes: {
      'token-function': {
        label: 'Access-токен (функция)',
        hint: 'Токен хранится в состоянии приложения и передаётся функцией-источником — рекомендуемый способ для OAuth2 access-токенов.'
      },
      'token-localStorage': {
        label: 'Access-токен (localStorage)',
        hint: 'Токен читается из localStorage["auth"]. Демо само запишет туда введённое значение при подключении.'
      },
      'token-cookie': {
        label: 'Access-токен (cookie)',
        hint: 'Токен читается из cookie "auth" текущего сайта. Демо само запишет эту cookie на своём домене при подключении.'
      },
      webhook: {
        label: 'Входящий вебхук',
        hint: 'Полный URL вебхука, включая код — дополнительная авторизация не нужна.'
      },
      'embedded-sessid': {
        label: 'Встроенная сессия Bitrix (sessid)',
        hint: 'Работает только если это демо открыто внутри iframe Bitrix24 — sessid берётся автоматически из window.BX, localStorage или cookie.'
      },
      'oauth2-cookie': {
        label: 'OAuth2 через cookie',
        hint: 'Требует, чтобы портал и политика CORS поддерживали куки с учётными данными (withCredentials). Вне встроенного приложения обычно не работает — показан для полноты API.'
      }
    }
  },
  editor: {
    runButton: '▶ Запустить',
    connectFirstHint: 'Сначала подключитесь к порталу выше.'
  },
  results: {
    heading: 'Результат',
    empty: 'Нажмите «Запустить» — здесь появится ответ портала.',
    status: {
      pending: '⏳ Выполняется…',
      next: '✓ Успех',
      error: '✕ Ошибка',
      complete: '✓ Готово'
    },
    callLabel: id => `Результат #${id}`,
    itemCount: count => `элементов: ${count}`
  },
  recipes: {
    dealList: { title: 'Список сделок', description: 'crm.deal.list — типизированные select/filter, как в разделе «Быстрый старт»' },
    contactAdd: { title: 'Добавить контакт', description: 'crm.contact.add — создание записи, ответ — ID нового контакта' },
    tasksPaginated: { title: 'Пагинация задач (resAll)', description: 'tasks.task.list — resAll() сам склеит все страницы в один массив' },
    errorHandling: { title: 'Обработка ошибок API', description: 'Ошибка Bitrix приходит в error как BXRestApiError с кодом, HTTP-статусом и методом' }
  },
  errors: {
    storageUnavailable:
      'Не удалось сохранить настройки в браузере — возможно, включён приватный режим или хранилище отключено. Подробности — в консоли (F12).'
  },
  toast: {
    close: 'Закрыть'
  },
  methodCheck: {
    tabSandbox: 'Песочница',
    tabCheck: 'Проверка методов',
    heading: 'Проверка методов на портале',
    intro:
      'Вызывает методы клиента на подключённом портале и сверяет ответ с маппером. Сначала идут методы чтения, затем, если включено, добавление, изменение и удаление записей. Остальные методы пока не проверяются. Запросы идут через очередь: не больше двух в секунду.',
    writeLabel: 'Проверять запись',
    writeWarning:
      'Создаёт на портале лид, контакт, компанию, сделку с комментарием, задачу и событие календаря, меняет их и удаляет. В названии — «bx-rest check» и время запуска. Только для тестового портала.',
    startButton: '▶ Проверить',
    stopButton: '■ Остановить',
    downloadButton: 'Скачать отчёт (JSON)',
    downloadCsvButton: 'Скачать таблицу (CSV)',
    detailsHint: 'Нажмите на строку, чтобы увидеть параметры запроса и ответ портала.',
    details: {
      address: 'Адрес',
      httpStatus: 'HTTP-статус',
      kind: 'Класс запроса',
      params: 'Параметры запроса',
      response: 'Ответ портала',
      mapped: 'Результат маппера',
      stack: 'Стек',
      copy: 'Скопировать строку (JSON)',
      copied: 'Скопировано',
      notStored: 'У успешных запросов ответ не сохраняется'
    },
    connectFirstHint: 'Сначала подключитесь к порталу выше.',
    progress: (done, total) => `${done} из ${total}`,
    current: method => `Сейчас: ${method}`,
    stopping: 'Останавливается: созданные записи удаляются…',
    summaryHeading: 'Итог',
    filterLabel: 'Статус',
    filterAll: 'Все',
    searchLabel: 'Поиск по методу',
    topCodesHeading: 'Частые ошибки портала',
    columns: { method: 'Метод', phase: 'Фаза', status: 'Статус', details: 'Подробности', ms: 'мс' },
    paginator: {
      itemsPerPage: 'Строк на странице',
      firstPage: 'Первая страница',
      previousPage: 'Предыдущая страница',
      nextPage: 'Следующая страница',
      lastPage: 'Последняя страница',
      range: (start, end, total) => `${start}–${end} из ${total}`
    },
    phases: { read: 'Чтение', add: 'Добавление', update: 'Изменение', delete: 'Удаление', other: 'Другое' },
    statuses: {
      pending: 'Ожидает',
      ok: '✓ OK',
      mapping: '⚠ Маппер',
      'api-error': '✕ Ошибка портала',
      error: '✕ Ошибка',
      skipped: '— Пропущен'
    },
    reasons: {
      stopped: 'проверка остановлена',
      otherPhase: 'не чтение, не добавление, не изменение и не удаление: проверка появится позже',
      noRequest: 'метод не возвращает объект запроса: проверка появится позже',
      notRun: 'не запускался',
      noScenario: 'нет сценария записи',
      writeOff: 'проверка записи выключена',
      noParams: 'нечем заполнить обязательные параметры',
      needs: scenario => `не создана запись ${scenario}`,
      noCreatedId: 'в ответе нет идентификатора созданной записи',
      addFailed: 'запись не создана',
      clientThrew: 'метод клиента упал до запроса',
      notRest: 'ответ — не ответ REST API',
      mapperThrew: 'маппер упал',
      notRequest: 'метод не вернул объект запроса'
    }
  }
}

const en: Strings = {
  app: {
    title: framework => `bx-rest demo (${framework})`,
    subtitle:
      "Connect to your own Bitrix24 portal, pick a ready-made snippet or write your own — Monaco will suggest bxRest.* methods from the library's real types."
  },
  connection: {
    authModeLabel: 'Auth mode',
    portalUrlLabel: 'Portal URL',
    portalUrlPlaceholder: 'https://example.bitrix24.com',
    tokenLabel: 'Access token',
    tokenPlaceholder: 'YOUR_ACCESS_TOKEN',
    webhookLabel: 'Incoming webhook URL',
    webhookPlaceholder: 'https://example.bitrix24.com/rest/1/webhookcode',
    noValueNeeded: 'No additional value needed',
    connectButton: 'Connect',
    reconnectButton: 'Reconnect',
    privacyHint:
      "The connection, including the token or webhook, is saved in this browser's localStorage and used only for requests to the portal above. Connect a test portal: browser storage is shared by every page on this domain.",
    appliedStatus: '✓ Settings applied',
    modes: {
      'token-function': {
        label: 'Access token (function)',
        hint: "Kept in the app's own state and supplied via a source function — the recommended way for OAuth2 access tokens."
      },
      'token-localStorage': {
        label: 'Access token (localStorage)',
        hint: 'Read from localStorage["auth"]. The demo writes the value you enter there when you connect.'
      },
      'token-cookie': {
        label: 'Access token (cookie)',
        hint: "Read from this site's \"auth\" cookie. The demo writes that cookie on its own domain when you connect."
      },
      webhook: {
        label: 'Incoming webhook',
        hint: 'Full webhook URL including the code — no extra authentication needed.'
      },
      'embedded-sessid': {
        label: 'Embedded Bitrix session (sessid)',
        hint: 'Only works when this demo runs inside a Bitrix24 iframe — sessid is picked up automatically from window.BX, localStorage or a cookie.'
      },
      'oauth2-cookie': {
        label: 'OAuth2 via cookie',
        hint: 'Requires the portal and its CORS policy to support credentialed cookies (withCredentials). Usually not functional outside an embedded app — shown for API completeness.'
      }
    }
  },
  editor: {
    runButton: '▶ Run',
    connectFirstHint: 'Connect to a portal above first.'
  },
  results: {
    heading: 'Result',
    empty: 'Click "Run" — the portal response will appear here.',
    status: {
      pending: '⏳ Running…',
      next: '✓ Success',
      error: '✕ Error',
      complete: '✓ Done'
    },
    callLabel: id => `Result #${id}`,
    itemCount: count => `items: ${count}`
  },
  recipes: {
    dealList: { title: 'List deals', description: 'crm.deal.list — typed select/filter, same as in the "Quick Start" section' },
    contactAdd: { title: 'Add a contact', description: 'crm.contact.add — creates a record, returns the new contact ID' },
    tasksPaginated: { title: 'Paginated tasks (resAll)', description: 'tasks.task.list — resAll() stitches every page into one array for you' },
    errorHandling: { title: 'API error handling', description: 'A Bitrix error lands in error as a BXRestApiError with code, HTTP status and method' }
  },
  errors: {
    storageUnavailable:
      "Couldn't save settings in the browser — private/incognito mode or disabled storage is a likely cause. See the console (F12) for details."
  },
  toast: {
    close: 'Close'
  },
  methodCheck: {
    tabSandbox: 'Sandbox',
    tabCheck: 'Method check',
    heading: 'Check methods on the portal',
    intro:
      'Calls the client methods on the connected portal and checks each response against its mapper. Read methods go first, then, if enabled, adding, updating and deleting records. Other methods are not checked yet. Requests go through a queue, at most two per second.',
    writeLabel: 'Check writes',
    writeWarning:
      'Creates a lead, a contact, a company, a deal with a comment, a task and a calendar event on the portal, updates them and deletes them. Their names contain "bx-rest check" and the start time. For a test portal only.',
    startButton: '▶ Check',
    stopButton: '■ Stop',
    downloadButton: 'Download report (JSON)',
    downloadCsvButton: 'Download table (CSV)',
    detailsHint: 'Click a row to see the request parameters and the portal response.',
    details: {
      address: 'Address',
      httpStatus: 'HTTP status',
      kind: 'Request class',
      params: 'Request parameters',
      response: 'Portal response',
      mapped: 'Mapper result',
      stack: 'Stack',
      copy: 'Copy row (JSON)',
      copied: 'Copied',
      notStored: 'The response of a successful request is not stored'
    },
    connectFirstHint: 'Connect to a portal above first.',
    progress: (done, total) => `${done} of ${total}`,
    current: method => `Now: ${method}`,
    stopping: 'Stopping: deleting the created records…',
    summaryHeading: 'Summary',
    filterLabel: 'Status',
    filterAll: 'All',
    searchLabel: 'Search by method',
    topCodesHeading: 'Frequent portal errors',
    columns: { method: 'Method', phase: 'Phase', status: 'Status', details: 'Details', ms: 'ms' },
    paginator: {
      itemsPerPage: 'Rows per page',
      firstPage: 'First page',
      previousPage: 'Previous page',
      nextPage: 'Next page',
      lastPage: 'Last page',
      range: (start, end, total) => `${start}–${end} of ${total}`
    },
    phases: { read: 'Read', add: 'Add', update: 'Update', delete: 'Delete', other: 'Other' },
    statuses: {
      pending: 'Pending',
      ok: '✓ OK',
      mapping: '⚠ Mapper',
      'api-error': '✕ Portal error',
      error: '✕ Error',
      skipped: '— Skipped'
    },
    reasons: {
      stopped: 'the check was stopped',
      otherPhase: 'not a read, add, update or delete: to be checked later',
      noRequest: 'the method returns no request object: to be checked later',
      notRun: 'not run',
      noScenario: 'no write scenario',
      writeOff: 'write check is off',
      noParams: 'nothing to fill the required parameters with',
      needs: scenario => `no ${scenario} record was created`,
      noCreatedId: 'the response has no ID of the created record',
      addFailed: 'the record was not created',
      clientThrew: 'the client method threw before the request',
      notRest: 'the response is not a REST API response',
      mapperThrew: 'the mapper threw',
      notRequest: 'the method did not return a request object'
    }
  }
}

export const STRINGS: Record<Locale, Strings> = { ru, en }

/** Строки для текущего языка — вычисляются один раз при загрузке модуля. */
export const t: Strings = STRINGS[detectLocale()]

/** Определённый при загрузке язык — пригодится, если понадобится что-то ещё завязать на локаль (например, recipes()). */
export const locale: Locale = detectLocale()
