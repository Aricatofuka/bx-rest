# bx-rest - Bitrix24 REST API client for TypeScript, Angular and Vue

`bx-rest` is a TypeScript SDK for the Bitrix24 REST API. It helps call BX24 REST methods, work with auth tokens, sessid, OAuth2, pagination, mappers and typed API requests.

Also known as: Bitrix24 REST client, BX24 REST SDK, Bitrix24 API client, Bitrix REST TypeScript library.

### Install

```shell
npm install bx-rest
```
# Usage in Angular
```typescript
import { BXRestSettings } from 'bx-rest'

BXRestSettings.update({
  auth: {
    source: 'cookies',
    key: 'auth'
  },
  urls: {
    source: 'string',
    key: environment.urls.home,
    additional_part: 'rest'
  }
})

export const BXRestNavvyProvider: Provider = {
  provide: BXRestNavvy,
  useClass: BXRestNavvy,
};

export const BXRestMapProvider: Provider = {
  provide: BXRestMap,
  useFactory: () => new BXRestMap(),
}

export const BXRestRequestProvider: Provider = {
  provide: BXRestRequest,
  useFactory: () => new BXRestRequest(),
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    BXRestNavvyProvider,
    BXRestMapProvider,
    BXRestRequestProvider,
    BXRestMapProvider
  ]
}
document.cookie ='auth=ACCESS_TOKEN;  max-age=99999'
```

# SessionKeyServices

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

For `auth.key: 'auth'`, the service reads the `auth` cookie. For `auth.key: 'sessid'`, it tries `window.BX.bitrix_sessid()`, then the `sessid` query parameter, then `localStorage.sessid`, and finally the `auth` cookie. If `auth.source` is `localStorage`, the value is read by `auth.key`. If `auth.source` is `off`, authorization params are not added to requests.

```typescript
import { BXRestNavvy } from 'bx-rest'

@Component({
  selector: 'app-any',
  templateUrl: './any.component.html',
  styleUrls: ['./any.component.scss']
})
export class AnyComponent {

  listElements$ = this.BXRestNavvy.lists.element.get({
    IBLOCK_TYPE_ID: 'lists',
    IBLOCK_ID: 150,
    FILTER: {
      ['>' + vacancies.del]: 0
    }
  }).res() // or .resAll() - to get all elements or .resVanilla() - to get all elements

  private readonly BXRestNavvy = inject(BXRestNavvy)
}
```
# Usage in Vue
```typescript
import { BXRestSettings, BXRestMap, BXRestNavvy, BXRestRequest } from 'bx-rest';

const bxRestPlugin = {
    install(Vue) {
        // Settings bx-rest
        BXRestSettings.update({
            auth: {
                source: 'cookies',
                key: 'auth',
            },
            urls: {
                source: 'string',
                key: 'b24.trace-studio.com',
                additional_part: 'rest',
            },
        });

        // Adding instances to global access
        Vue.config.globalProperties.$bxRestNavvy = new BXRestNavvy();
        Vue.config.globalProperties.$bxRestMap = new BXRestMap();
        Vue.config.globalProperties.$bxRestRequest = new BXRestRequest();
    },
};

export default bxRestPlugin;
```

```vue
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import bxRestPlugin from './bxRestPlugin';

const app = createApp(App);

app.use(bxRestPlugin);

app.mount('#app');
```

# Extension
You can add your own methods to the rest API; you can read more about this here:
https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=99&LESSON_ID=7985

