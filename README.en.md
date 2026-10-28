<!-- This file is generated from projects/bx-rest/README.en.md by `npm run sync-readme`. Do not edit directly. -->

<img src="https://flagcdn.com/20x15/ru.png" width="20" height="15" alt="RU"> [Русский](README.md) | <img src="https://flagcdn.com/20x15/gb.png" width="20" height="15" alt="GB"> **English**

# bx-rest - Bitrix24 REST API client for TypeScript, Angular, Vue and React

[![npm version](https://img.shields.io/npm/v/bx-rest.svg)](https://www.npmjs.com/package/bx-rest)
[![npm downloads](https://img.shields.io/npm/dm/bx-rest.svg)](https://www.npmjs.com/package/bx-rest)
[![license](https://img.shields.io/npm/l/bx-rest.svg)](https://github.com/Aricatofuka/bx-rest/blob/main/LICENSE)

`bx-rest` is a TypeScript SDK for the Bitrix24 REST API. It helps call BX24 REST methods, work with auth tokens, sessid, OAuth2, pagination, mappers and typed API requests.

Also known as: Bitrix24 REST client, BX24 REST SDK, Bitrix24 API client, Bitrix REST TypeScript library.

## Contents

- [Install](#install)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
  - [Result modes](#result-modes)
- [Authentication and OAuth2](#authentication-and-oauth2)
  - [`withCredentials`](#withcredentials)
- [Error handling](#error-handling)
- [Usage in Angular](#usage-in-angular)
- [SessionKeyServices](#sessionkeyservices)
- [Usage in Vue](#usage-in-vue)
- [Usage in React](#usage-in-react)
- [Demo](#demo)
- [Custom REST methods](#custom-rest-methods)
  - [Mapper](#mapper)
  - [A custom method with `simple()`](#a-custom-method-with-simple)
  - [A paginated custom method with `pagNav()`](#a-paginated-custom-method-with-pagnav)
- [Specific methods](#specific-methods)
  - [`tasks.task.list`](#taskstasklist)
- [Date parsing](#date-parsing)
- [Future features](#future-features)
- [License](#license)

## Install

```shell
npm install bx-rest
```

## Requirements

- **Module format:** `bx-rest` ships ES modules only — there is no CommonJS/`require` build. Use it from an ESM-aware bundler (Angular CLI, Vite, webpack 5+, Next.js, ...) or a native `import()`. Plain `require('bx-rest')` (older Jest configs without ESM support, `ts-node` in CJS mode, etc.) will not resolve the package.
- **TypeScript:** developed against TypeScript 5.5+. `strict` mode is recommended — the bundled typification relies on it to give accurate field types.
- **RxJS:** `rxjs` (^7.8) is a regular dependency bundled with the package, not a `peerDependency`, so no specific host version is enforced. Every REST call returns an RxJS `Observable`.
- **Frameworks:** the Angular, Vue and React examples below are written against Angular 18/19, Vue 3 and React 18+ APIs (the versions this library is built and tested with). None of these frameworks are declared as `peerDependencies` — `bx-rest` has no hard dependency on any of them — but the DI/composition patterns shown assume those major versions.
- **Environment:** `bx-rest` is browser-oriented. The `cookies`/`localStorage`/`sessid` auth sources and `SessionKeyServices` read `window`, `document` and `localStorage` directly. In a server-side-rendered app (Angular Universal, Next.js, etc.) only exercise those code paths in the browser (e.g. behind `isPlatformBrowser`/`typeof window !== 'undefined'` guards), or use an auth source that doesn't touch browser globals, such as `source: () => accessToken` or `source: 'off'`.

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
| `.res(options?)` | Unwraps the Bitrix response and applies the configured mapper. For paginated methods it returns the current page. |
| `.resAll()` | Loads and combines every page. Available on paginated Navvy helpers. |
| `.resVanilla()` | Returns the raw Bitrix response, including fields such as `result`, `total` and `next`. |
| `.mapForVanilla()` | Keeps the raw response envelope but applies the mapper to its `result`. |

`.res()` accepts an optional options object:

| Option | Default | Effect |
| --- | --- | --- |
| `throwOnApiError` | `false` | When `true`, a Bitrix-level API error makes the returned `Observable` error out with a `BXRestApiError` instead of resolving with `undefined`. See [Error handling](#error-handling). |

## Authentication and OAuth2

`auth.source` controls where credentials are read from. `auth.key` controls the request parameter name, except for the special `OAuth2` cookie-credentials mode.

| Scenario | `auth.source` | `auth.key` | Behaviour |
| --- | --- | --- | --- |
| Access token from application state | `() => accessToken` | `auth` | Calls the function before each request and sends its value in the `auth` parameter. Recommended for OAuth2 access tokens managed by the application. |
| Access token in local storage | `localStorage` | `auth` | Reads `localStorage["auth"]` and sends it as `auth`. The value is fully readable by any JS on the page (including via XSS) — a good fit for local development/prototyping; for production, prefer the function-based source managed by your application. |
| Access token in a cookie | `cookies` | `auth` | Reads the `auth` cookie via `document.cookie` and sends it as `auth`. Your own JS code reads the cookie, so it can't be `HttpOnly` — from an XSS-protection standpoint this is no safer than `localStorage`. Like the previous option, mainly useful for local development. |
| Embedded Bitrix page / local session | `cookies` | `sessid` | Tries `window.BX.bitrix_sessid()`, the `sessid` query parameter, `localStorage.sessid`, then the `auth` cookie. Sends the resolved value as `sessid`. |
| Incoming webhook, an already-authorized URL, or your own proxy | `off` | Any value | Skips credential lookup and does not add an authorization parameter — used both for webhooks (the secret is already in the URL) and for routing through your own backend proxy (the secret stays server-side, the browser never sees it). For the proxy case, if it authenticates the browser with its own session cookie, see `withCredentials` below. |
| Cookie-based credential request | Any source returning a non-empty value | `OAuth2` | Does not append the resolved value to request params and, by default, enables Axios `withCredentials` (unless overridden by the `withCredentials` setting, see below). Use only when the portal and CORS policy support credential cookies — also keep in mind that modern browsers increasingly block third-party cookies by default. |

For a regular Bitrix OAuth2 `access_token`, use `auth.key: 'auth'` and provide the current token through a function or `localStorage`. The special `auth.key: 'OAuth2'` mode is for credential cookies; it does not send an OAuth access token by itself.

### `withCredentials`

By default, the axios `withCredentials` option (whether to attach browser cookies to the request) is only enabled for `auth.key: 'OAuth2'`. If you need it in another case — e.g. `auth.source: 'off'` points at your own proxy, and the browser should attach *that proxy's* session cookie (not Bitrix24's) — set `withCredentials` explicitly, independent of `auth.key`:

```typescript
BXRestSettings.update({
  auth: {
    source: 'off',
    key: 'auth'
  },
  urls: {
    source: 'string',
    key: 'https://your-proxy.example.com/bitrix-proxy',
    additional_part: ''
  },
  withCredentials: true
})
```

An explicit value always takes priority over the "only for `OAuth2`" rule — you can also force `withCredentials` off for `auth.key: 'OAuth2'` if you don't need it.

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

## Error handling

`.res()` can fail in three ways — which one depends on how the portal answered.

| Failure | How it surfaces on `.res()` |
| --- | --- |
| Bitrix API error with a non-2xx HTTP status — this is how Bitrix sends most errors: `expired_token` (401), `ERROR_METHOD_NOT_FOUND` (404), `QUERY_LIMIT_EXCEEDED` (503), `Not found` from `crm.*.get` (400) | The returned `Observable` errors with a `BXRestApiError`, with or without `throwOnApiError`. |
| Bitrix API error in the body of a 2xx response | By default, `.res()` resolves normally with `undefined` — **it does not throw**. Pass `{ throwOnApiError: true }` to make it throw a `BXRestApiError` instead. |
| Transport / configuration errors — network failure, missing auth, missing base URL, a response that is not from Bitrix (e.g. a proxy's HTML error page) | The returned `Observable` errors with a plain `Error`. |

`BXRestApiError` fields:

| Field | Value |
| --- | --- |
| `error` | Bitrix error code, e.g. `expired_token`. Can be an empty string: `crm.*.get` answers a missing ID with an empty code and `Not found` in the description. |
| `error_description` | Bitrix error description; also used as `message`. |
| `status` | HTTP status, e.g. `401`; `undefined` when the error came in the body of a 2xx response. |
| `method` | REST method, e.g. `crm.deal.get`. |
| `cause` | The original axios error when the status was non-2xx; the full response body is in `cause.response.data` (for REST v3 — including `validation`). |

For REST v3 methods, `error` holds the error `code` and `error_description` its `message`.

**Recommended — `.res({ throwOnApiError: true })`.** Every Bitrix error then arrives as a `BXRestApiError` whatever the HTTP status, and can be handled alongside transport errors in a single `catchError`/`error` callback:

```typescript
import { BXRestNavvy, BXRestApiError } from 'bx-rest'

const bxRest = new BXRestNavvy()

bxRest.crm.deal.list({
  select: ['ID', 'TITLE'],
  filter: {},
  start: 0
}).res({ throwOnApiError: true }).subscribe({
  next: deals => console.log(deals),
  error: err => {
    if (err instanceof BXRestApiError) {
      console.error('Bitrix API error:', err.status, err.error, err.error_description)
      if (err.error === 'expired_token') {
        // refresh the token and retry the request
      }
    } else {
      console.error('Request failed:', err.message)
    }
  }
})
```

Without `throwOnApiError`, plain `.res()` can't tell "no records" apart from "an error in a 2xx response" — both resolve as `undefined`.

**Alternative — check the raw response.** `.resVanilla()` returns the raw Bitrix body for 2xx responses; check it with the exported `isBXRestAnswerSuccess()` type guard. Note that `.resVanilla()`, `.mapForVanilla()` and `.resAll()` don't convert errors: on a Bitrix error with a non-2xx status they fail with the original axios error, with the response body in `err.response.data`.

```typescript
import { firstValueFrom } from 'rxjs'
import { BXRestNavvy, isBXRestAnswerSuccess } from 'bx-rest'

const bxRest = new BXRestNavvy()

const answer = await firstValueFrom(
  bxRest.crm.deal.list({
    select: ['ID', 'TITLE'],
    filter: {},
    start: 0
  }).resVanilla()
)

if (!answer || !isBXRestAnswerSuccess(answer)) {
  console.error('Bitrix API error:', answer?.error, answer?.error_description)
} else {
  console.log(answer.result)
}
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

## Demo

There are three independent demo apps in [`projects/`](../) — Angular, Vue
and React (`demo-angular`, `demo-vue`, `demo-react`). Each one has a
connection form covering every scenario from the "Authentication and OAuth2"
section above (not just an access token and a webhook), a Monaco-based code
editor with real autocompletion from `bx-rest`'s own types (not a plain text
box or a request-builder form), and a result panel that actually runs the
code you write against your portal. The UI switches between Russian and
English automatically based on the browser/OS language. The shared logic
(Monaco typings, code execution, ready-made snippets, i18n) lives in
`projects/demo-shared` — the three demos mainly differ in the integration
style (a DI provider in Angular, a plugin in Vue, a singleton + hook in
React — see the sections above) and, for Angular, in the UI library
(Angular Material — the idiomatic choice for that framework).

Run from the repository root:

```shell
npm run demo:bootstrap
```

Then, in any of `projects/demo-angular|demo-vue|demo-react`: `npm run dev`
(for Angular, `npm start`). See each demo's own README for details.

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

## Date parsing

Some Bitrix24 REST fields (notably `calendar.section.get`, `calendar.event.get` and `crm.calllist.*`) return dates as plain strings formatted according to the portal's own date/time settings (Settings → date and time format) — not a fixed ISO format. Because that format is a per-portal setting, `bx-rest` can't know it in advance, so `BXBaseServices.toDate()` (used internally by these mappers) resolves an ambiguous string in three steps, in order:

1. **The format you asked for.** If you (or a mapper) pass an explicit `format` (e.g. `'dd.MM.yyyy HH:mm:ss'`), it's tried first, token by token (`yyyy`, `MM`, `dd`, `HH`, `mm`, `ss`, and their single-letter variants) with the literal separators from the format string.
2. **A short list of known Bitrix24 formats** (`'dd.MM.yyyy HH:mm:ss'`, `'yyyy-MM-dd HH:mm:ss'`, `'dd.MM.yyyy'`, `'yyyy-MM-dd'`) — tried if step 1 didn't match, since different portals commonly send one of these.
3. **A positional heuristic**, as a last resort — it locates the year by its unambiguous 4-digit length (whichever end of the date it's on), treats the middle segment as the month (true for both ISO and European-style dates) and reads any separator (`.`, `-`, `/`, space...). It does **not** guess in the one case that's genuinely ambiguous — a purely numeric `MM/dd` vs `dd/MM` order where both segments are ≤ 12 — and it validates ranges (month 1-12, day 1-31, hour/minute/second) rather than letting `Date` silently roll over an out-of-range value into the next month/year.

If you already know your portal's exact format, pass it explicitly instead of relying on auto-detection — it's always tried first and skips steps 2-3 entirely. The calendar and call-list mappers accept it as a single optional trailing `dateTimeFormat` argument, and it flows through the corresponding `BXRestNavvy` methods too. Where a mapper also has date-only fields (`calendar.event`'s `EXDATE`/`RRULE.UNTIL`), their format is derived from `dateTimeFormat` by dropping `HH:mm:ss` — day/month/year order is always the same for both on a given portal, so there's nothing extra to pass:

```typescript
import { BXRestNavvy } from 'bx-rest'

const bxRest = new BXRestNavvy()

// Portal-specific date/time format, e.g. from Settings → date and time format.
const dateTimeFormat = 'yyyy-MM-dd HH:mm:ss'

bxRest.calendar.event.get({ FROM: '01.01.2026', TO: '31.01.2026' }, dateTimeFormat).res()
bxRest.calendar.section.get({}, dateTimeFormat).res()
bxRest.crm.callList.get({ ID: 1 }, dateTimeFormat).res()
```

## Future features
- Auto get token
- Mappers for normalization types

Have a feature request or found a bug? Check [existing issues](https://github.com/Aricatofuka/bx-rest/issues) or open a new one.

## License

[MIT](https://github.com/Aricatofuka/bx-rest/blob/main/LICENSE) © Aricatofuka