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
- [HTTP headers](#http-headers)
- [Error handling](#error-handling)
- [Authorization refresh](#authorization-refresh)
  - [A token from the portal without BX24.js](#a-token-from-the-portal-without-bx24js)
  - [Recipe: straight to the portal](#recipe-straight-to-the-portal)
  - [Recipe: through a backend proxy](#recipe-through-a-backend-proxy)
- [Working in an iframe without BX24.js](#working-in-an-iframe-without-bx24js)
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

## HTTP headers

Put static headers that every request needs into `BXRestSettings.headers`:

```typescript
BXRestSettings.update({
  headers: {
    'X-Bitrix-App': 'smart-process-pro'
  }
})
```

They are attached to every request the library makes, including the `.resAll()` batch requests, and, like the other settings, are read at subscribe time. `update()` merges settings only at the top level, so `headers` is replaced as a whole — to add a header to the ones already set, pass the full set.

For a single request, use `.withHeaders()`. Its headers are applied on top of `BXRestSettings.headers`; when a name matches (case-insensitively), the `.withHeaders()` value wins. It applies to `.res()`, `.resAll()`, `.resVanilla()` and `.mapForVanilla()`:

```typescript
const deals = await firstValueFrom(
  bxRest.crm.deal.list({ select: ['ID', 'TITLE'], filter: {}, start: 0 })
    .withHeaders({ 'X-Request-Source': 'report' })
    .resAll()
)
```

The library always sets `Content-Type` itself (`application/json`, or `application/x-www-form-urlencoded` for `auth.key: 'sessid'`): the server parses the request body based on it, so headers can't override it.

For cross-origin requests, the server — the portal or your proxy — must allow a non-standard header in `Access-Control-Allow-Headers` of its CORS preflight (`OPTIONS`) response, or the browser will block the request. The header doesn't add an extra request: the library's JSON requests already go through a preflight because of `Content-Type: application/json`.

## Error handling

`.res()` can fail in three ways — which one depends on how the portal answered.

| Failure | How it surfaces on `.res()` |
| --- | --- |
| Bitrix API error with a non-2xx HTTP status — this is how Bitrix sends most errors: `expired_token` (401), `ERROR_METHOD_NOT_FOUND` (404), `QUERY_LIMIT_EXCEEDED` (503), `Not found` from `crm.*.get` (400) | The returned `Observable` errors with a `BXRestApiError`, with or without `throwOnApiError`. |
| Bitrix API error in the body of a 2xx response | By default, `.res()` resolves normally with `undefined` — **it does not throw**. Pass `{ throwOnApiError: true }` to make it throw a `BXRestApiError` instead. |
| Transport / configuration errors — network failure, missing auth, missing base URL, a response that is not from Bitrix (e.g. a proxy's HTML error page) | The returned `Observable` errors with a plain `Error`. The original error is in its `cause`: for a response that is not from Bitrix it is the axios error, with the HTTP status in `cause.response.status`. |

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
        // auth.refresh is not set or did not help — see "Authorization refresh"
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

## Authorization refresh

With `auth.refresh` set, the library refreshes an expired authorization by itself. When a request fails with an authorization error, the library calls `auth.refresh()` and retries the request, and your code just gets the result.

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
| `refresh` | `() => Promise<unknown>`. Gets a new authorization. The promise value is not used: the retry reads the token, the URL and the headers from the settings again — so the function has to put the new token where `auth.source` reads it from (or, through a proxy, hand it to the server). |
| `isAuthError` | `(error: unknown) => boolean`, optional. Which request error counts as an authorization error. It gets the original HTTP request error — usually an `AxiosError`. Defaults to the exported `isBXRestAuthError`, which is easy to extend: `error => isBXRestAuthError(error) \|\| myCheck(error)`. |

Without `auth.refresh` the library behaves as before: requests are not retried. `update()` merges settings at the top level only, so `BXRestSettings.update({ auth: {...} })` replaces the whole `auth` — `refresh` included. When you change `auth`, pass `refresh` again.

How the retry works:

- **What counts as an authorization error** (`isBXRestAuthError`): a response with the Bitrix error `expired_token` or `invalid_token`, whatever the HTTP status; a 401 response without a Bitrix error body — e.g. an empty 401 from a backend proxy that has no valid token. The other Bitrix system errors come with status 401 too (`insufficient_scope`, `NO_AUTH_FOUND`, `ACCESS_DENIED`, `INVALID_CREDENTIALS`, `user_access_error`, `OVERLOAD_LIMIT`), but a new token does not fix them — they are not retried.
- **One retry.** If the retry fails as well, its error goes out; there is no second refresh.
- **One refresh for everybody.** When several requests fail at once, `refresh()` is called once and all of them are retried. A request that was in flight while the token was being refreshed is retried without another refresh.
- **The refresh failed** (`refresh()` rejected or threw) — the original request error goes out, and the reason the refresh failed is in its `authRefreshError` field. `getAuthRefreshError(err)` reads it from any error:

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

- **Where it works.** In every library request: `.res()`, `.resAll()` (the first page and every batch request), `.resVanilla()`, `.mapForVanilla()`, `BXRestRequest.post()`/`.get()`, `BXRest.batch()`. The retry lives in the HTTP layer, so `.res()` already gets the result of the retry.
- **What is not retried:** errors in the body of a 2xx response (Bitrix sends `expired_token` with status 401) and errors of single commands inside a successful batch response (`result_error`) — the whole HTTP request is what gets retried.

### A token from the portal without BX24.js

A browser cannot refresh a token through OAuth — that takes the `client_secret`. But the application is open in a portal iframe, the user is logged in to the portal, and the portal itself hands the application a token over postMessage — this is how `BX24.getAuth()` and `BX24.refreshAuth()` work. `BXRestFrame` does the same without loading BX24.js (the other BX24.js commands are in [Working in an iframe without BX24.js](#working-in-an-iframe-without-bx24js)):

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
- **Errors** — `BXRestFrameError` with a `code` field: `NOT_IN_FRAME` (the page is not opened in an application iframe — fails right away), `TIMEOUT` (the portal did not answer within `timeout`, 10 seconds by default), `NO_AUTH` (the portal answered without a token), `BAD_RESPONSE` (the answer could not be parsed). When the portal cannot issue a new token (e.g. the application trial or paid period is over), it shows the "Unable to get new token!" `alert` and does not answer at all — such a refusal comes as `TIMEOUT`.
- **`getAuth()` and the expiry.** The portal gives the token lifetime at the moment of issue, not what is left of it, so on a page that has been open for a while `expires_in` from `getAuth()` points too far ahead (the same with BX24.js). Use `refreshAuth()` for a fresh token.
- **The portal domain.** Like BX24.js, `BXRestFrame` cannot vouch for it — it is set by whoever embedded the page in an iframe. So a server must check a token that came from the browser with the portal before trusting it.

### Recipe: straight to the portal

The frontend keeps the token, requests go to `https://<portal>/rest/`. The refresh function gets a new token from the portal and puts it where `auth.source` reads it from — an in-memory variable here:

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

The server keeps the token, and the browser authorizes with the proxy through a cookie session (`auth.source: 'off'`). A proxy without a valid token answers 401 with an empty body — an authorization error by default. The refresh function gets a new token from the portal and sends it to the server:

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

Errors of the refresh function end up in `authRefreshError` of the original error, and `.res()` may print the original error to the console — so keep tokens out of the error messages of the refresh function.

## Working in an iframe without BX24.js

`BXRestFrame` is the commands an application in an iframe sends to the portal: the frame size, the selection dialogs, sliders, the messenger, placements, options, installation. The same commands and the same names as in BX24.js, but with promises instead of callbacks, and with no need to load BX24.js. bx-rest itself makes the REST requests, and `getAuth()`/`refreshAuth()` give the token for them (see [Authorization refresh](#authorization-refresh)).

```typescript
import { BXRestFrame } from 'bx-rest'

const frame = new BXRestFrame()

const { lang, isAdmin, placement } = await frame.init()
await frame.fitWindow()
const user = await frame.selectUser()
const unsubscribe = frame.placement.bindEvent('Tab:onChange', data => console.log(data))
```

Create one instance per page, when the application starts: the portal parameters are read in the constructor, and the portal reports the first run only in its first answer per page load. For the same reason, do not use `BXRestFrame` and BX24.js on one page.

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

How the portal answers a command decides when the promise settles:

- **With an answer** (`init()`, `getAuth()`, `refreshAuth()`, `placement.getInterface()`, `appOption.set()`) — no answer within `timeout` (10 seconds by default) is a `TIMEOUT` error.
- **With an acknowledgement** (`resizeWindow()`, `fitWindow()`, `setTitle()`, `scrollParentWindow()`, `userOption.set()`, `firstRunFinish()`, `placement.call()`) — in some placements the portal does not answer them, so without an answer within `timeout` the promise resolves with `undefined`, not with an error.
- **Without an answer** (`reloadWindow()`, `closeApplication()`, `installFinish()`, `im.*`) — the promise resolves right after sending.
- **Waiting for the user** (`select*()`, `openApplication()`, `openPath()`) — with no time limit. When the user closes a dialog without selecting anything, the portal does not answer at all. Cancel the wait with `signal` (`AbortController`); calling the same dialog again cancels the previous wait, because the portal keeps one handler per dialog. A cancelled wait is a `CANCELLED` error.

`placement.bindEvent()` returns an unsubscribe function, but it only stops calling `handler`: the protocol has no way to cancel the subscription on the portal side.

- **Where it looks for the portal.** Like BX24.js, in `window.name`: the portal names the application iframe `DOMAIN|PROTOCOL|APP_SID`. If it is empty — in the page query (`?DOMAIN=…&PROTOCOL=…&APP_SID=…`) the portal opens the application handler with.
- **Security.** Commands go to the portal origin only (not `'*'`), answers are accepted only from `window.parent` and only from the portal origin.
- **Errors** — `BXRestFrameError` with a `code` field: `NOT_IN_FRAME` (the page is not opened in an application iframe — fails right away), `TIMEOUT`, `NO_AUTH`, `BAD_RESPONSE`, `CANCELLED`, `ACCESS_DENIED`. Wrong arguments of `resizeWindow()` and `scrollParentWindow()` are a `TypeError`.

> **The protocol is internal and undocumented.** The messages between an application and a Bitrix24 portal are not described in the documentation and may change without notice. `BXRestFrame` follows BX24.js — `https://api.bitrix24.com/api/v1/`, downloaded 2026-10-29, `Last-Modified: 2022-03-17`, SHA-256 `945ad491df8ffb7490b89f4914a439b5a3f575c950c3480562815716a3e07f23` — and is checked against the portal side, `/bitrix/js/rest/applayout.js` (`Last-Modified: 2024-05-15`, SHA-256 `3efd6ab57a4778493a26d10ae0987a82e19fc012ed9935f5c6afa78c4052fcb5`), and against the BX24.js documentation. It is tested against a fake portal, not against a live one.

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