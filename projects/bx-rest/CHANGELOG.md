# Changelog

Все заметные изменения пакета `bx-rest` фиксируются в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
версионирование — на [Semantic Versioning](https://semver.org/lang/ru/).
История до версии 1.0.0 здесь не восстанавливалась — смотрите `git log` для
более ранних изменений.

## [Unreleased]

### Added

- Клиент со своими настройками: `new BXRestNavvy(settings)`. Все запросы
  такого клиента идут на его портал с его токеном, продление авторизации у
  него своё, а `BXRestSettings` на него не влияют. Так в одном процессе можно
  работать с несколькими порталами. `new BXRestNavvy()` без аргумента
  работает с глобальными `BXRestSettings`, как раньше. Подробнее — в разделе
  README «Несколько порталов».

### Removed

- У `BXRestRequest` удалены публичные члены, которые библиотека не
  использовала: `defSettings`, `getHttpParamsPost()`, `sliceArrayIntoChunks()`
  и `removingMultipleSlashes()`. Они достались от внутреннего базового класса
  и запросы не отправляли. `post()`, `get()`, `httpPost()` и `httpGet()` не
  изменились. Код, который обращался к удалённым членам, перестанет
  компилироваться.
- Из `bx-rest/services/navvy` удалён абстрактный класс `NavvySupport`:
  библиотека его не использовала. Тип `ReturnTypeNavvy` остался.
- Из `bx-rest` удалён класс `HttpNavvyServices` вместе с его типами
  `iBXRestParams` и `iBXRestAnswers`. Он отправлял запросы с типами для
  небольшого набора методов, сама библиотека его не использовала, а в README
  он не описан. Вместо него используйте `BXRestNavvy` или
  `BXRestRequest.post()`.
- Из исходников удалены 63 модуля, недостижимых из точек входа пакета (старый
  слой `request/*`, `rest/base`, `functions/errorHandler`, `isDate`, `isEqual`,
  `isValidDate`, `serializeJavascript`, `services/permission` и другие), и
  закомментированный код. В собранный пакет эти модули не попадали и раньше,
  поэтому для приложений ничего не меняется.

## [1.5.1] - 2026-11-05

### Added

- Типы `iBXRestSettings` и `BXRestApiErrorDetails` экспортируются из `bx-rest`,
  а `iBXRestSettings` — ещё и из `bx-rest/typification/settings`, где его раньше
  не было. Новый подпуть `bx-rest/typification/batch` — типы `batch`.

### Changed

- `.resAll()` теперь завершается ошибкой `BXRestApiError`, если любая страница
  внутри batch-запроса вернула ошибку (`result_error`) или сам batch-запрос
  вернул ошибку в теле ответа 2xx. Раньше такие страницы молча пропускались, и
  вызывающий код получал неполный список как полный. Код, который рассчитывал
  на частичный результат, должен обрабатывать ошибку.
- `iBXRestUser.DATE_REGISTER` и `iBXRestUser.PERSONAL_BIRTHDAY` стали
  необязательными: см. исправление `user.get` ниже. Код, который обращается к
  этим полям без проверки, перестанет компилироваться в режиме `strict`.
- Отписка от `.resAll()` останавливает запрос оставшихся страниц. Уже
  отправленный HTTP-запрос не отменяется. `.resAll()` по-прежнему кэширует
  завершённый результат там, где делал это раньше.
- `.resAll()` у всех видов пагинации отправляет batch-запросы по 50 команд.
  Раньше `pagNavResultKeyObject` отправлял отдельный batch на каждую страницу.

### Fixed

- `.resAll()` у `pagNavWithUselessKey` (`lists.field.get`) складывал страницы
  после первой под числовые ключи вместо объединения полей, а без своего `map`
  накапливал результат между запусками одного и того же объекта запроса.
- `.resAll()` падал с `RangeError: Maximum call stack size exceeded` на списках
  примерно от 124 тысяч записей.
- `.resAll()` у `pagNav` при нескольких одновременных подписчиках мог отдавать
  записи по два раза: подписчики делили один массив результата.
- `.resAll()` учитывает параметры запроса: при заданном `start` страница больше
  не запрашивается повторно, а `alterPagNav` при `nPageSize` меньше 50 загружает
  все страницы — раньше он отдавал только часть записей.
- `.resAll()` у `pagNavTasks`, `pagNavWithUselessKey` и `alterPagNav` не
  запрашивает лишнюю пустую страницу, если число записей кратно размеру страницы.
- Ответ 2xx не от Bitrix (например, HTML-страница входа от прокси) больше не даёт
  `TypeError: Cannot use 'in' operator...`: `.res()` и `.resAll()` завершаются
  обычным `Error` с названием метода. Пустое тело `.res()` по-прежнему отдаёт как
  `undefined`, а `.resAll()` завершается той же ошибкой.
- `isBXRestAnswerSuccess()` и `BXRestMapResult()` падали с `TypeError`, если им
  передавали не объект.
- `BXRestRequest.get()`:
  - вложенные параметры уходили как `filter=[object Object]`, а массивы — как
    `select=ID,TITLE`. Теперь они сериализуются так же, как в POST;
  - при `auth.key: 'OAuth2'` токен попадал в адрес запроса как `OAuth2=...`.
    Теперь он не отправляется, как и в POST.
- `BXRestSettings.withCredentials` не действовал на запросы `.get()` и на
  POST-запросы при `auth.key: 'sessid'`.
- `toDate()` превращал несуществующие даты в соседние (`31.02.2026` — в 3 марта).
  Теперь это ошибка `Wrong date format`, как и у других неверных дат.
- `user.get`, `user.current` и другие методы с тем же маппером: пустой
  `PERSONAL_BIRTHDAY` давал `Invalid Date`, а ответ без `DATE_REGISTER` или
  `PERSONAL_BIRTHDAY` завершал весь запрос ошибкой. Теперь в этих случаях поле
  равно `undefined`.
- `bizProc.startProcFormNewsFeed()` заменял текущей датой любую переданную строку
  `DATE_CREATE` и падал с `TypeError`, если передать `Date`.
- `task.elapsedItem.operation.getListByIDTask([])` завершался без значения, и
  `firstValueFrom` падал с `EmptyError`. Теперь пустой список задач даёт `[]` без
  запроса. В ошибке `operation.add()` исправлен текст: «Отсутствуют права на
  добавление записи затраченного времени».
- `new BXRestMap().disk` возвращал класс запросов вместо маппера, а
  `.task.commentItem`, `.task.elapsedItem`, `.task.stages`, `.tasks.task` и
  `.tasks.task.result` были недоступны.
- Импорт одного класса больше не тянет в бандл всю библиотеку: `BXRestFrame` без
  остальной библиотеки весит около 8 КБ вместо 117 КБ. Мешали статический
  инициализатор и декораторы, которые выполнялись при загрузке модуля. В
  результате убрано статическое поле `BXRestNavvyPullConfig.public` — оно нигде не
  использовалось, а сам класс не экспортируется.

### Security

- `.res()` и `.resAll()` больше не пишут ошибки запроса в `console.error`:
  в `AxiosError` лежит конфигурация запроса с токеном авторизации, и он мог
  попасть в журналы браузера и системы сбора ошибок. Ошибка по-прежнему приходит
  подписчику. Токен остаётся в `cause.config` у `BXRestApiError` — не логируйте
  и не отправляйте `cause` целиком.
- Минимальная версия `axios` поднята до 1.21.0: в версиях до 1.19.0 включительно
  есть уязвимости высокой степени. В `package-lock.json` также обновлён
  `follow-redirects` до 1.16.2.

## [1.5.0] - 2026-11-02

### Added

- Типы для универсальных методов CRM, раньше здесь было `Record<string, unknown>`:
  - теперь `iBXRestCrmItem` — элемент в `crm.item.list`, с ответом `iBXRestCrmItemResult`
    и в `crm.item.add`, `crm.item.get`, `crm.item.update`. Описаны поля, общие
    для типов объектов; `parentId<entityTypeId>` и `ufCrm...` доступны по индексу.
    В `crm.item.list` при заданном `select` поле `id` приходит, только если
    указано в нём, поэтому там оно необязательное;
  - `iBXRestCrmItemField`, `iBXRestCrmItemFieldType`,
    `iBXRestCrmItemFieldSettings` и `iBXRestCrmItemFieldsResult` — ответ
    `crm.item.fields`;
  - `iBXRestCrmType` — смарт-процесс в `crm.type.list`, а через
    `iBXRestCrmTypeResult` и в `crm.type.add`, `crm.type.get`,
    `crm.type.getByEntityTypeId`, `crm.type.update`.
- Подпуть `bx-rest/typification/crm`: типы CRM теперь можно импортировать, как и
  остальные разделы `typification`.

### Fixed

- Списки на `Navvy.pagNavResultKey` без своего `map` (`crm.item.list`,
  `crm.type.list`, `crm.category.list`, `socialnetwork.api.workgroup.list`):
  - `.resAll()` падал с `TypeError: Spread syntax requires ...iterable`, если
    записей было 50 или меньше;
  - `.res()` и `.mapForVanilla()` отдавали весь объект `{ items: [...] }`, хотя
    по типу возвращали массив. Теперь они отдают массив. Код, который читал
    `result.items` в обход типов, нужно поправить.
- То же при прямом вызове `Navvy` без своего `map`. Методов SDK это не касается,
  они передают свой `map`:
  - `Navvy.pagNavTasks`: `.resAll()` падал с тем же `TypeError`, а `.res()` и
    `.mapForVanilla()` отдавали весь объект `{ tasks: [...] }`;
  - `Navvy.pagNavResultKeyObject`: `.res()` и `.mapForVanilla()` отдавали весь
    объект `{ ключ: { id: значение } }`. Теперь они отдают массив значений.
- `crm.documentgenerator.template.list` и другие списки на
  `Navvy.pagNavResultKeyObject`: `.resAll()` падал с `EmptyError`, если записей
  было больше 50.
- `.resAll()` при ошибке Bitrix в теле ответа 2xx теперь завершается ошибкой
  `BXRestApiError` с кодом и описанием. Раньше код терялся: `pagNav` завершался
  без значения, `pagNavWithUselessKey` (`lists.field.get`) отдавал `undefined`,
  а остальные падали с `EmptyError`. Ошибки со статусом не 2xx `.resAll()`
  по-прежнему отдаёт исходной ошибкой axios.

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
