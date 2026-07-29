# bx-rest - Bitrix24 REST API client for TypeScript, Angular, Vue and React

`bx-rest` is a TypeScript SDK for the Bitrix24 REST API. It helps call BX24 REST methods, work with auth tokens, sessid, OAuth2, pagination, mappers and typed API requests.

Also known as: Bitrix24 REST client, BX24 REST SDK, Bitrix24 API client, Bitrix REST TypeScript library.

## Install

```shell
npm install bx-rest
```

## Quick Start

Configure the portal URL and an access-token source once, then create a client and subscribe to the returned RxJS `Observable`. Use a complete URL including `https://`.

```typescript
import { firstValueFrom } from 'rxjs'
import { BXRestNavvy, BXRestSettings } from 'bx-rest'

const accessToken = 'YOUR_ACCESS_TOKEN'

BXRestSettings.update({
  auth: {
    source: () => accessToken,
    key: 'auth'
  },
  urls: {
    source: 'string',
    key: 'https://example.bitrix24.com',
    additional_part: 'rest'
  }
})

const bxRest = new BXRestNavvy()

const deals = await firstValueFrom(
  bxRest.crm.deal.list({
    select: ['ID', 'TITLE'],
    filter: {},
    start: 0
  }).res()
)

console.log(deals)
```

Do not hardcode or commit a production access token. Pass it from your application's authorization flow, server response or secure runtime configuration.

### Result modes

REST calls are lazy: the request starts when the returned `Observable` is subscribed to or passed to `firstValueFrom`.

| Method | Result |
| --- | --- |
| `.res()` | Unwraps the Bitrix response and applies the configured mapper. For paginated methods it returns the current page. |
| `.resAll()` | Loads and combines every page. Available on paginated Navvy helpers. |
| `.resVanilla()` | Returns the raw Bitrix response, including fields such as `result`, `total` and `next`. |
| `.mapForVanilla()` | Keeps the raw response envelope but applies the mapper to its `result`. |

## Authentication and OAuth2

`auth.source` controls where credentials are read from. `auth.key` controls the request parameter name, except for the special `OAuth2` cookie-credentials mode.

| Scenario | `auth.source` | `auth.key` | Behaviour |
| --- | --- | --- | --- |
| Access token from application state | `() => accessToken` | `auth` | Calls the function before each request and sends its value in the `auth` parameter. Recommended for OAuth2 access tokens managed by the application. |
| Access token in local storage | `localStorage` | `auth` | Reads `localStorage["auth"]` and sends it as `auth`. |
| Access token in a cookie | `cookies` | `auth` | Reads the `auth` cookie and sends it as `auth`. |
| Embedded Bitrix page / local session | `cookies` | `sessid` | Tries `window.BX.bitrix_sessid()`, the `sessid` query parameter, `localStorage.sessid`, then the `auth` cookie. Sends the resolved value as `sessid`. |
| Incoming webhook or URL that already contains authorization | `off` | Any value | Skips credential lookup and does not add an authorization parameter. |
| Cookie-based credential request | Any source returning a non-empty value | `OAuth2` | Does not append the resolved value to request params and enables Axios `withCredentials`. Use only when the portal and CORS policy support credential cookies. |

For a regular Bitrix OAuth2 `access_token`, use `auth.key: 'auth'` and provide the current token through a function or `localStorage`. The special `auth.key: 'OAuth2'` mode is for credential cookies; it does not send an OAuth access token by itself.

For an incoming webhook URL, keep the full webhook path in `urls.key`, set `additional_part` to an empty string and disable additional authorization:

```typescript
BXRestSettings.update({
  auth: {
    source: 'off',
    key: 'auth'
  },
  urls: {
    source: 'string',
    key: 'https://example.bitrix24.com/rest/1/WEBHOOK_CODE',
    additional_part: ''
  }
})
```

## Usage in Angular

Register the public clients and `Navvy` when you want to inject them into Angular services or components:

