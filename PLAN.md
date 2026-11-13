# План развития bx-rest

Обновлён 2026-11-13 (раздел 2 сделан). Здесь только открытые пункты и принятые решения. Что уже выпущено, описано в [CHANGELOG](projects/bx-rest/CHANGELOG.md).

Последний выпуск — 1.7.0 (2026-11-11, коммит `e25ed81`, опубликован в npm).

| Раздел | Статус |
| --- | --- |
| [1. Проверки на портале](#1-проверки-на-портале) | Тестируется |
| [2. Пагинация: оставшиеся методы](#2-пагинация-оставшиеся-методы) | Сделано, не выпущено |
| [3. Веб-сокеты: клиент pull](#3-веб-сокеты-клиент-pull) | Нужно решение после проверки на портале |
| [4. Учёт времени в задачах](#4-учёт-времени-в-задачах) | Предложения, меняют поведение |
| [5. Отложено](#5-отложено) | Публичный batch, типизация |
| [6. Решения](#6-решения) | Не пересматриваются без обсуждения |
| [7. Без решения](#7-без-решения) | Пока не обсуждалось |

## 1. Проверки на портале

Всё ниже проверено только на заглушках и по документации. Нужен живой портал: вебхук и приложение с OAuth-токеном.

| Что проверить | Зачем |
| --- | --- |
| `getListByIDTask` для задачи, где больше 50 записей времени | С 1.7.0 метод листает страницы по `result_total`. Проверено на локальном сервере, который режет страницу до 50 |
| `getByInterval` с текущим форматом даты и с ISO 8601 | См. [раздел 4](#4-учёт-времени-в-задачах) |
| Ответ `pull.config.get` через вебхук и из приложения | Метода нет в документации, типы сверены только с SDK. После проверки снять `@experimental` ([pull/config.ts:20](projects/bx-rest/src/request-navvy/pull/config.ts#L20)) |
| Ответ `pull.channel.public.get` | Метода тоже нет в документации |
| Приходит ли `total` у `booking.v1.booking.list`, `crm.calllist.list`, `sale.propertyGroup.list`, `tasks.task.history.list` | `start` описан, но в примере ответа нет `total`. Если приходит, перевести на `pagNav` и убрать из исключений в [list-pagination.spec.ts](projects/bx-rest/src/rest/list-pagination.spec.ts) |
| Код ошибки `ERROR_ELEMENT_ALREADY_EXISTS` у `lists.element.add` | На него `startProcFormNewsFeed` повторяет запрос с новым `ELEMENT_CODE`. Код взят из документации |
| `.resAll()` у методов без `start`, хотя бы по одному из каждой группы: `im.dialog.users.list`, `im.recent.list`, `biconnector.dataset.list`, `mail.message.list`, `note.collection.list` | Обход написан по документации и проверен только на заглушке, см. [раздел 2](#2-пагинация-оставшиеся-методы). Особо: шаг по `next` у `im.*`, перекрытие страниц `im.recent.list`, размер страницы `biconnector` |
| Методы, которые клиент перевёл на `rest/api/`: `main.eventlog.list`, `timeman.record.list`, `tasks.task.field.list`, `tasks.task.result.add` | По документации они есть только в REST v3. `tasks.task.access.field.*` и `tasks.task.file.field.*` в документации нет совсем, на REST v3 их перевели по имени. Список сверяет [rest-v3-methods.spec.ts](projects/bx-rest/src/rest/rest-v3-methods.spec.ts) |
| Любой метод REST v3 через вебхук, например `mail.mailbox.list` | С 2026-11-13 запрос уходит на `rest/api/1/CODE/<метод>`, как в документации и b24jssdk. Раньше уходил на `rest/1/CODE/api/<метод>`, проверено только на заглушке ([restApiUrl.ts](projects/bx-rest/src/services/http/restApiUrl.ts)) |

## 2. Пагинация: оставшиеся методы

Сделано 2026-11-13, в CHANGELOG — `[Unreleased]`. `.resAll()` получили 16 методов, которые листаются не через `start`:

| Как листается | Методы | Класс |
| --- | --- | --- |
| `OFFSET`/`LIMIT` с `total` | `im.dialog.users.list`, `im.department.colleagues.list`, `im.search.{chat,department,user}.list` | `NavvyPagOffset`: остальные страницы через `batch` |
| `OFFSET`/`LIMIT` или номер страницы без `total` | `im.recent.list`, `imbot.v2.Bot.list`, `sign.b2e.company.provider.list`, `biconnector.{connector,dataset,source}.list` | `NavvyPagSequential`: по одной странице |
| Объект `pagination` REST v3 | `mail.mailbox.list`, `mail.message.list`, `main.eventlog.list`, `timeman.record.list`, `note.collection.list` (курсор) | `NavvyPagSequential` |

Способы обхода конкретных методов лежат в [sequential-navs.ts](projects/bx-rest/src/services/navvy/sequential-navs.ts), тесты на заглушке портала — в [list-pagination-methods.spec.ts](projects/bx-rest/src/rest/list-pagination-methods.spec.ts). Попутно исправлены `.res()` у `im.dialog.users.list` (маппер падал на массиве) и адрес REST v3 у `main.eventlog.*` и `timeman.record.*`.

Открыто:

- Проверка на портале, см. [раздел 1](#1-проверки-на-портале). Там же ещё 4 метода, у которых не подтверждён `start`.
- `note.document.search.list` листать нельзя: в ответе есть `hasMore`, но нет курсора. Он остаётся в исключениях.
- Остальные исключения — методы без пагинации (отдают весь список одним ответом) и описания полей `*.field.list`, там менять нечего.

## 3. Веб-сокеты: клиент pull

REST-методы раздела доведены в 1.7.0. Клиента веб-сокета в библиотеке нет: настройки подключения она отдаёт, а для самого подключения README отправляет к клиенту из b24jssdk.

Документация Bitrix24 лежит в `settings/interactivity`: [pull.application.config.get](https://apidocs.bitrix24.com/settings/interactivity/pull-application-config-get.html), [event.add](https://apidocs.bitrix24.com/settings/interactivity/pull-application-event-add.html), [push.add](https://apidocs.bitrix24.com/settings/interactivity/pull-application-push-add.html), [свой клиент](https://apidocs.bitrix24.com/settings/interactivity/custom-push-and-pull-client.html).

Что известно о протоколе из официального JS SDK ([b24jssdk/pullClient](https://github.com/bitrix24/b24jssdk/tree/main/packages/jssdk/src/pullClient)):

- настройки он берёт через `pull.config.get`, а для приложения — через `pull.application.config.get`;
- подключается по веб-сокету, а если тот недоступен, переходит на long polling; сообщения идут в JSON-RPC и protobuf;
- сам переподключается, проверяет соединение пингом и раз в минуту перепроверяет настройки;
- клиент приложения только принимает события, а отправляет их приложение через `pull.application.event.add`;
- версия протокола закреплена в коде (`REVISION = 19`) и сверяется с сервером.

Если клиент понадобится, есть два пути:

- **Свой клиент:** `Observable` событий поверх настроек. Придётся повторить протокол SDK: веб-сокет и long polling, JSON-RPC, protobuf, переподключение, продление каналов. Протокол придётся восстанавливать по коду SDK и проверять на живом портале, а при смене ревизии на сервере — догонять.
- **Обёртка над клиентом SDK.** bx-rest отдаёт настройки, а соединение держит `PullClient` из b24jssdk. Надо проверить, подключается ли он без остального SDK, сколько весит и подходит ли лицензия.

Выбирать после проверки ответов на портале, см. [раздел 1](#1-проверки-на-портале).

## 4. Учёт времени в задачах

`new BXRestNavvy().task.elapsedItem.operation` ([operation/elapseditem.ts](projects/bx-rest/src/request-navvy/task/operation/elapseditem.ts)) — методы учёта времени с предварительной проверкой прав. Всё ниже меняет поведение, поэтому ждёт решения.

**Повторные запросы.** Проверено на заглушке сервера:

| Метод | Запросов | Из них повторных |
| --- | --- | --- |
| `add()` | 5 | 2: второй `user.current` и второй `tasks.task.getaccess` с теми же параметрами |
| `update()` | 4 | 0 |
| `del()` | 6 | 2: `isAllowedRemove` вызывает `isActionAllowed`, а тот ещё раз проверяет право на чтение ([строка 331](projects/bx-rest/src/request-navvy/task/operation/elapseditem.ts#L331)) |

Предложение: получать пользователя и ответ `getaccess` один раз и брать из него оба права, а в `del()` вызывать `isActionAllowed` без повторной проверки, как это уже делает `update()`. Тогда `add()` обойдётся тремя запросами, `del()` — четырьмя, а результат останется тем же. Заодно объединить почти одинаковые `checkPermissionAddElapsedTimeToTask` и `checkPermissionReadTask` ([строки 219–261](projects/bx-rest/src/request-navvy/task/operation/elapseditem.ts#L219-L261)).

**Ошибка без пользователя.** Если `user.current` не вернул пользователя, `add()`, `update()` и `del()` сообщают `No permission to read the task`. Причина другая, и текст уводит в сторону. Кроме того, `checkPermissionAddElapsedTimeToTask` в этом случае отдаёт `undefined`, а при отсутствии права — `false`. Предложение: отдельная ошибка. Это меняет текст ошибки.

**Формат даты в `getByInterval`** ([строка 62](projects/bx-rest/src/request-navvy/task/operation/elapseditem.ts#L62)). Фильтр уходит строкой из `toLocaleString('ru-RU')`, на этой машине это `01.11.2026, 0:00:00 GMT+3`. Строка зависит от часового пояса и версии ICU в браузере или Node, а разбирает ли её портал, не проверялось. Предложение: ISO 8601 со смещением через уже существующий `toISOStringWithTimezone` ([base.ts:295](projects/bx-rest/src/services/base.ts#L295)).

**Кэш проверенных прав.** В `add()` и `update()` стоит TODO о сохранении проверенных записей ([строки 266 и 290](projects/bx-rest/src/request-navvy/task/operation/elapseditem.ts#L266)). Если кэш нужен, хранить его в памяти клиента, а не в `sessionStorage`. Если нет, убрать TODO.

Что сделать:

1. Убрать повторные запросы и объединить проверки прав. Добавить тесты на число запросов и на ветки ошибок, сейчас тесты есть только на `getListByIDTask`.
2. Проверить формат даты на портале ([раздел 1](#1-проверки-на-портале)) и перейти на ISO 8601, если портал его принимает.
3. Решить, нужен ли кэш проверенных прав.

## 5. Отложено

- **Публичный batch.** Пока неясно, проблема ли это. Вернёмся, если появится реальная потребность. Заготовка лежит в [rest/navvy.ts:201](projects/bx-rest/src/rest/navvy.ts#L201).
- **Типизация.** На 2026-11-05 720 из 1361 вызовов находились в файлах с обобщёнными типами. Сделать лучше стоит, но после задач выше, вместе со сверкой с документацией из [раздела 7](#7-без-решения).

## 6. Решения

Решено, не пересматривается без обсуждения.

**Секреты не маскируются** ни в ошибках, ни в записи журнала `logRequests` (решения 2026-11-10 и 2026-11-11). Как обращаться с токеном, решает разработчик приложения: ошибка axios доходит до него как есть. Маскировку пробовали в 1.6.0 и убрали: удаление `request` ломало обработку сетевых ошибок по образцу из документации axios.

**Одна точка входа.** Настройки клиента передаются в конструктор: `new BXRestNavvy(settings)`, с 1.7.0 также `new Navvy(settings)` и `new BXRestRequest(settings)`. Отдельной фабрики вроде `createBXRest()` нет. Метода для смены настроек у готового клиента нет: токен меняется через функцию `auth.source`, для другого портала создаётся новый клиент.

**Возможности транспорта — поля настроек:** `retryOnQueryLimit`, `timeout`, `throttle`, `logRequests`, `transport`. Готовые функции для `middleware` не экспортируются. Порядок фиксирован: повтор, очередь `throttle`, таймаут, журнал, свои `middleware`, транспорт (axios или `fetch`).

**Пустой `urls.key`.** Поведение верное, код не меняется. Объяснение — в README, раздел «Обработка ошибок», абзац «Базовый адрес».

| `urls.key` | `additional_part` | Базовый адрес |
| --- | --- | --- |
| Пусто (настройки по умолчанию) | `rest` | `rest/`, запрос идёт относительно текущей страницы |
| Пусто | Пусто | Нет, запрос завершается ошибкой |

**Даты в формате США.** Не беремся. Строки в формате портала приходят только от отдельных методов (`calendar.section.get`, `calendar.event.get`, `crm.calllist.*`), а точный формат можно передать через `dateTimeFormat`. Глобальную настройку не добавляем. Если появится реальный случай, надо учесть, что токенов 12-часового формата у `dateTimeFormat` нет.

## 7. Без решения

Эти пункты пока не обсуждались:

- **Сборка.** ng-packagr и Angular 18 при отсутствии импортов `@angular` в коде, TypeScript закреплён на 5.5. В dev-зависимостях 62 уязвимости (5 критических, 28 высоких), в зависимостях самого пакета — ни одной (проверено 2026-11-12). Вариант: `tsup` или аналог, `isolatedModules` уже проходит. При переходе добавить `esbuild` в dev-зависимости: проверка размера в `npm run check:package` берёт его из `node_modules`, куда он сейчас приходит с `@angular-devkit/build-angular`.
- **Умолчание `.res()`.** Ошибка в ответе 2xx молча становится `undefined`. Смена умолчания `throwOnApiError` ломает совместимость, это единственный мажорный пункт в плане.
- **Единообразие API.** Имена: `sonet_group`, `socialNetWork`, `del` и `delete`, `map/im/gialog`, `getOfCreate…`, `startProcForm…`.
- **Мелочи в коде:**
  - `getSessid()` сохраняет `?sessid=` из адреса в `localStorage` при каждом чтении ([sessionKey.ts:112](projects/bx-rest/src/services/http/sessionKey.ts#L112));
  - `getAuthParams` проглатывает исключения из `source()` ([sessionKey.ts:123](projects/bx-rest/src/services/http/sessionKey.ts#L123));
  - одно плохое значение в строгих `toBool` и `toDate` роняет весь список, а `toNum(null)` даёт 0;
  - комментарий к `parseDateHeuristically` ([base.ts:200](projects/bx-rest/src/services/base.ts#L200)) обещает не угадывать порядок день/месяц, а код угадывает: `03/04/2026` в американском порядке станет 3 апреля. Поправить комментарий.
- **Уязвимости демо** (на 2026-11-05). Vue: 1 высокая (`source-map-js`). Angular: 4 высокие и 5 средних.
- **Сверка с документацией.** Параметры и типы результатов 1402 методов не сверялись, только имена.
- **Документация** (низкий приоритет, 2026-11-13). README — около 1100 строк, руководство и справочник в одном файле. 2026-11-12 разделы переставлены и упрощены без сокращения. Дальше можно вынести справочные части (таблица команд `BXRestFrame`, подробности продления авторизации, middleware) в `docs/` и оставить в README руководство с короткими примерами. Ещё вопрос: пункт «Автоматическое получение токена авторизации» в «Планах на будущее» README частично закрыт `BXRestFrame.getAuth()` и `auth.refresh`.
