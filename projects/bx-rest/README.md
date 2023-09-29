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
import { BXRest } from 'bx-rest'

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
  })
    
  constructor(
    private BXRest: BXRest,
  ) {
      
  }
}
```

# Future features
- Auto get token
- Mappers for normalization types
- 100% coverage