```typescript
import { ApplicationConfig, Provider } from '@angular/core'
import {
  BXRestMap,
  BXRestNavvy,
  BXRestRequest,
  Navvy
} from 'bx-rest'

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

export const appConfig: ApplicationConfig = {
  providers: [
    BXRestNavvyProvider,
    BXRestMapProvider,
    BXRestRequestProvider,
    NavvyProvider
  ]
}
```

Example component:

```typescript
import { Component, inject } from '@angular/core'
import { BXRestNavvy } from 'bx-rest'

@Component({
  selector: 'app-list',
  template: ''
})
export class ListComponent {
  private readonly bxRest = inject(BXRestNavvy)

  readonly listElements$ = this.bxRest.lists.element.get({
    IBLOCK_TYPE_ID: 'lists',
    IBLOCK_ID: 150,
    FILTER: {
      '>ID': 0
    }
  }).res()
}
```

## SessionKeyServices

`SessionKeyServices` is available from the public API and can be used when you need to inspect the current authorization data before making REST requests.

```typescript
import { BXRestSettings, SessionKeyServices, SessionKeyError } from 'bx-rest'

BXRestSettings.update({
  auth: {
    source: 'cookies',
    key: 'auth'
  },
  urls: {
    source: 'string',
    key: 'https://example.bitrix24.com',
    additional_part: 'rest'
  }
})

const session = new SessionKeyServices()

const auth = session.getAuthParams()
const authKey = session.getKeyAuth()

if (!auth && session.getCheckAuthParamsIsOn()) {
  const error = session.getAuthError('manual auth check')
  if (error instanceof SessionKeyError) {
    console.error(error.message)
  }
  throw error
}

session.getBaseUrl().subscribe((baseUrl) => {
  if (!baseUrl) {
    throw session.getBaseUrlError('manual base url check')
  }

  console.log({ authKey, auth, baseUrl })
})
```

## Usage in Vue

```typescript
import type { Plugin } from 'vue'
import { BXRestSettings, BXRestMap, BXRestNavvy, BXRestRequest } from 'bx-rest'

const bxRestPlugin: Plugin = {
  install(app) {
    BXRestSettings.update({
      auth: {
        source: 'cookies',
        key: 'auth'
      },
      urls: {
        source: 'string',
        key: 'https://example.bitrix24.com',
        additional_part: 'rest'
      }
    })

    app.config.globalProperties.$bxRestNavvy = new BXRestNavvy()
    app.config.globalProperties.$bxRestMap = new BXRestMap()
    app.config.globalProperties.$bxRestRequest = new BXRestRequest()
  }
}

export default bxRestPlugin
```

```vue
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import bxRestPlugin from './bxRestPlugin'

const app = createApp(App)

app.use(bxRestPlugin)

app.mount('#app')
```

## Usage in React

Create the client outside the component and unsubscribe when the component is unmounted:

```tsx
import { useEffect, useState } from 'react'
import { BXRestNavvy } from 'bx-rest'

const bxRest = new BXRestNavvy()

export function Deals() {
  const [deals, setDeals] = useState<unknown[]>([])

  useEffect(() => {
    const subscription = bxRest.crm.deal.list({
      select: ['ID', 'TITLE'],
      filter: {},
      start: 0
    }).res().subscribe({
      next: value => setDeals(value ?? []),
      error: error => console.error(error)
    })

    return () => subscription.unsubscribe()
  }, [])

  return <pre>{JSON.stringify(deals, null, 2)}</pre>
}
```

## Custom REST methods

`Navvy` is exported from `bx-rest`. In Angular, register the `NavvyProvider` shown above and inject `Navvy` into your custom API service. A method URL is represented as an array and is joined with dots before the request is sent.

See the [Bitrix24 documentation](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=99&LESSON_ID=7985) for registering custom REST methods.

### Mapper

A mapper is a regular function. It does not need to extend `BXRestMap`.

