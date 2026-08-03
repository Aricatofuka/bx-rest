/** Значение, которое можно сохранить в настройках приложения. */
export type iBXRestOptionValue =
  | string
  | number
  | boolean
  | null
  | iBXRestOptionValue[]
  | { [key: string]: iBXRestOptionValue }

/** Набор именованных настроек приложения или пользователя. */
export type iBXRestOptionValues = Record<string, iBXRestOptionValue>

/** Параметры `app.option.set`. */
export interface iBXRestParamAppOptionSet {
  /** Настройки: ключ — имя свойства, значение — сохраняемые данные. */
  options: iBXRestOptionValues
}

/** Параметры `app.option.get`. */
export interface iBXRestParamAppOptionGet {
  /** Имя свойства. Если не указано, метод вернет все настройки приложения. */
  option?: string
}

/** Результат чтения одной настройки или всего набора настроек. */
export type iBXRestOptionGetResult = iBXRestOptionValue | iBXRestOptionValues
