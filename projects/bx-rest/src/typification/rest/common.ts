/** Параметры проверки REST-метода через `method.get`. */
export interface iBXRestParamMethodGet {
  /** Имя метода в нижнем регистре, например `user.get`. */
  name: string
}

/** Результат проверки REST-метода через `method.get`. */
export interface iBXRestMethodAvailability {
  /** Метод существует на портале. */
  isExisting: boolean
  /** Метод доступен с текущими разрешениями приложения. */
  isAvailable: boolean
}

/** Параметры получения разрешений через `scope`. */
export interface iBXRestParamScope {
  /** Вернуть полный список разрешений портала, а не только разрешения приложения. */
  full?: boolean
}

/** Параметры получения названий кодов доступа через `access.name`. */
export interface iBXRestParamAccessName {
  /** Коды доступа, например `G2` и `AU`. */
  ACCESS: string[]
}

/** Описание кода доступа, возвращаемое методом `access.name`. */
export interface iBXRestAccessDescription {
  /** Название поставщика права. */
  provider: string
  /** Человекочитаемое название права. */
  name: string
  /** Идентификатор поставщика права. */
  provider_id: string
}

/** Результат `access.name`, индексированный исходными кодами доступа. */
export type iBXRestAccessNameResult = Record<string, iBXRestAccessDescription>

/** Поддерживаемые документацией коды `feature.get`. */
export type iBXRestFeatureCode =
  /** Доступность офлайн-событий. */
  | 'rest_offline_extended'
  /** Доступность ключа `auth_connector` в событиях. */
  | 'rest_auth_connector'

/** Параметры проверки функционала через `feature.get`. */
export interface iBXRestParamFeatureGet {
  /** Код проверяемой возможности портала. */
  CODE: iBXRestFeatureCode
}

/** Основной результат проверки функционала через `feature.get`. */
export interface iBXRestFeatureAvailabilityBase {
  /** Признак наличия функционала: `Y` — доступен, `N` — недоступен. */
  value: 'Y' | 'N'
}

/**
 * Результат проверки функционала через `feature.get`.
 *
 * Коробочная версия может дополнительно вернуть языковой флаг, например
 * `ru_selfhosted`; `lang` в документации заменяется кодом языка портала.
 */
export type iBXRestFeatureAvailability = iBXRestFeatureAvailabilityBase
  & Partial<Record<`${string}_selfhosted`, 'Y' | 'N'>>

/** Расширяемый объект ответа для REST-модулей без стабильной схемы результата. */
export type iBXRestGenericObject = Record<string, unknown>

/** Расширяемый набор параметров для специализированных REST-методов. */
export type iBXRestGenericParams = Record<string, unknown>
