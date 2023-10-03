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
import { BXRest, BXMap } from 'bx-rest'

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
    map(v => this.BXMap.lists.element.get(v))
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

# Future features
- Auto get token
- Mappers for normalization types
- 100% coverage
