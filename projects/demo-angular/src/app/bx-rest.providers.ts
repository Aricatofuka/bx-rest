// DI-провайдеры для bx-rest — как в README библиотеки, раздел
// «Использование в Angular»: обычные Provider-объекты с useFactory,
// регистрируются в ApplicationConfig.providers (см. app.config.ts).
import { Provider } from '@angular/core'
import { BXRestMap, BXRestNavvy, BXRestRequest, Navvy } from 'bx-rest'

export const BXRestNavvyProvider: Provider = {
  provide: BXRestNavvy,
  useFactory: () => new BXRestNavvy()
}

export const BXRestMapProvider: Provider = {
  provide: BXRestMap,
  useFactory: () => new BXRestMap()
}

export const BXRestRequestProvider: Provider = {
  provide: BXRestRequest,
  useFactory: () => new BXRestRequest()
}

export const NavvyProvider: Provider = {
  provide: Navvy,
  useFactory: () => new Navvy()
}
