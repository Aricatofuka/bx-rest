# План развития bx-rest

Обновлён 2026-11-12. Здесь только открытые пункты и принятые решения. Что уже выпущено, описано в [CHANGELOG](projects/bx-rest/CHANGELOG.md).

Последний выпуск — 1.7.0 (2026-11-11, коммит `e25ed81`, опубликован в npm).

| Раздел | Статус |
| --- | --- |
| [1. Проверки на портале](#1-проверки-на-портале) | Ждут доступа к порталу |
| [2. CI и публикация демо](#2-ci-и-публикация-демо) | Предложение |
| [3. Пагинация: оставшиеся методы](#3-пагинация-оставшиеся-методы) | Нужны свои классы пагинации |
| [4. Веб-сокеты: клиент pull](#4-веб-сокеты-клиент-pull) | Нужно решение после проверки на портале |
| [5. Учёт времени в задачах](#5-учёт-времени-в-задачах) | Предложения, меняют поведение |
| [6. Отложено](#6-отложено) | Публичный batch, типизация |
| [7. Решения](#7-решения) | Не пересматриваются без обсуждения |
| [8. Без решения](#8-без-решения) | Пока не обсуждалось |

## 1. Проверки на портале

Всё ниже проверено только на заглушках и по документации. Нужен живой портал: вебхук и приложение с OAuth-токеном.

| Что проверить | Зачем |
| --- | --- |
| `getListByIDTask` для задачи, где больше 50 записей времени | С 1.7.0 метод листает страницы по `result_total`. Проверено на локальном сервере, который режет страницу до 50 |
| `getByInterval` с текущим форматом даты и с ISO 8601 | См. [раздел 5](#5-учёт-времени-в-задачах) |
| Ответ `pull.config.get` через вебхук и из приложения | Метода нет в документации, типы сверены только с SDK. После проверки снять `@experimental` ([pull/config.ts:20](projects/bx-rest/src/request-navvy/pull/config.ts#L20)) |
| Ответ `pull.channel.public.get` | Метода тоже нет в документации |
| Приходит ли `total` у `booking.v1.booking.list`, `crm.calllist.list`, `sale.propertyGroup.list`, `tasks.task.history.list` | `start` описан, но в примере ответа нет `total`. Если приходит, перевести на `pagNav` и убрать из исключений в [list-pagination.spec.ts](projects/bx-rest/src/rest/list-pagination.spec.ts) |
| Код ошибки `ERROR_ELEMENT_ALREADY_EXISTS` у `lists.element.add` | На него `startProcFormNewsFeed` повторяет запрос с новым `ELEMENT_CODE`. Код взят из документации |

## 2. CI и публикация демо

### Чего не хватает в CI

[ci.yml](.github/workflows/ci.yml) на каждый пуш в `main` и на каждый PR прогоняет линт, тесты и сборку на Node 20 и 22. Не хватает:

- сборки трёх демо;
- демо для Node в режиме `npm run mock` ([projects/demo-node](projects/demo-node)): проверяет собранный пакет без портала;
- установки собранного пакета в чистый проект с проверкой типов под `bundler` и `nodenext`;
- контроля размера: бандл только с `BXRestFrame` должен оставаться около 8 КБ;
- снимка «метод и REST-имя» (1553 строки), который поймает случайное переименование;
- `npm audit --omit=dev`;
- проверки, что корневые README и CHANGELOG совпадают с исходными из `projects/bx-rest`.

### Куда выкладывать демо: GitHub Pages

Репозиторий публичный, Pages пока не включён. Это бесплатно, с HTTPS и без своего сервера, а демо полностью статические. Адреса будут такими:

- `https://aricatofuka.github.io/bx-rest/vue/`
- `https://aricatofuka.github.io/bx-rest/react/`
- `https://aricatofuka.github.io/bx-rest/angular/`

Проверено локально: демо собраны под этими подпутями и открыты в Chrome. Страница, редактор Monaco и его воркеры загружаются без ошибок, общий размер около 135 МБ. Запросы к порталу с такой страницы и сам workflow ниже ещё не запускались.

Что сделать:

1. Исправить Angular-демо. [app.config.ts:25](projects/demo-angular/src/app/app.config.ts#L25) строит путь к Monaco от корня домена, поэтому под подпутём редактор не загружается. Правка в одну строку, проверена на копии:

   ```ts
   baseUrl: new URL('assets/monaco/min/vs', document.baseURI).href,
   ```

2. Включить в настройках репозитория: Settings, Pages, Source: GitHub Actions.
3. Добавить `.github/workflows/demos.yml` и простую `index.html` со ссылками на три демо в корень `_site`:

   ```yaml
   name: Demos

   on:
     push:
       branches: [main]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: pages
     cancel-in-progress: true

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 22.x
             cache: npm
         - run: npm ci
         - run: npm run demo:bootstrap
         - run: npm run build -- --base=/bx-rest/vue/
           working-directory: projects/demo-vue
         - run: npm run build -- --base=/bx-rest/react/
           working-directory: projects/demo-react
         - run: npm run build -- --base-href /bx-rest/angular/
           working-directory: projects/demo-angular
         - run: |
             mkdir -p _site
             cp -r projects/demo-vue/dist _site/vue
             cp -r projects/demo-react/dist _site/react
             cp -r projects/demo-angular/dist/demo-angular/browser _site/angular
         - uses: actions/upload-pages-artifact@v3
           with:
             path: _site

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

Ограничения:

- Установить такую страницу в портал как приложение не получится: Bitrix24 открывает приложение POST-запросом, а Pages отвечает на POST кодом 405 (проверено). Как отдельная страница с формой подключения демо работает, `BXRestFrame` оно не использует.
- Демо сохраняет подключение вместе с токеном в `localStorage` ([connection.ts:92](projects/demo-shared/src/connection.ts#L92)). На `aricatofuka.github.io` это хранилище общее для всех проектов Pages этого аккаунта. На странице стоит предупредить, что подключать нужно тестовый портал.

## 3. Пагинация: оставшиеся методы

В 1.7.0 `.resAll()` получили 59 методов. Тест [list-pagination.spec.ts](projects/bx-rest/src/rest/list-pagination.spec.ts) обходит все методы клиента: у каждого `*.list`, `*.getlist` и `*.items` либо есть `.resAll()`, либо он стоит в списке исключений с причиной. Когда метод получает `.resAll()`, тест требует убрать его из исключений.

Эти методы листаются не через `start`, для них нужны свои классы:

| Как листается | Методы | Что нужно |
| --- | --- | --- |
| `OFFSET`/`LIMIT` | `im.dialog.users.list`, `im.department.colleagues.list`, `im.recent.list`, `im.search.*.list`, `imbot.v2.Bot.list`, `sign.b2e.company.provider.list` | Отдельный класс пагинации |
| Номер страницы без `total` | `biconnector.{connector,dataset,source}.list` | Последовательный обход до неполной страницы |
| Объект `pagination` REST v3 без `total` | `mail.mailbox.list`, `mail.message.list`, `main.eventlog.list`, `note.collection.list` (курсор), `note.document.search.list`, `timeman.record.list` | Последовательный обход, отдельно — курсор |

Ещё 4 метода ждут проверки на портале, см. [раздел 1](#1-проверки-на-портале). Остальные исключения — методы без пагинации (отдают весь список одним ответом) и описания полей `*.field.list`, там менять нечего.

## 4. Веб-сокеты: клиент pull

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

## 5. Учёт времени в задачах

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

## 6. Отложено

- **Публичный batch.** Пока неясно, проблема ли это. Вернёмся, если появится реальная потребность. Заготовка лежит в [rest/navvy.ts:201](projects/bx-rest/src/rest/navvy.ts#L201).
- **Типизация.** На 2026-11-05 720 из 1361 вызовов находились в файлах с обобщёнными типами. Сделать лучше стоит, но после задач выше, вместе со сверкой с документацией из [раздела 8](#8-без-решения).

## 7. Решения

Решено, не пересматривается без обсуждения.

**Секреты не маскируются** ни в ошибках, ни в записи журнала `logRequests` (решения 2026-11-10 и 2026-11-11). Как обращаться с токеном, решает разработчик приложения: ошибка axios доходит до него как есть. Маскировку пробовали в 1.6.0 и убрали: удаление `request` ломало обработку сетевых ошибок по образцу из документации axios. В README, в разделе «Обработка ошибок», есть предупреждение.

**Одна точка входа.** Настройки клиента передаются в конструктор: `new BXRestNavvy(settings)`, с 1.7.0 также `new Navvy(settings)` и `new BXRestRequest(settings)`. Отдельной фабрики вроде `createBXRest()` нет. Метода для смены настроек у готового клиента нет: токен меняется через функцию `auth.source`, для другого портала создаётся новый клиент.

**Возможности транспорта — поля настроек:** `retryOnQueryLimit`, `timeout`, `throttle`, `logRequests`, `transport`. Готовые функции для `middleware` не экспортируются. Порядок фиксирован: повтор, очередь `throttle`, таймаут, журнал, свои `middleware`, транспорт (axios или `fetch`).

**Пустой `urls.key`.** Поведение верное, код не меняется. Объяснение — в README, раздел «Обработка ошибок», абзац «Базовый адрес».

| `urls.key` | `additional_part` | Базовый адрес |
| --- | --- | --- |
| Пусто (настройки по умолчанию) | `rest` | `rest/`, запрос идёт относительно текущей страницы |
| Пусто | Пусто | Нет, запрос завершается ошибкой |

**Даты в формате США.** Не беремся. Строки в формате портала приходят только от отдельных методов (`calendar.section.get`, `calendar.event.get`, `crm.calllist.*`), а точный формат можно передать через `dateTimeFormat`. Глобальную настройку не добавляем. Если появится реальный случай, надо учесть, что токенов 12-часового формата у `dateTimeFormat` нет.

## 8. Без решения

Эти пункты пока не обсуждались:

- **Сборка.** ng-packagr и Angular 18 при отсутствии импортов `@angular` в коде, TypeScript закреплён на 5.5. В dev-зависимостях 62 уязвимости (5 критических, 28 высоких), в зависимостях самого пакета — ни одной (проверено 2026-11-12). Вариант: `tsup` или аналог, `isolatedModules` уже проходит.
- **Умолчание `.res()`.** Ошибка в ответе 2xx молча становится `undefined`. Смена умолчания `throwOnApiError` ломает совместимость, это единственный мажорный пункт в плане.
- **Единообразие API.** Имена: `sonet_group`, `socialNetWork`, `del` и `delete`, `map/im/gialog`, `getOfCreate…`, `startProcForm…`.
- **Мелочи в коде:**
  - `getSessid()` сохраняет `?sessid=` из адреса в `localStorage` при каждом чтении ([sessionKey.ts:112](projects/bx-rest/src/services/http/sessionKey.ts#L112));
  - `getAuthParams` проглатывает исключения из `source()` ([sessionKey.ts:123](projects/bx-rest/src/services/http/sessionKey.ts#L123));
  - одно плохое значение в строгих `toBool` и `toDate` роняет весь список, а `toNum(null)` даёт 0.
- **Уязвимости демо** (на 2026-11-05). Vue: 1 высокая (`source-map-js`). Angular: 4 высокие и 5 средних.
- **Сверка с документацией.** Параметры и типы результатов 1402 методов не сверялись, только имена.
