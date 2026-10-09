import { iBXRestSettings } from './typification/settings'

export const DEFAULT_BX_REST_SETTINGS: iBXRestSettings = {
  auth: {
    source: 'cookies',
    key: 'auth'
  },
  urls: {
    source: 'localStorage',
    key: '',
    additional_part: 'rest'
  }
}

export const BXRestSettings = {
  value: {
    auth: {
      source: 'cookies',
      key: 'auth',
    },
    urls: {
      source: 'localStorage',
      key: '',
      additional_part: 'rest',
    },
  } as iBXRestSettings,

  /**
   * @deprecated Переименовано в `BXRestSettings.value` — имя `date` не
   * отражало содержимое (настройки auth/urls, а не дату) и сбивало с толку
   * в публичном API. Геттер/сеттер оставлен только для обратной совместимости
   * с кодом, написанным против API до 1.0.
   */
  get date(): iBXRestSettings {
    return this.value
  },
  set date(newValue: iBXRestSettings) {
    this.value = newValue
  },

  update(newSettings: Partial<iBXRestSettings>): void {
    this.value = { ...this.value, ...newSettings }
  },
}