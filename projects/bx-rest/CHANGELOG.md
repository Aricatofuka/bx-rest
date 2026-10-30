# Changelog

Все заметные изменения пакета `bx-rest` фиксируются в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
версионирование — на [Semantic Versioning](https://semver.org/lang/ru/).
История до версии 1.0.0 здесь не восстанавливалась — смотрите `git log` для
более ранних изменений.

## [1.4.0] - 2026-10-29

### Added

- Автоматическое продление авторизации — `BXRestSettings.auth.refresh`.
  Если запрос упал с ошибкой авторизации, библиотека вызывает эту функцию и
  повторяет запрос один раз, заново читая токен, адрес и заголовки из
  настроек. Работает во всех запросах: `.res()`, `.resAll()` (включая
  batch), `.resVanilla()`, `.mapForVanilla()`, `BXRestRequest.post()`/`.get()`,
  `BXRest.batch()`. Одновременно упавшие запросы ждут одно общее продление.
  Если продление упало, наружу уходит исходная ошибка запроса, а причина —
  в её поле `authRefreshError` (`getAuthRefreshError(err)`). Без
  `auth.refresh` запросы не повторяются, как и раньше.
- `isBXRestAuthError()` — условие продления по умолчанию: ошибка Bitrix
  `expired_token` или `invalid_token`, либо ответ 401 без тела ошибки Bitrix
  (например, пустой 401 от бэкенд-прокси). Другие ошибки Bitrix со статусом
  401 (`insufficient_scope`, `ACCESS_DENIED`, ...) продлением не лечатся и не
  повторяются. Условие переопределяется через `auth.isAuthError`.
- `BXRestFrame` — команды порталу из iframe приложения без подключения
  BX24.js: те же команды и имена, что у BX24.js, но с промисами вместо
  колбэков. Данные запуска (`init()`), токен приложения (`getAuth()`,
  `refreshAuth()`), установка (`installFinish()`, `firstRunFinish()`), размер
  и заголовок фрейма, прокрутка и перезагрузка страницы, диалоги выбора
  сотрудников, прав доступа и объектов CRM (с отменой через `signal`),
  слайдеры (`openApplication()`, `openPath()`, `closeApplication()`),
  мессенджер (`im.*`), встраивания (`placement.info/getInterface/call/bindEvent`)
  и настройки (`userOption`, `appOption`). Ошибки — `BXRestFrameError` с
  полем `code`. Использует внутренний недокументированный протокол
  postMessage, который Bitrix24 может изменить; сверен с BX24.js от
  2022-03-17 и с ответной стороной портала — подробности в README, раздел
  «Работа в iframe без BX24.js».
- У `BXRestApiError` появилось поле `authRefreshError`.

### Changed

- Обычный `Error`, которым `.res()` завершается на ответ не от Bitrix
  (например, HTML-страницу или пустой 401 от прокси), теперь хранит исходную
  ошибку axios в `cause` — с HTTP-статусом в `cause.response.status`. Тип и
  текст ошибки прежние.

## [1.3.0] - 2026-10-28

### Added

- `BXRestSettings.headers` — статичные HTTP-заголовки, которые прикладываются
  к каждому запросу (например, `{ 'X-Bitrix-App': 'smart-process-pro' }`).
- `.withHeaders()` у Navvy-запросов — заголовки только для одного запроса,
  поверх `BXRestSettings.headers`. Действуют и на batch-запросы `.resAll()`.
  `BXRestRequest.post()`/`.get()` и `BXRest.batch()` принимают те же заголовки
  последним необязательным аргументом.
- `Content-Type` библиотека по-прежнему выставляет сама — заголовками он не
  перебивается.

## [1.2.0] - 2026-10-28

### Fixed

- `.res()` терял код и описание ошибки Bitrix, если портал отвечал со
  статусом не 2xx — а так Bitrix отдаёт большинство ошибок (`expired_token`
  — 401, `QUERY_LIMIT_EXCEEDED` — 503, `Not found` у `crm.*.get` — 400).
  Вместо `Error("AxiosError: Request failed with status code 400")` теперь
  приходит `BXRestApiError` с `error` и `error_description` — с
  `throwOnApiError` и без него. Поддерживается и формат ошибок REST v3
  (`{ error: { code, message } }`). Сетевые ошибки и ответы не от Bitrix
  (например, HTML-страница прокси) по-прежнему приходят обычным `Error`.

### Added

- У `BXRestApiError` появились поля `status` (HTTP-статус; `undefined`, если
  ошибка пришла в теле ответа 2xx), `method` (REST-метод) и `cause` (исходная
  ошибка axios с полным телом ответа в `cause.response.data`). Конструктор
  принимает их третьим необязательным аргументом — существующие вызовы
  `new BXRestApiError(error, error_description)` работают как раньше.

## [1.1.0] - 2026-10-09

### Fixed

- `HttpBXServices.get()` теперь резолвит `BXRestSettings` (источник авторизации
  и базовый URL) лениво, в момент подписки — так же, как уже делает `post()`.
  Раньше GET-запросы читали настройки сразу в момент вызова `get()`, что могло
  "заморозить" устаревшие значения, если настройки меняются между вызовом и
  подпиской.
- `npm run lint` чинится: конфиг ESLint ошибочно включал базовые правила
  `no-dupe-class-members`/`no-redeclare` (ложно срабатывают на валидных
  TS-перегрузках методов и функций) и не знал про `globals.node`, из-за чего
  `process` в тестах ловился как неизвестная переменная.

### Changed

- `BXRestSettings.date` переименован в `BXRestSettings.value` — имя `date` не
  отражало содержимое (настройки auth/urls, а не дату). `date` оставлен как
  `@deprecated`-алиас для обратной совместимости.

## [1.0.0] - 2026-09-08

Первый релиз, помеченный как стабильный (1.0.0).