And after creating the methods, we can add functions to call them in the same style as in the current plugin:
```typescript
import { Injectable } from '@angular/core'
import { partNameMethods as PNM } from 'bx-rest' // part name methods for saving add size
import { BXRestRequest } from 'bx-rest'
import {
  iBXRestCustomBlogpostGetViewParam,
  iBXRestCustomHttpBlogpostGetView
} from '@/lib/typification/bitrix/api/custom/blogpost/get/view'
import {
  iBXRestCustomHttpBlogpostGetRating,
  iBXRestCustomHttpBlogpostGetRatingParam
} from '@/lib/typification/bitrix/api/custom/blogpost/get/rating'

@Injectable({
  providedIn: 'root'
})
export class BXRestCustomBlogpostGet {

  url = {
    view: [PNM.$log, PNM.$blogpost, PNM.$get, 'view'],
    rating: [PNM.$log, PNM.$blogpost, PNM.$get, 'rating'],
  }

  private readonly http = inject(BXRestRequest)

  view(param: iBXRestCustomBlogpostGetViewParam) {
    return this.http.post<iBXRestCustomHttpBlogpostGetView[]>(this.url.view, param)
  }

  rating(param: iBXRestCustomHttpBlogpostGetRatingParam) {
    return this.http.post<iBXRestCustomHttpBlogpostGetRating[]>(this.url.rating, param)
  }
}
```
in navvy:
```typescript
import { Injectable } from '@angular/core'
import { Navvy } from 'bx-rest'
import { BXRestCustomBlogpostGet } from '../../blogpost/get'
import { BXRestCustomMapBlogpostGet } from '../../map/blogpost/get'
import { iBXRestCustomBlogpostGetViewParam } from '@/lib/typification/bitrix/api/custom/blogpost/get/view'
import {
  iBXRestCustomHttpBlogpostGetRatingParam
} from '@/lib/typification/bitrix/api/custom/blogpost/get/rating'

@Injectable({
  providedIn: 'root'
})
export class BXRestCustomNavvyBlogpostGet {

  Navvy: Navvy<BXRestCustomBlogpostGet, BXRestCustomMapBlogpostGet>

  url = {
    view: [PNM.$log, PNM.$blogpost, PNM.$get, 'view'],
    rating: [PNM.$log, PNM.$blogpost, PNM.$get, 'rating'],
  }

  private readonly http = inject(BXRestRequest)
  private readonly BXRestCustomBlogpostGet = inject(BXRestCustomBlogpostGet)
  private readonly BXRestCustomMapBlogpostGet = inject(BXRestCustomMapBlogpostGet)
  private readonly Navvy = new Navvy(this.BXRestCustomBlogpostGet, this.BXRestCustomMapBlogpostGet)

  view(param: iBXRestCustomBlogpostGetViewParam) {
    return this.Navvy.PagNav(this.url.view, param, this.BXRestCustomMapBlogpostGet.view)
  }

  rating(param: iBXRestCustomHttpBlogpostGetRatingParam) {
    return this.Navvy.PagNav(this.url.rating, param, this.BXRestCustomMapBlogpostGet.rating)
  }
}
```
mapper:
```typescript
import { Injectable } from '@angular/core'
import {
  iBXRestCustomBlogpostGetView,
  iBXRestCustomHttpBlogpostGetView
} from '@/lib/typification/bitrix/api/custom/blogpost/get/view'
import {
  iBXRestCustomBlogpostGetRating,
  iBXRestCustomHttpBlogpostGetRating,
} from '@/lib/typification/bitrix/api/custom/blogpost/get/rating'
import { BXRestMapBase } from 'bx-rest'

@Injectable({
  providedIn: 'root'
})
export class BXRestCustomMapBlogpostGet extends BXRestMapBase {

  view(value: iBXRestCustomHttpBlogpostGetView[] | undefined): iBXRestCustomBlogpostGetView[] {
    return (value) ? value.map(i => {
        return {
          ID: toNum(i.ID),
          USER_ID: toNum(i.USER_ID),
          DATE: toDate(i.DATE, 'dd.MM.yyyy HH:mm:ss'),
        }
      })
      : []
  }

  rating(value: iBXRestCustomHttpBlogpostGetRating[] | undefined): iBXRestCustomBlogpostGetRating[] {
    return (value) ? value.map(i => {
        return {
          ID: toNum(i.ID),
          REACTION: i.REACTION,
          TOTAL_VOTES: toNum(i.TOTAL_VOTES),
        }
      }) as iBXRestCustomBlogpostGetRating[]
      : [] as iBXRestCustomBlogpostGetRating[]
  }
}
```
# Specific methods

tasks.task.list:
```typescript

// your's select defult fields
export type selectTaskFieldsType = Extract<
  iBXRestTaskFieldsName,
  'ID' | 'TITLE' | 'GROUP_ID' | 'TIME_ESTIMATE' | 'CREATED_DATE' | 'CLOSED_DATE' | 'DURATION_FACT' | 'TIME_SPENT_IN_LOGS'
>

// your's custom fields tasks
export type customTaskField = { ufListDiscipline: string, ufUfListSubdiscipline: string, ufList1: string }

return this.BXRestNavvy.tasks.task.list<selectTaskFieldsType[], customTaskField>(
  {
    order: {
      ID: 'DESC'
    },
    filter: {
      CREATED_BY: [v.ID],
      // '<REAL_STATUS': 5,
      TITLE: (this.formControl.controls.textSearch.value) ? this.formControl.controls.textSearch.value : ''
    },
    select: [...selectTaskFields, ...selectTaskFieldsCustom],
    start: (this.formControl.controls.pageNumber.value) ? this.formControl.controls.pageNumber.value * 50 : 0
  }
)
```

# Future features
- Auto get token
- Mappers for normalization types
- 100% coverage
