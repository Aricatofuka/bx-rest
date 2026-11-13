<img src="https://flagcdn.com/20x15/ru.png" width="20" height="15" alt="RU"> [Русский](README.md) | <img src="https://flagcdn.com/20x15/gb.png" width="20" height="15" alt="GB"> **English**

# bx-rest - Bitrix24 REST API client for TypeScript, Angular, Vue and React

[![npm version](https://img.shields.io/npm/v/bx-rest.svg)](https://www.npmjs.com/package/bx-rest)
[![npm downloads](https://img.shields.io/npm/dm/bx-rest.svg)](https://www.npmjs.com/package/bx-rest)
[![license](https://img.shields.io/npm/l/bx-rest.svg)](https://github.com/Aricatofuka/bx-rest/blob/main/LICENSE)

`bx-rest` is a TypeScript SDK for the Bitrix24 REST API. You call portal methods as typed functions, and the library takes care of authorization (OAuth 2.0, webhooks, sessid), loading every page of a list and turning responses into your types with mappers.

**Try it in the browser:** [demos in Vue, React and Angular](https://aricatofuka.github.io/bx-rest/). Connect a test portal and run code right on the page; the editor suggests methods from the library's types.

Also known as: Bitrix24 REST client, BX24 REST SDK, Bitrix24 API client, Bitrix REST TypeScript library.

## Contents

- [Install](#install)
  - [Requirements](#requirements)
- [Quick Start](#quick-start)
  - [Incoming webhook](#incoming-webhook)
  - [Result modes](#result-modes)
- [Usage in Angular](#usage-in-angular)
- [Usage in Vue](#usage-in-vue)
- [Usage in React](#usage-in-react)
- [Authentication and OAuth2](#authentication-and-oauth2)
  - [`withCredentials`](#withcredentials)
- [Error handling](#error-handling)
  - [Kinds of errors](#kinds-of-errors)
  - [`BXRestApiError` fields](#bxrestapierror-fields)
  - [The token in errors](#the-token-in-errors)
  - [The raw response](#the-raw-response)
- [Authorization refresh](#authorization-refresh)
  - [A token from the portal without BX24.js](#a-token-from-the-portal-without-bx24js)
  - [Recipe: straight to the portal](#recipe-straight-to-the-portal)
  - [Recipe: through a backend proxy](#recipe-through-a-backend-proxy)
- [Several portals](#several-portals)
- [HTTP headers](#http-headers)
- [Retry, timeout and request queue](#retry-timeout-and-request-queue)
  - [Request log](#request-log)
  - [The fetch transport](#the-fetch-transport)
  - [Your own middleware](#your-own-middleware)
- [Working in an iframe without BX24.js](#working-in-an-iframe-without-bx24js)
- [Custom REST methods](#custom-rest-methods)
  - [Mapper](#mapper)
  - [A custom method with `simple()`](#a-custom-method-with-simple)
  - [A paginated custom method with `pagNav()`](#a-paginated-custom-method-with-pagnav)
- [Specific methods](#specific-methods)
  - [`tasks.task.list`](#taskstasklist)
  - [Push & Pull](#push--pull)
- [Date parsing](#date-parsing)
- [SessionKeyServices](#sessionkeyservices)
- [Demo](#demo)
- [Future features](#future-features)
- [License](#license)

## Install

```shell
npm install bx-rest
```

### Requirements

- **ES modules.** There is no CommonJS build, so `require('bx-rest')` does not work, including older Jest configs without ESM support and `ts-node` in CommonJS mode. Use an ESM-aware bundler (Angular CLI, Vite, webpack 5+, Next.js) or `import()`.
- **TypeScript 5.5+**, preferably in `strict` mode: the library's types are built for strict checking.
- **RxJS** needs no separate install: `rxjs ^7.8` is a regular dependency of the package. Every request returns an `Observable`.
- **No framework required:** Angular, Vue and React are not declared as `peerDependencies`. The examples below are written for Angular 18/19, Vue 3 and React 18+, the versions the library is built and tested with.
- **Browser and SSR.** The `cookies`, `localStorage` and `sessid` auth sources and `SessionKeyServices` read `window`, `document` and `localStorage`. With SSR (Angular Universal, Next.js), call them only in the browser, for example behind `isPlatformBrowser` or `typeof window !== 'undefined'`. Or use a source that needs no browser: `source: () => accessToken` or `source: 'off'`.

## Quick Start

Set the portal address and the token source, create a client and call a method. Use the full address, including `https://`.

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

Do not keep a production token in your code or repository. Pass it from your app's authorization, a server response or secure configuration.

### Incoming webhook

A webhook needs no token: the secret is already in its address. Put the full webhook address in `urls.key`, leave `additional_part` empty and turn the token lookup off:

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

The library builds the address for [REST v3](https://apidocs.bitrix24.com/api-reference/rest-v3.html#call) methods from the same address: `https://example.bitrix24.com/rest/api/1/WEBHOOK_CODE/<method>`.

### Result modes

A request is sent when the `Observable` is subscribed to or passed to `firstValueFrom`. Unsubscribing before the response aborts the HTTP request: `switchMap`, `takeUntil` and the RxJS `timeout` operator rely on this. Aborting does not undo what the portal has already done: if `crm.deal.add` reached the server, the deal may be created.

| Method | What it returns |
| --- | --- |
| `.res(options?)` | The result from the Bitrix response, passed through the mapper. For list methods, one page. |
| `.resAll()` | The records of all pages together. Available on paged list methods, see below. |
| `.resVanilla()` | The Bitrix response as is, with `result`, `total` and `next`. |
| `.mapForVanilla()` | The Bitrix response as is, but with the mapper applied to its `result`. |

`.res()` has one option, `throwOnApiError`, `false` by default. With `true`, a Bitrix error in a 2xx response arrives as a `BXRestApiError` instead of `undefined`. See [Error handling](#error-handling).

`.resAll()` exists on paged list methods. The result has the same shape as `.res()`:

- if the method returns an array (`crm.deal.list`, `crm.activity.list`), `.resAll()` returns an array of all records;
- if `result` is an object with the list under a key, as with `catalog.product.list` (`{ products: [...] }`), `sale.order.list` (`{ orders: [...] }`) or REST v3 methods (`{ items: [...] }`), `.resAll()` returns the same object with the records of all pages under that key.

How `.resAll()` pages depends on the method:

| How the method pages | Methods | Requests of `.resAll()` |
| --- | --- | --- |
| `start`, the response has `total` | Most `*.list` methods | The first page, then the rest in packs through `batch` |
| `OFFSET`/`LIMIT`, the response has `total` | `im.dialog.users.list`, `im.department.colleagues.list`, `im.search.{chat,department,user}.list` | The same |
| `OFFSET`/`LIMIT` or a page number, no `total` | `im.recent.list`, `imbot.v2.Bot.list`, `sign.b2e.company.provider.list`, `biconnector.{connector,dataset,source}.list` | One page at a time, until the portal says there are no more pages or returns a short one |
| The REST v3 `pagination` object | `mail.mailbox.list`, `mail.message.list`, `main.eventlog.list`, `timeman.record.list`, `note.collection.list` (cursor) | One page at a time, the same way |

`.resAll()` takes the page size from the request. If the request has none, `.resAll()` passes the method's documented default explicitly, and if it is larger than the method accepts, `.resAll()` lowers it. A larger page means fewer requests, which shows when pages go one at a time.

When pages go one at a time, the fields of `result` other than the lists (`hasMore`, `nextCursor`) come from the last page. For `imbot.v2.Bot.list` both lists are collected, `bots` and `users`. The pages of `im.recent.list` overlap on the portal, and `.resAll()` drops the repeated chats.

Methods that return the whole list in one response have no `.resAll()`. They and the other exceptions are listed with reasons in [list-pagination.spec.ts](https://github.com/Aricatofuka/bx-rest/blob/main/projects/bx-rest/src/rest/list-pagination.spec.ts). For example, `note.document.search.list` returns only the first page: the response has no pointer to the next one.

## Usage in Angular

Register the clients as providers and inject them with `inject()`. Set the settings with `BXRestSettings.update()` before the first request, for example in `main.ts`.

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

A component:

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

## Usage in Vue

A plugin sets the settings and puts the clients into the app's global properties:

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

Using it in `main.ts`:

```typescript
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import bxRestPlugin from './bxRestPlugin'

const app = createApp(App)

app.use(bxRestPlugin)

app.mount('#app')
```

## Usage in React

Create the client outside the component and unsubscribe on unmount:

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

## Authentication and OAuth2

`auth.source` sets where the token comes from, and `auth.key` the name it is sent under. The exception is `auth.key: 'OAuth2'`, described in the last row of the table.

| Scenario | `auth.source` | `auth.key` | What happens |
| --- | --- | --- | --- |
| Token from application state (recommended) | `() => accessToken` | `auth` | The function is called before each request, and its value is sent in the `auth` parameter. |
| Token in `localStorage` | `localStorage` | `auth` | Reads `localStorage["auth"]` and sends it as `auth`. |
| Token in a cookie | `cookies` | `auth` | Reads the `auth` cookie from `document.cookie` and sends it as `auth`. |
| Page inside Bitrix24 or a local session | `cookies` | `sessid` | Tries in turn: `window.BX.bitrix_sessid()`, the `sessid` parameter in the page address, `localStorage.sessid`, the `auth` cookie. Sends what it finds as `sessid`. |
| Incoming webhook or your own proxy | `off` | any | No token is looked up or sent: a webhook has the secret in its address, a proxy keeps it on the server, and the browser never sees it. |
| Credential cookies | any, as long as the value is not empty | `OAuth2` | The value is not added to the request; `withCredentials` is turned on instead, unless overridden (see below). |

- **`localStorage` and cookies** are handy for development. But any script on the page can read the token there, including through XSS. A cookie that JS reads cannot be `HttpOnly`, so it is no safer than `localStorage`. In production, pass the token with a function.
- **A regular Bitrix OAuth2 `access_token`** goes with `auth.key: 'auth'`, through a function or `localStorage`. The `auth.key: 'OAuth2'` mode is only for credential cookies and does not send the token itself. It works when the portal and the CORS policy allow such cookies, and browsers increasingly block third-party cookies by default.
- **Your own proxy with a cookie session:** see `withCredentials` below.

### `withCredentials`

The axios `withCredentials` option decides whether browser cookies are attached to the request. By default it is on only for `auth.key: 'OAuth2'`. An explicit value in the settings beats this rule. For example, requests go through your proxy (`auth.source: 'off'`), and the browser has to attach that proxy's session cookie, not Bitrix24's:

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

In the same way, `withCredentials: false` turns it off for `auth.key: 'OAuth2'`.

## Error handling

Call `.res({ throwOnApiError: true })`. Every Bitrix error then arrives as a `BXRestApiError`, whatever the HTTP status, and you can handle it together with network errors in one `error` callback or in `catchError`:

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
        // auth.refresh is not set or did not help — see "Authorization refresh"
      }
    } else {
      console.error('Request failed:', err.message)
    }
  }
})
```

Without `throwOnApiError`, an error in a 2xx response turns into `undefined`, and you cannot tell it from an empty result.

### Kinds of errors

| What happened | What `.res()` gives |
| --- | --- |
| A Bitrix error with a non-2xx status. Most errors come this way: `expired_token` (401), `ERROR_METHOD_NOT_FOUND` (404), `QUERY_LIMIT_EXCEEDED` (503), `Not found` from `crm.*.get` (400) | A `BXRestApiError`, with or without `throwOnApiError`. |
| A Bitrix error in the body of a 2xx response | By default the value `undefined`, **no error is thrown**. With `{ throwOnApiError: true }`, a `BXRestApiError`. |
| A network failure, [`timeout`](#retry-timeout-and-request-queue) exceeded, missing auth, an empty base address (see below), a response that is not from Bitrix (e.g. a proxy's HTML error page) | A plain `Error`. The original error is in its `cause`: for a response that is not from Bitrix it is the axios error, with the HTTP status in `cause.response.status`; for `timeout` it is `BXRestTimeoutError`. |

**Base address.** The request address is built from the portal address and `urls.additional_part`. The portal address is `urls.key`, or, with `urls.source: 'localStorage'`, the value stored in `localStorage` under the `urls.key` key.

- The `Base URL was not resolved` error happens only when both parts are empty.
- If only the portal address is empty and `additional_part` is `'rest'` (as in the default settings), the request goes to `rest/<method>` relative to the current page. This is meant for pages opened on the portal's own domain.
- A request also goes there when nothing was found in `localStorage` under the key. Check the value beforehand.

### `BXRestApiError` fields

| Field | Value |
| --- | --- |
| `error` | Bitrix error code, e.g. `expired_token`. Can be an empty string: `crm.*.get` answers a missing ID with an empty code and `Not found` in the description. |
| `error_description` | Bitrix error description; also used as `message`. |
| `status` | HTTP status, e.g. `401`; `undefined` when the error came in the body of a 2xx response. |
| `method` | REST method, e.g. `crm.deal.get`. |
| `cause` | The original axios error when the status was non-2xx; the full response body is in `cause.response.data` (for REST v3 — including `validation`). |

For REST v3 methods, `error` holds the error `code` and `error_description` its `message`.

### The token in errors

An axios error keeps the whole request that was sent: `config.url` holds the address, and with it the webhook secret, and `config.data` holds the body with the token. The library passes this error on as is: in `err.cause` for `.res()` and as the error itself for `.resVanilla()`. So `console.error(err)` or sending the error to an error tracker passes the token along too. If errors go to logs, pick the fields you need, for example `err.status`, `err.error` and `err.cause?.response?.data`.

### The raw response

`.resVanilla()` returns the Bitrix response body as is. Check it with `isBXRestAnswerSuccess()`:

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

`.resVanilla()`, `.mapForVanilla()` and `.resAll()` don't convert errors:

- on a Bitrix error with a non-2xx status all three fail with the original axios error, with the response body in `err.response.data`;
- an error in the body of a 2xx response comes back as is from `.resVanilla()` and `.mapForVanilla()`;
- `.resAll()` fails with a `BXRestApiError` on such an error: it has no `throwOnApiError` option. It fails the same way when any later page returns an error, as a separate request or inside a batch request (`result_error`). `.resAll()` never gives a partial list.
- If, when paging one page at a time, the portal returns the same page twice in a row, it did not understand the pagination parameter. `.resAll()` then fails with an error instead of requesting pages forever.

## Authorization refresh

With `auth.refresh` set, the library refreshes an expired authorization by itself. When a request fails with an authorization error, it calls `auth.refresh()` and retries the request, and your code just gets the result.

```typescript
BXRestSettings.update({
  auth: {
    source: () => accessToken,
    key: 'auth',
    // get a new authorization and put it where source reads it from
    refresh: async () => {
      accessToken = await getNewToken()
    }
  },
  // ...
})
```

| `auth` field | Value |
| --- | --- |
| `refresh` | `() => Promise<unknown>`. Gets a new authorization. The promise value is not used: the retry reads the token, the URL and the headers from the settings again. So the function has to put the new token where `auth.source` reads it from, or, through a proxy, hand it to the server. |
| `isAuthError` | `(error: unknown) => boolean`, optional. Which request error counts as an authorization error. It gets the original HTTP request error, usually an `AxiosError`. Defaults to the exported `isBXRestAuthError`, which is easy to extend: `error => isBXRestAuthError(error) \|\| myCheck(error)`. |

Without `auth.refresh` requests are not retried. `update()` merges settings at the top level only, so `BXRestSettings.update({ auth: {...} })` replaces the whole `auth`, `refresh` included. When you change `auth`, pass `refresh` again.

How the retry works:

- **What counts as an authorization error** (`isBXRestAuthError`): the Bitrix error `expired_token` or `invalid_token` with any HTTP status, and a 401 response without a Bitrix error body, e.g. an empty 401 from a backend proxy that has no valid token. The other Bitrix system errors come with status 401 too (`insufficient_scope`, `NO_AUTH_FOUND`, `ACCESS_DENIED`, `INVALID_CREDENTIALS`, `user_access_error`, `OVERLOAD_LIMIT`), but a new token does not fix them, so they are not retried.
- **One retry.** If the retry fails as well, its error goes out; there is no second refresh.
- **One refresh for everybody.** When several requests fail at once, `refresh()` is called once and all of them are retried. A request that was in flight while the token was being refreshed is retried without another refresh.
- **The refresh failed** (`refresh()` rejected or threw). The original request error goes out, and the reason the refresh failed is in its `authRefreshError` field. `getAuthRefreshError(err)` reads it from any error:

  ```typescript
  import { BXRestApiError, getAuthRefreshError } from 'bx-rest'

  bxRest.crm.deal.get({ ID: 1 }).res().subscribe({
    error: err => {
      if (err instanceof BXRestApiError && err.error === 'expired_token') {
        console.error('Could not refresh the authorization:', getAuthRefreshError(err))
      }
    }
  })
  ```

- **Where it works.** In every library request: `.res()`, `.resAll()` (the first page and every batch request), `.resVanilla()`, `.mapForVanilla()`, `BXRestRequest.post()`/`.get()`. The retry lives in the HTTP layer, so `.res()` already gets the result of the retry.
- **What is not retried:** errors in the body of a 2xx response (Bitrix sends `expired_token` with status 401) and errors of single commands inside a successful batch response (`result_error`). Only the whole HTTP request is retried.

### A token from the portal without BX24.js

A browser cannot refresh a token through OAuth: that takes the `client_secret`. But the application is open in a portal iframe, the user is logged in to the portal, and the portal itself hands the application a token over postMessage. This is how `BX24.getAuth()` and `BX24.refreshAuth()` work. `BXRestFrame` does the same without loading BX24.js. The other BX24.js commands are in [Working in an iframe without BX24.js](#working-in-an-iframe-without-bx24js).

```typescript
import { BXRestFrame } from 'bx-rest'

const frame = new BXRestFrame()         // optional: { timeout: 10000 }

const auth = await frame.getAuth()      // the current authorization — like BX24.getAuth()
const fresh = await frame.refreshAuth() // a new authorization — like BX24.refreshAuth()
// { access_token, refresh_token, expires_in, domain, member_id }
```

| Result field | Value |
| --- | --- |
| `access_token`, `refresh_token` | The application tokens. |
| `expires_in` | When the `access_token` expires — **milliseconds** since January 1, 1970, as in `BX24.getAuth()`. Not the lifetime in seconds, as in the OAuth server response. |
| `domain` | The portal address without the protocol, e.g. `mycompany.bitrix24.com`. |
| `member_id` | The permanent portal identifier. |

- **Tokens.** `BXRestFrame` does not log tokens and does not store them anywhere: every `getAuth()` and `refreshAuth()` call asks the portal again, and your code gets the result.
- **Errors** — `BXRestFrameError` with a `code` field:
  - `NOT_IN_FRAME` — the page is not opened in an application iframe, fails right away;
  - `TIMEOUT` — the portal did not answer within `timeout`, 10 seconds by default;
  - `NO_AUTH` — the portal answered without a token;
  - `BAD_RESPONSE` — the answer could not be parsed.

  When the portal cannot issue a new token (e.g. the application trial or paid period is over), it shows the "Unable to get new token!" `alert` and does not answer at all. Such a refusal comes as `TIMEOUT`.
- **`getAuth()` and the expiry.** The portal gives the token lifetime at the moment of issue, not what is left of it. So on a page that has been open for a while `expires_in` from `getAuth()` points too far ahead, the same as with BX24.js. Use `refreshAuth()` for a fresh token.
- **The portal domain.** Like BX24.js, `BXRestFrame` cannot vouch for it: it is set by whoever embedded the page in an iframe. So a server must check a token that came from the browser with the portal before trusting it.

### Recipe: straight to the portal

The frontend keeps the token, requests go to `https://<portal>/rest/`. The refresh function gets a new token from the portal and puts it where `auth.source` reads it from, an in-memory variable here:

```typescript
import { BXRestSettings, BXRestFrame } from 'bx-rest'

const frame = new BXRestFrame()
const auth = await frame.getAuth()
let accessToken = auth.access_token

BXRestSettings.update({
  auth: {
    source: () => accessToken,
    key: 'auth',
    refresh: async () => {
      accessToken = (await frame.refreshAuth()).access_token
    }
  },
  urls: {
    source: 'string',
    key: `https://${auth.domain}`,
    additional_part: 'rest'
  }
})
```

With `auth.source: 'localStorage'` the refresh function writes the token to `localStorage[auth.key]` in the same way.

### Recipe: through a backend proxy

The server keeps the token, and the browser authorizes with the proxy through a cookie session (`auth.source: 'off'`). A proxy without a valid token answers 401 with an empty body, which counts as an authorization error by default. The refresh function gets a new token from the portal and sends it to the server:

```typescript
import { BXRestSettings, BXRestFrame } from 'bx-rest'

const APP = 'smart-process-pro'
const frame = new BXRestFrame()

BXRestSettings.update({
  auth: {
    source: 'off',
    key: 'auth',
    refresh: async () => {
      const { access_token, refresh_token, expires_in } = await frame.refreshAuth()
      const response = await fetch(`/api/bitrix/token/${APP}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token, refresh_token, expires_in })
      })
      if (!response.ok) {
        // no request body in the message — it holds the tokens
        throw new Error(`Token upload failed: HTTP ${response.status}`)
      }
    }
  },
  urls: {
    source: 'string',
    key: '/api/bitrix/rest/',
    additional_part: '' // otherwise one more `rest/` is appended to the URL
  },
  headers: {
    'X-Bitrix-App': APP
  }
})
```

An error of the refresh function ends up in `authRefreshError` of the original error, and your app may print it to the console or send it to an error tracker. So keep tokens out of the error messages of the refresh function.

## Several portals

`BXRestSettings` are shared by the whole app. To work with several portals in one process, for example on a server that serves different customers, pass the settings to the `BXRestNavvy` constructor. Such a client has its own settings: all its requests go to its portal with its token, and `BXRestSettings` do not affect it.

```typescript
import { BXRestNavvy } from 'bx-rest'
import { firstValueFrom } from 'rxjs'

const portalA = new BXRestNavvy({
  auth: { source: () => tokenA, key: 'auth' },
  urls: { source: 'string', key: 'https://a.bitrix24.com', additional_part: 'rest' }
})
const portalB = new BXRestNavvy({
  auth: { source: () => tokenB, key: 'auth' },
  urls: { source: 'string', key: 'https://b.bitrix24.com', additional_part: 'rest' }
})

const deals = await firstValueFrom(
  portalA.crm.deal.list({ select: ['ID'], filter: {}, start: 0 }).resAll()
)
```

- **Without an argument** `new BXRestNavvy()` uses the global `BXRestSettings`.
- **The format** is the same as for `BXRestSettings.update()`, but the settings are passed in full: `auth` and `urls` are required and are not merged with the global settings.
- **Changing the token of an existing client.** The library calls `auth.source` before every request, at subscribe time. To change the token, change the value the function returns. Requests created earlier but not started yet get the new token too:

  ```typescript
  let token = await getToken()
  const portal = new BXRestNavvy({
    auth: {
      source: () => token,
      key: 'auth',
      refresh: async () => { token = await getNewToken() } // optional
    },
    urls: { source: 'string', key: 'https://a.bitrix24.com', additional_part: 'rest' }
  })

  token = newToken // the next request goes out with the new token
  ```

- **Another portal or other headers** — create a new client, it takes a fraction of a millisecond.
- **Authorization refresh** is per client: a client's `auth.refresh` is called only for its own requests.
- **`auth.source: 'cookies'` and `'localStorage'`** read the shared browser storage, so two clients with the same key get the same token. For several portals, set `source` to a function.
- **Objects created directly** — `new Navvy()` and `new BXRestRequest()` — use the global `BXRestSettings` when called without an argument. They also accept their own settings: `new Navvy(settings)`, `new BXRestRequest(settings)`. Such an object has its own `throttle` queue and authorization refresh, even if a `BXRestNavvy` client has the same settings. `new SessionKeyServices()` always uses the global settings.

## HTTP headers

Put headers that every request needs into `BXRestSettings.headers`:

```typescript
BXRestSettings.update({
  headers: {
    'X-Bitrix-App': 'smart-process-pro'
  }
})
```

They are attached to every request the library makes, including the `.resAll()` batch requests, and, like the other settings, are read at subscribe time. `update()` merges settings only at the top level, so `headers` is replaced as a whole. To add a header to the ones already set, pass the full set.

For a single request, use `.withHeaders()`. Its headers go on top of `BXRestSettings.headers`, and when a name matches (case-insensitively), `.withHeaders()` wins. It works with `.res()`, `.resAll()`, `.resVanilla()` and `.mapForVanilla()`:

```typescript
const deals = await firstValueFrom(
  bxRest.crm.deal.list({ select: ['ID', 'TITLE'], filter: {}, start: 0 })
    .withHeaders({ 'X-Request-Source': 'report' })
    .resAll()
)
```

- **`Content-Type`** is always set by the library: `application/json`, or `application/x-www-form-urlencoded` for `auth.key: 'sessid'`. The server parses the request body based on it, so headers can't override it.
- **CORS.** For cross-origin requests, the server — the portal or your proxy — must allow a non-standard header in `Access-Control-Allow-Headers` of its preflight (`OPTIONS`) response, or the browser blocks the request. The header doesn't add an extra request: the library's JSON requests already go through a preflight because of `Content-Type: application/json`.

## Retry, timeout and request queue

Three optional settings protect against the Bitrix24 request rate limit and against hanging requests. Set them in `BXRestSettings.update()` for the whole app or in the settings of a `new BXRestNavvy(settings)` client. `true` turns on the defaults, a number or an object sets your own values. A setting that is not set does nothing.

```typescript
BXRestSettings.update({
  retryOnQueryLimit: true,      // 3 attempts, pause from 1000 ms
  timeout: 30_000,              // ms
  throttle: { perSecond: 2 },
})
```

| Setting | `true` means | What it does |
| --- | --- | --- |
| `retryOnQueryLimit` | `{ attempts: 3, delay: 1000 }` | Retries the request when the portal answers `QUERY_LIMIT_EXCEEDED` (HTTP 503, request rate limit exceeded). `attempts` is the total number of attempts including the first one, `delay` is the pause before the second attempt in ms, then it doubles: 1000, 2000, 4000... Other errors are not retried. When the attempts run out, the error of the last one goes out; in `.res()` it is a `BXRestApiError` with `error: 'QUERY_LIMIT_EXCEEDED'`. |
| `timeout` | `60000` | Time limit for one HTTP request in ms. A request that takes longer is aborted with `BXRestTimeoutError` (its `timeout` field is the limit). In `.res()` it is in `cause`; `.resVanilla()`, `.mapForVanilla()` and `.resAll()` error with it directly. |
| `throttle` | `{ perSecond: 2 }` | At most `perSecond` requests per second, the rest wait in a queue. 2 requests per second is the Bitrix24 limit on regular plans. |

An object may set only some fields: `retryOnQueryLimit: { attempts: 5 }` keeps `delay: 1000`.

- **Order:** retry, queue, timeout, [log](#request-log), [your own middleware](#your-own-middleware), [transport](#the-fetch-transport). Every retry attempt queues again and gets its own `timeout`. Waiting in the queue and pauses before a retry do not count towards `timeout`.
- **The queue** belongs to each `new BXRestNavvy(settings)` client and is shared by everything that uses the global `BXRestSettings`. Every request goes through it, including every batch request of `.resAll()`.
- **`throttle` is stricter than the portal.** Bitrix24 lets short bursts above the limit through, while `throttle` spreads all requests evenly. If short bursts of requests need to be fast, `retryOnQueryLimit` alone is enough.
- **Unsubscribing** stops both the wait in the queue and the pause before a retry: such a request is never sent.
- **Settings are read at subscribe time**, like the rest.
- **An invalid value** — for example `throttle: { perSecond: 0 }` or a negative `timeout` — fails the request with a `TypeError` that describes it; nothing is sent to the portal.

### Request log

`logRequests` is a function that receives an entry for every HTTP request once it finishes. It is set the same way, globally or per client:

```typescript
BXRestSettings.update({
  logRequests: entry => console.debug(entry.method, entry.url, `${entry.duration} ms`, entry.failed ? entry.error : 'ok'),
})
```

| Field | What it holds |
| --- | --- |
| `method` | `'GET'` or `'POST'`. |
| `url` | The full request address. |
| `duration` | Time from sending to the response or error, ms. |
| `failed` | `true` if the request failed: a non-2xx response, a network failure, a timeout or a cancel. |
| `status` | The HTTP status of a failed response. The transport does not report the status of a successful one. |
| `error` | The Bitrix error code from the response body, such as `QUERY_LIMIT_EXCEEDED`, including one from a 2xx response. If the portal sent no code, the error message. |

- **One entry per HTTP request:** every `retryOnQueryLimit` attempt and every batch request of `.resAll()` is its own entry. Waiting in the `throttle` queue does not count towards `duration`.
- **The address is as is.** The request body is not in the entry, but a webhook keeps its secret in the address, and a GET request keeps the token there. If the log goes to a third-party system, remove them yourself.
- **An exception from the function** does not affect the request.

### The fetch transport

By default axios sends the requests. With `transport: 'fetch'` the global `fetch` of the browser or Node 18+ sends them:

```typescript
const portal = new BXRestNavvy({ ...settings, transport: 'fetch' })
```

The result is the same as with axios; only transport errors differ:

- on a non-2xx response `.resVanilla()` fails with a `BXRestHttpError` that has `response: { status, data }`, like `AxiosError`; in `.res()` it is in the `cause` of `BXRestApiError`;
- a network failure comes as the error of `fetch` itself (usually a `TypeError`), without the `request` field axios has.

### Your own middleware

A middleware is a function every request passes through before it is sent: logging, metrics, changing headers, your own transport instead of axios. Set it in `middleware`, globally or per client in the same way:

```typescript
import { BXRestMiddleware, BXRestSettings } from 'bx-rest'

const logDuration: BXRestMiddleware = async (config, next) => {
  const started = Date.now()
  try {
    return await next(config)
  } finally {
    console.debug(config.method, Date.now() - started, 'ms')
  }
}

BXRestSettings.update({ middleware: [logDuration] })
```

- **`config`** is the request: `method` (`'GET'` or `'POST'`), `url` (with the parameters for GET), `data` (the POST body), `headers`, `withCredentials`, `signal`. `next(config)` sends it on and returns the response body.
- **Order:** the first in the list is the outermost one: it sees the request first and the response last. All your middleware run after `retryOnQueryLimit`, `throttle`, `timeout` and `logRequests`, so they see every retry attempt. The retry after `auth.refresh` wraps all the steps: on an authorization refresh the request passes through them again.
- **To change the request**, pass a new object on: `next({ ...config, headers: { ...config.headers, 'X-Trace': id } })`.
- **Your own transport** is a middleware that does not call `next`: it sends the request itself and returns the response body. For a non-2xx response it must reject with an error that has a `response: { status, data }` field, as axios does. The library uses that field to recognize Bitrix errors (`BXRestApiError`) and authorization errors (`auth.refresh`).
- **Pass `config.signal`** to your transport: it aborts the request on unsubscribe and on `timeout`.
- **`config.url` and `config.data`** contain the token and the webhook secret — do not log them as they are.

## Working in an iframe without BX24.js

`BXRestFrame` sends the portal the commands of an application iframe: the frame size, the selection dialogs, sliders, the messenger, placements, options, installation. The commands and names are the same as in BX24.js, but with promises instead of callbacks, and with no need to load BX24.js. bx-rest itself makes the REST requests, and `getAuth()` and `refreshAuth()` give the token for them (see [Authorization refresh](#authorization-refresh)).

```typescript
import { BXRestFrame } from 'bx-rest'

const frame = new BXRestFrame()

const { lang, isAdmin, placement } = await frame.init()
await frame.fitWindow()
const user = await frame.selectUser()
const unsubscribe = frame.placement.bindEvent('Tab:onChange', data => console.log(data))
```

Create one instance per page, when the application starts. The portal parameters are read in the constructor, and the portal reports the first run only in its first answer after the page loads. For the same reason, do not use `BXRestFrame` and BX24.js on one page.

| BX24.js | `BXRestFrame` | Answer |
| --- | --- | --- |
| `BX24.init()`, `isAdmin()`, `getLang()`, `getDomain()` | `init()` — `{ domain, lang, path, https, memberId, isAdmin, install, firstRun, placement, placementOptions, userOptions, appOptions }` | Asked once, without tokens |
| `BX24.getAuth()`, `BX24.refreshAuth()` | `getAuth()`, `refreshAuth()` | Asked from the portal every time |
| `BX24.installFinish()` | `installFinish()` | Only on the installer page (`install`); the portal reloads the page |
| the end of the `BX24.install()` chain | `firstRunFinish()` | Marks the first run as done; without it `firstRun` stays `true` |
| `BX24.resizeWindow(w, h)`, `BX24.fitWindow()` | `resizeWindow(w, h)`, `fitWindow()` | `{ width, height }` or `undefined` |
| `BX24.setTitle(title)` | `setTitle(title)` | `{ title }` or `undefined` |
| `BX24.scrollParentWindow(scroll)` | `scrollParentWindow(scroll)` | `{ scroll }` or `undefined` |
| `BX24.reloadWindow()` | `reloadWindow()` | No answer |
| `BX24.selectUser()`, `BX24.selectUsers()` | `selectUser({ title?, signal? })`, `selectUsers(...)` | An employee / an array of employees |
| `BX24.selectAccess(value)` | `selectAccess({ value?, signal? })` — `value`: codes that cannot be selected | An array of `{ provider, id, name }` |
| `BX24.selectCRM(params)` | `selectCRM({ entityType?, multiple?, value?, signal? })` | CRM items by type |
| `BX24.openApplication(params, cb, settings)` | `openApplication(params?, settings?, { signal? })` | When the slider is closed |
| `BX24.openPath(path)` | `openPath(path, { signal? })` | `{ result: 'close' }` or `{ result: 'error', errorCode }` |
| `BX24.closeApplication()` | `closeApplication()` | No answer |
| `BX24.im.callTo/phoneTo/openMessenger/openHistory` | `im.callTo/phoneTo/openMessenger/openHistory` | No answer |
| `BX24.placement.info()` | `placement.info()` | `{ placement, options }` from `init()` |
| `BX24.placement.getInterface()` | `placement.getInterface()` | `{ command, event }` |
| `BX24.placement.call(cmd, params)` | `placement.call(cmd, params?, { timeout? })` | The command answer or `undefined` |
| `BX24.placement.bindEvent(event, cb)` | `placement.bindEvent(event, handler)` | `handler` on every event; returns an unsubscribe function |
| `BX24.userOption.get/set` | `userOption.get/set` | A user option |
| `BX24.appOption.get/set` | `appOption.get/set` | `set` — administrators only, otherwise `ACCESS_DENIED` |

When the promise settles depends on how the portal answers the command:

- **With an answer** (`init()`, `getAuth()`, `refreshAuth()`, `placement.getInterface()`, `appOption.set()`). No answer within `timeout` (10 seconds by default) is a `TIMEOUT` error.
- **With an acknowledgement** (`resizeWindow()`, `fitWindow()`, `setTitle()`, `scrollParentWindow()`, `userOption.set()`, `firstRunFinish()`, `placement.call()`). In some placements the portal does not answer them, so without an answer within `timeout` the promise resolves with `undefined`, not with an error.
- **Without an answer** (`reloadWindow()`, `closeApplication()`, `installFinish()`, `im.*`). The promise resolves right after sending.
- **Waiting for the user** (`select*()`, `openApplication()`, `openPath()`), with no time limit. When the user closes a dialog without selecting anything, the portal does not answer at all. Cancel the wait with `signal` (`AbortController`). Calling the same dialog again also cancels the previous wait, because the portal keeps one handler per dialog. A cancelled wait is a `CANCELLED` error.

Also:

- **Unsubscribing from `placement.bindEvent()`** only stops calling `handler`: the protocol has no way to cancel the subscription on the portal side.
- **Where it looks for the portal.** Like BX24.js, in `window.name`: the portal names the application iframe `DOMAIN|PROTOCOL|APP_SID`. If it is empty, in the page address parameters (`?DOMAIN=…&PROTOCOL=…&APP_SID=…`) the portal opens the application handler with.
- **Security.** Commands go to the portal origin only (not `'*'`), answers are accepted only from `window.parent` and only from the portal origin.
- **Errors** — `BXRestFrameError` with a `code` field: `NOT_IN_FRAME` (the page is not opened in an application iframe, fails right away), `TIMEOUT`, `NO_AUTH`, `BAD_RESPONSE`, `CANCELLED`, `ACCESS_DENIED`. Wrong arguments of `resizeWindow()` and `scrollParentWindow()` are a `TypeError`.

> **The protocol is internal and undocumented.** The messages between an application and a Bitrix24 portal are not described in the documentation and may change without notice. `BXRestFrame` is tested against a fake portal, not against a live one.

<details>
<summary>What BXRestFrame is based on</summary>

`BXRestFrame` follows BX24.js — `https://api.bitrix24.com/api/v1/`, downloaded 2026-10-29, `Last-Modified: 2022-03-17`, SHA-256 `945ad491df8ffb7490b89f4914a439b5a3f575c950c3480562815716a3e07f23`. It is checked against the portal side, `/bitrix/js/rest/applayout.js` (`Last-Modified: 2024-05-15`, SHA-256 `3efd6ab57a4778493a26d10ae0987a82e19fc012ed9935f5c6afa78c4052fcb5`), and against the BX24.js documentation.

</details>

## Custom REST methods

Your own methods are called through `Navvy`, exported from `bx-rest`. In Angular, register the `NavvyProvider` from [Usage in Angular](#usage-in-angular) and inject `Navvy` into your service. A method name is an array of parts, joined with dots before the request is sent.

See the [Bitrix24 documentation](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=99&LESSON_ID=7985) for registering your own REST methods on a portal.

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

`simple()` fits a method that returns one response without pages:

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

The result has `.res()`, `.resVanilla()` and `.mapForVanilla()`.

### A paginated custom method with `pagNav()`

`pagNav()` fits a Bitrix response that is an array with the standard `start`, `next` and `total` pagination fields. The parameter type must support `start?: number`.

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

The result also has `.resAll()`, which loads and combines all pages.

If the method's `result` is an object with the list under a key, such as `{ items: [...] }`, use `pagNavKeyed()`; its third argument is the list key. `.res()` returns the object as is, `.resAll()` the same object with the records of all pages under the key:

```typescript
type BlogItems = { items?: iBXRestCustomBlogGetHttp[] }

this.navvy.pagNavKeyed<BlogItems, BlogItems, iBXRestCustomParamBlogList>(
  ['blog', 'item', PNM.$list],
  param,
  'items'
)
```

If the method pages by offset and returns `total`, use `pagNavOffset()`. Its third argument holds the parameter names and the page size, and `.resAll()` requests the rest of the pages in packs:

```typescript
this.navvy.pagNavOffset<iBXRestCustomBlogGetHttp[], iBXRestCustomBlogGet[], { OFFSET?: number, LIMIT?: number }>(
  ['blog', 'post', PNM.$list],
  param,
  { offset: 'OFFSET', limit: 'LIMIT', pageSize: 50, maxPageSize: 200 },
  BXCustomBlogMap.get
)
```

If the next page is known only from the response to the previous one (by a flag, a cursor or a short page), use `pagNavSequential()`, or `pagNavSequentialV3()` for REST v3. The third argument describes the paging: `next()` takes the parameters and the result of a page and returns the parameters of the next page, or `undefined` if the page was the last one:

```typescript
type BlogFeed = { items: iBXRestCustomBlogGetHttp[], nextCursor: string | null }

this.navvy.pagNavSequential<BlogFeed, BlogFeed, { cursor?: string }>(
  ['blog', 'feed', PNM.$list],
  param,
  {
    next: (param, result) => (result.nextCursor ? { ...param, cursor: result.nextCursor } : undefined),
    keys: ['items'],
  }
)
```

- `keys` are the keys of the lists if `result` is an object. The records under them are collected from all pages, the other fields come from the last page.
- `first()` gives the parameters of the first page, for example an explicit page size.
- `unique` is the record field used to drop repeats when pages overlap.

The types of these settings are `BXRestOffsetNav` and `BXRestSequentialNav`.

## Specific methods

### `tasks.task.list`

The first generic argument selects built-in task fields, the second adds the user fields of your portal:

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

### Push & Pull

The `pull` section returns the settings for connecting to the Push & Pull server and sends application events. The library has no websocket client: connect with your own client following the [protocol description](https://apidocs.bitrix24.com/settings/interactivity/custom-push-and-pull-client.html) or with `PullClient` from [b24jssdk](https://github.com/bitrix24/b24jssdk).

```typescript
import { firstValueFrom } from 'rxjs'
import { BXRestNavvy } from 'bx-rest'

const bxRest = new BXRestNavvy()

// Server addresses and channels for the client to connect
const config = await firstValueFrom(bxRest.pull.application.config.get().res())
console.log(config?.server.websocket_secure, config?.channels.private.id, config?.exp)

// An event in the shared channel of the application: every subscribed client gets it
await firstValueFrom(bxRest.pull.application.event.add({
  COMMAND: 'grid:update',
  PARAMS: { grid_id: 15 },
}).res())
```

| Method | What it does |
| --- | --- |
| `pull.application.config.get(param?)` | Connection settings for the application: server addresses, the `shared` and `private` channels, public channels, `exp`, and with the right server version `clientId` or `jwt`. Channel dates are `Date`. |
| `pull.application.event.add(param)` | An event in the application channel: without `USER_ID` in the shared `shared` channel, with it in the users' personal channels. |
| `pull.application.push.add(param)` | A push notification to the Bitrix24 mobile app. For portal administrators only. |
| `pull.config.get(param?)` | Connection settings for a user. The method is not in the Bitrix24 documentation, so it is marked `@experimental`. |
| `pull.channel.public.get()` | A public Push & Pull channel. |

- **`pull.application.*` methods** work only in an application context, with its OAuth token. Through a webhook the portal answers `WRONG_AUTH_TYPE`.
- **`true` in the response** of `event.add` and `push.add` means "accepted for sending", not "delivered".
- **`USER_ID` for a non-administrator.** They can send an event only to themselves, and `USER_ID` must then be a string: `'577'`. The portal rejects a number or an array with `USER_ID_ACCESS_ERROR`.
- **The settings are personal:** the `private` channel belongs to the user whose token makes the request. Request them again when `exp` or the channels' `end` expires.

## Date parsing

Some methods (`calendar.section.get`, `calendar.event.get`, `crm.calllist.*`) return dates as strings in the format set in the portal settings (Settings → date and time format), not in ISO. That format is not known in advance. If you know it, pass it as the last argument, `dateTimeFormat`:

```typescript
import { BXRestNavvy } from 'bx-rest'

const bxRest = new BXRestNavvy()

// Portal-specific date/time format, e.g. from Settings → date and time format.
const dateTimeFormat = 'yyyy-MM-dd HH:mm:ss'

bxRest.calendar.event.get({ FROM: '01.01.2026', TO: '31.01.2026' }, dateTimeFormat).res()
bxRest.calendar.section.get({}, dateTimeFormat).res()
bxRest.crm.callList.get({ ID: 1 }, dateTimeFormat).res()
```

The format of date-only fields (`EXDATE` and `RRULE.UNTIL` of `calendar.event`) is derived from `dateTimeFormat` by dropping `HH:mm:ss`: the day, month and year order is the same on a given portal.

The mappers parse the string with `BXBaseServices.toDate()`, trying in order:

1. **The given format:** `dateTimeFormat` or the mapper's default format. It understands `yyyy`, `MM`, `dd`, `HH`, `mm`, `ss` and their single-letter variants, and takes the separators from the format string.
2. **Common Bitrix24 formats:** `'dd.MM.yyyy HH:mm:ss'`, `'yyyy-MM-dd HH:mm:ss'`, `'dd.MM.yyyy'`, `'yyyy-MM-dd'`.
3. **Parsing by position.** The year is four digits at the start or the end of the date, the month is always the middle part, and any separator works (`.`, `-`, `/`, space). Values are range-checked: month 1–12, day 1–31, hours, minutes and seconds. A date that does not exist, such as February 31, is an error rather than silently rolling over into March.

Step 3 gets the US order `MM/dd/yyyy` wrong: if the day is 12 or less, day and month are silently swapped, and if it is more, the string does not parse. For portals with that format, pass `dateTimeFormat`.

## SessionKeyServices

`SessionKeyServices` shows which token and address the library takes from the global `BXRestSettings`. Use it to check the authorization before making requests:

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

## Demo

The demos are on GitHub Pages: [start page](https://aricatofuka.github.io/bx-rest/), [Vue](https://aricatofuka.github.io/bx-rest/vue/), [React](https://aricatofuka.github.io/bx-rest/react/), [Angular](https://aricatofuka.github.io/bx-rest/angular/). They are built from the latest release.

Each demo has a connection form with every option from [Authentication and OAuth2](#authentication-and-oauth2), a Monaco editor with suggestions from the `bx-rest` types, and a panel that runs your code against the portal. The UI is in Russian or English, depending on the browser language.

- **Connect a test portal** with a webhook or an access token: the connection, including the token, is saved in the browser's `localStorage`.
- **The demos cannot be installed in a portal as an app:** Bitrix24 opens apps with a POST request, and GitHub Pages does not accept it.

The sources are in [`projects/`](https://github.com/Aricatofuka/bx-rest/tree/main/projects): `demo-angular`, `demo-vue` and `demo-react`, with the shared part in `demo-shared`. The demos differ in how they wire up the client, as in the Angular, Vue and React sections above. To run them locally, from the repository root:

```shell
npm run demo:bootstrap
```

Then, in the folder of the demo you want: `npm run dev`, for Angular `npm start`. See each demo's own README for details.

`projects/demo-node` is a Node.js demo without a UI. It shows two portals in one process, `retryOnQueryLimit`, `throttle`, `timeout`, your own `middleware` for logging and handling `BXRestApiError`. `npm run mock` runs it against a built-in mock portal, `npm start` against a real portal using the incoming webhook address from `BX_WEBHOOK_A`. On a portal the demo only reads data.

## Future features

- Auto get token
- Mappers for normalization types

Have a feature request or found a bug? Check [existing issues](https://github.com/Aricatofuka/bx-rest/issues) or open a new one.

## License

[MIT](https://github.com/Aricatofuka/bx-rest/blob/main/LICENSE) © Aricatofuka
