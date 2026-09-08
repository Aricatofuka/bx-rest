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
      'Данные сохраняются только в localStorage вашего браузера и используются исключительно для запросов к указанному порталу.',
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
    callLabel: id => `Результат #${id}`
  },
  recipes: {
    dealList: { title: 'Список сделок', description: 'crm.deal.list — типизированные select/filter, как в разделе «Быстрый старт»' },
    contactAdd: { title: 'Добавить контакт', description: 'crm.contact.add — создание записи, ответ — ID нового контакта' },
    tasksPaginated: { title: 'Пагинация задач (resAll)', description: 'tasks.task.list — resAll() сам склеит все страницы в один массив' },
    errorHandling: { title: 'Обработка ошибок API', description: '{ throwOnApiError: true } — ошибка Bitrix попадёт в error, а не резолвится как undefined' }
  },
  errors: {
    storageUnavailable:
      'Не удалось сохранить настройки в браузере — возможно, включён приватный режим или хранилище отключено. Подробности — в консоли (F12).'
  },
  toast: {
    close: 'Закрыть'
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
    privacyHint: "Stored only in your browser's localStorage and used solely for requests to the portal above.",
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
    callLabel: id => `Result #${id}`
  },
  recipes: {
    dealList: { title: 'List deals', description: 'crm.deal.list — typed select/filter, same as in the "Quick Start" section' },
    contactAdd: { title: 'Add a contact', description: 'crm.contact.add — creates a record, returns the new contact ID' },
    tasksPaginated: { title: 'Paginated tasks (resAll)', description: 'tasks.task.list — resAll() stitches every page into one array for you' },
    errorHandling: { title: 'API error handling', description: '{ throwOnApiError: true } — a Bitrix-level error lands in error instead of resolving as undefined' }
  },
  errors: {
    storageUnavailable:
      "Couldn't save settings in the browser — private/incognito mode or disabled storage is a likely cause. See the console (F12) for details."
  },
  toast: {
    close: 'Close'
  }
}

export const STRINGS: Record<Locale, Strings> = { ru, en }

/** Строки для текущего языка — вычисляются один раз при загрузке модуля. */
export const t: Strings = STRINGS[detectLocale()]

/** Определённый при загрузке язык — пригодится, если понадобится что-то ещё завязать на локаль (например, recipes()). */
export const locale: Locale = detectLocale()
