import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMonacoEditor } from 'ngx-monaco-editor-v2';
import { configureBxRestTypes } from 'bx-rest-demo-shared';
import type * as Monaco from 'monaco-editor';
import { BXRestMapProvider, BXRestNavvyProvider, BXRestRequestProvider, NavvyProvider } from './bx-rest.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    BXRestNavvyProvider,
    BXRestMapProvider,
    BXRestRequestProvider,
    NavvyProvider,
    // ngx-monaco-editor-v2 грузит monaco-editor классическим AMD-лоадером
    // (см. assets-глоб в angular.json) и один раз зовёт onMonacoLoad, когда
    // window.monaco готов — это и есть момент для регистрации типов bx-rest.
    // baseUrl обязательно полный URL со схемой и хостом: воркер языка
    // typescript сам порождает вложенный воркер и резолвит путь до его
    // скрипта уже не от адреса страницы, а от собственного (непрозрачного)
    // base — даже путь от корня вида '/assets/...' там падает с
    // "Failed to parse URL", помогает только абсолютный URL.
    // Строим его от document.baseURI (<base href>), а не от корня домена:
    // на GitHub Pages демо лежит в подпапке (--base-href /bx-rest/angular/).
    provideMonacoEditor({
      baseUrl: new URL('assets/monaco/min/vs', document.baseURI).href,
      onMonacoLoad: () => configureBxRestTypes((window as unknown as { monaco: typeof Monaco }).monaco)
    })
  ]
};
