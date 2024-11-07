import { iBXRestSettings } from './typification/settings'
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'
import { BX_REST_SETTINGS, DEFAULT_BX_REST_SETTINGS } from './settings'

export function provideBXRestSettings(config?: Partial<iBXRestSettings>): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: BX_REST_SETTINGS,
      useFactory: () => ({
        ...DEFAULT_BX_REST_SETTINGS,  // Стандартные значения
        ...config,  // Перезаписываем стандартные значения, если есть пользовательские
      })
    }
  ]);
}