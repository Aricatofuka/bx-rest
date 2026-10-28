# Changelog

Все заметные изменения пакета `bx-rest` фиксируются в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
версионирование — на [Semantic Versioning](https://semver.org/lang/ru/).
История до версии 1.0.0 здесь не восстанавливалась — смотрите `git log` для
более ранних изменений.

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
