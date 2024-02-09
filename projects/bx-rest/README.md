# BX rest

This is an intermediary between requests sent from the browser and includes a site on crm bitrix

### Install

```shell
npm install bx-rest
```
# Usage
```typescript
@NgModule({
    declarations: [
        AppComponent,
        ...
    ],
    imports: [
        BrowserModule
        ...
    ],
    providers: [
        NgxMaskPipe,
        {
            provide: REST_SETTINGS, useValue: {
                auth: {
                    source: 'cookies',
                    key: 'auth'
                },
                urls: {
                    home: 'your bitrix addres'
                }
            }
        }
    ],
});
document.cookie ='auth=ACCESS_TOKEN;  max-age=99999'
```
```typescript

// isBXRestAnswerSuccess checks the answer to see if it belongs to an answer without errors
import { BXRest, BXMap, isBXRestAnswerSuccess } from 'bx-rest'

@Component({
  selector: 'app-any',
  templateUrl: './any.component.html',
  styleUrls: ['./any.component.scss']
})
export class AnyComponent {

  listElements$ = this.BXRest.lists.element.get({
    IBLOCK_TYPE_ID: 'lists',
    IBLOCK_ID: 150,
    FILTER: {
      ['>' + vacancies.del]: 0
    }
  }).pipe(
    map(v => (isBXRestAnswerSuccess(v) ? this.BXMap.lists.element.get(v) : undefined)
  )
    
  constructor(
    private BXRest: BXRest,
    private BXMap: BXMap,
  ) {
      
  }
}
```
or if you prefer several features in one 

```typescript
import { BXRestNavvy, BXMap } from 'bx-rest'

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
  }).result() // or .resultAll() - to get all elements
    
  constructor(
    private BXRestNavvy: BXRestNavvy,
  ) {
      
  }
}
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

  constructor(
    private http: BXRestRequest
  ) {
  }

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

  constructor(
    private BXRestCustomBlogpostGet: BXRestCustomBlogpostGet,
    private BXRestCustomMapBlogpostGet: BXRestCustomMapBlogpostGet,
  ) {
    this.Navvy = new Navvy(this.BXRestCustomBlogpostGet, this.BXRestCustomMapBlogpostGet)
  }

  view(param: iBXRestCustomBlogpostGetViewParam) {
    return this.Navvy.PagNav(this.BXRestCustomBlogpostGet.view, param, this.BXRestCustomMapBlogpostGet.view)
  }

  rating(param: iBXRestCustomHttpBlogpostGetRatingParam) {
    return this.Navvy.PagNav(this.BXRestCustomBlogpostGet.rating, param, this.BXRestCustomMapBlogpostGet.rating)
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
          ID: this.toNum(i.ID),
          USER_ID: this.toNum(i.USER_ID),
          DATE: this.toDate(i.DATE, 'dd.MM.yyyy HH:mm:ss'),
        }
      })
      : []
  }

  rating(value: iBXRestCustomHttpBlogpostGetRating[] | undefined): iBXRestCustomBlogpostGetRating[] {
    return (value) ? value.map(i => {
        return {
          ID: this.toNum(i.ID),
          REACTION: i.REACTION,
          TOTAL_VOTES: this.toNum(i.TOTAL_VOTES),
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
