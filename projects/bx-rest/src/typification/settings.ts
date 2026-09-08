export interface iBXRestSettings {
  auth: {
    source: 'cookies' | 'localStorage' | 'off' | (() => string)
    key: 'auth' | 'sessid' | string
  },
  urls: {
    source: 'string' | 'localStorage'
    key: string | 'OAuth2'
    additional_part?: string
  }
  /**
   * Управляет axios-опцией `withCredentials` (прикладывать ли браузерные
   * cookie к запросу) независимо от `auth.key`. Если не задано — сохраняется
   * прежнее поведение: `withCredentials` включается только при
   * `auth.key === 'OAuth2'`. Явное значение здесь имеет приоритет — нужно,
   * например, когда `auth.source: 'off'` указывает на собственный прокси,
   * а браузер должен приложить cookie сессии этого прокси (не Bitrix24).
   */
  withCredentials?: boolean
}