```typescript
import {
  iBXRestCustomBlogGet,
  iBXRestCustomBlogGetHttp
} from '../type/blog'

export class BXCustomBlogMap {
  static get(
    value: iBXRestCustomBlogGetHttp[] | undefined
  ): iBXRestCustomBlogGet[] {
    return (value ?? []).map(item => ({
      id: Number(item.ID),
      title: item.TITLE
    }))
  }
}
```

### A custom method with `simple()`

Use `simple()` when the method returns one response without automatic pagination:

```typescript
import { inject, Injectable } from '@angular/core'
import { Navvy, partNameMethods as PNM } from 'bx-rest'
import { BXCustomBlogMap } from '../map/blog'
import {
  iBXRestCustomBlogGet,
  iBXRestCustomBlogGetHttp,
  iBXRestCustomParamBlogGet
} from '../type/blog'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyCustomApiBlog {
  private readonly url = {
    get: ['blog', PNM.$get]
  }

  private readonly navvy = inject(Navvy)

  get(param: iBXRestCustomParamBlogGet) {
    return this.navvy.simple<
      iBXRestCustomBlogGetHttp[],
      iBXRestCustomBlogGet[],
      iBXRestCustomParamBlogGet
    >(
      this.url.get,
      param,
      BXCustomBlogMap.get
    )
  }
}
```

The returned helper supports `.res()`, `.resVanilla()` and `.mapForVanilla()`.

### A paginated custom method with `pagNav()`

Use `pagNav()` when the Bitrix response contains an array and standard `start`, `next` and `total` pagination fields. The parameter type must support `start?: number`.

```typescript
import { inject, Injectable } from '@angular/core'
import { Navvy, partNameMethods as PNM } from 'bx-rest'
import type { iBXRestPagination } from 'bx-rest/typification/base'
import { BXCustomBlogMap } from '../map/blog'
import {
  iBXRestCustomBlogGet,
  iBXRestCustomBlogGetHttp
} from '../type/blog'

export interface iBXRestCustomParamBlogList extends iBXRestPagination {
  filter?: Record<string, unknown>
}

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyCustomApiBlogList {
  private readonly url = {
    list: ['blog', PNM.$list]
  }

  private readonly navvy = inject(Navvy)

  list(param: iBXRestCustomParamBlogList) {
    return this.navvy.pagNav<
      iBXRestCustomBlogGetHttp,
      iBXRestCustomBlogGet,
      iBXRestCustomParamBlogList
    >(
      this.url.list,
      param,
      BXCustomBlogMap.get
    )
  }
}
```

The returned helper additionally supports `.resAll()` for loading and combining all pages.

## Specific methods

### `tasks.task.list`

The first generic argument selects built-in task fields. The second adds project-specific user fields:

```typescript
import { BXRestNavvy } from 'bx-rest'
import type { iBXRestTaskFieldsName } from 'bx-rest/typification/tasks'

type SelectedTaskField = Extract<
  iBXRestTaskFieldsName,
  'ID' | 'TITLE' | 'GROUP_ID' | 'TIME_ESTIMATE' | 'CREATED_DATE' | 'CLOSED_DATE' | 'DURATION_FACT' | 'TIME_SPENT_IN_LOGS'
>

type CustomTaskFields = {
  ufListDiscipline: string
  ufListSubdiscipline: string
  ufList1: string
}

const selectedTaskFields: SelectedTaskField[] = [
  'ID',
  'TITLE',
  'GROUP_ID',
  'CREATED_DATE'
]

const selectedCustomFields = [
  'UF_LIST_DISCIPLINE',
  'UF_LIST_SUBDISCIPLINE',
  'UF_LIST_1'
] as const

const bxRest = new BXRestNavvy()

const tasks$ = bxRest.tasks.task.list<
  SelectedTaskField[],
  CustomTaskFields
>({
  order: {
    ID: 'DESC'
  },
  filter: {
    CREATED_BY: [1]
  },
  select: [...selectedTaskFields, ...selectedCustomFields],
  start: 0
}).res()
```

## Future features
- Auto get token
- Mappers for normalization types
- 100% coverage
