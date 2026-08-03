import { iBXRestOptionValues } from '../app/option'

/** Параметры `user.option.set`. */
export interface iBXRestParamUserOptionSet {
  /** Настройки: ключ — имя свойства, значение — данные текущего пользователя. */
  options: iBXRestOptionValues
}

/** Параметры `user.option.get`. */
export interface iBXRestParamUserOptionGet {
  /** Имя свойства. Если не указано, метод вернет все настройки пользователя. */
  option?: string
}

/** Параметры проверки прав текущего пользователя через `user.access`. */
export interface iBXRestParamUserAccess {
  /** Один или несколько кодов доступа, наличие которых требуется проверить. */
  ACCESS: string | string[]
}
