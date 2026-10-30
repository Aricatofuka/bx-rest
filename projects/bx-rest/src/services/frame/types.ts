export interface BXRestFrameOptions {
  /**
   * Сколько ждать ответа портала на команду, мс. По умолчанию 10000. Вне
   * iframe портала ответа не будет никогда. Диалоги и слайдеры ждут
   * пользователя без ограничения.
   */
  timeout?: number
}

/**
 * Авторизация приложения — в том же виде, что у `BX24.getAuth()`.
 */
export interface iBXRestFrameAuth {
  access_token: string
  refresh_token: string
  /**
   * Момент истечения `access_token` — миллисекунды с 1 января 1970 года,
   * как у `BX24.getAuth()`. Не срок жизни в секундах, как в ответе
   * OAuth-сервера! Сравнивайте с `Date.now()`.
   */
  expires_in: number
  /** Адрес портала без протокола, например `mycompany.bitrix24.ru`. */
  domain: string
  /** Постоянный идентификатор портала. */
  member_id: string
}

/**
 * Данные, которые портал передаёт приложению при запуске (`getInitData`), —
 * без токенов: их отдаёт `getAuth()`.
 */
export interface iBXRestFrameInit {
  /** Адрес портала без протокола — как `BX24.getDomain()`. */
  domain: string
  /** Язык интерфейса — как `BX24.getLang()`. */
  lang: string
  /** Путь к REST на портале, например `/rest`. */
  path: string
  /** Портал открыт по https. */
  https: boolean
  memberId: string
  /** Пользователь — администратор портала, как `BX24.isAdmin()`. */
  isAdmin: boolean
  /**
   * Страница открыта как установщик приложения: установку завершает
   * `installFinish()`.
   */
  install: boolean
  /**
   * Первый запуск приложения этим пользователем (этой версии). Портал
   * сообщает его только в первом ответе на `getInitData` за загрузку страницы.
   */
  firstRun: boolean
  /** Код встраивания, например `DEFAULT` или `CRM_DEAL_DETAIL_TAB`. */
  placement: string
  placementOptions: unknown
  userOptions: Record<string, unknown>
  appOptions: Record<string, unknown>
}

/** Размер фрейма, который выставил портал. */
export interface iBXRestFrameSize {
  width: number
  height: number
}

/** Сотрудник из диалога `selectUser()`/`selectUsers()`. */
export interface iBXRestFrameUser {
  /** Приходит строкой. */
  id: string
  name: string
  /** Работает в подразделении, подчинённом текущему пользователю. */
  sub: boolean
  /** Руководит подразделением текущего пользователя или вышестоящим. */
  sup: boolean
  position: string | null
  /** Путь к аватару относительно адреса портала. */
  photo: string
  url: string
}

/** Право доступа из диалога `selectAccess()`. */
export interface iBXRestFrameAccess {
  /** Источник кода: `intranet`, `socnetgroup`, `group`, ... */
  provider: string
  /** Код доступа, например `IU1`, `D5`, `SG4_K`. */
  id: string
  name: string
}

export type BXRestFrameCrmType = 'lead' | 'contact' | 'company' | 'deal' | 'quote'

export interface iBXRestFrameCrmSelectOptions {
  /** Какие типы объектов показывать. */
  entityType?: BXRestFrameCrmType[]
  /** Можно выбрать несколько объектов. */
  multiple?: boolean
  /** Объекты, отмеченные при открытии: идентификаторы по типам. */
  value?: Partial<Record<BXRestFrameCrmType, number[]>>
  signal?: AbortSignal
}

/** Объект CRM из диалога `selectCRM()`. */
export interface iBXRestFrameCrmEntity {
  /** С префиксом типа: `L_`, `C_`, `CO_`, `D_`, `Q_`. */
  id: string
  type: BXRestFrameCrmType
  place: string
  title: string
  desc: string
  url?: string
  image?: string
}

/** Результат `selectCRM()`: объекты по типам, внутри — под ключами `0`, `1`, ... */
export type iBXRestFrameCrmSelection = Partial<Record<BXRestFrameCrmType, Record<string, iBXRestFrameCrmEntity>>>

/** Результат `openPath()`. */
export interface iBXRestFrameOpenPathResult {
  /** `close` — пользователь закрыл слайдер; `error` — путь не открылся. */
  result: 'close' | 'error'
  /** `PATH_NOT_AVAILABLE` или `METHOD_NOT_SUPPORTED_ON_DEVICE`. */
  errorCode?: string
}

/** Команды и события текущего встраивания. */
export interface iBXRestFramePlacementInterface {
  command: string[]
  event: string[]
}

export interface iBXRestFramePlacementInfo {
  placement: string
  options: unknown
}
