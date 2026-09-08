// Vue-плагин по образцу README «Использование в Vue»: регистрируется через
// app.use(bxRestPlugin) в main.ts. В README плагин ещё и вызывает
// BXRestSettings.update(...) с зашитыми настройками — здесь портал/токен
// вводит пользователь, поэтому это делает connection.applyConnection() из
// bx-rest-demo-shared в момент нажатия «Подключить», а не install().
//
// Экземпляр отдаётся двумя способами: как в README — через
// app.config.globalProperties.$bxRestNavvy (для Options API), и дополнительно
// через provide/inject — так его получают компоненты на <script setup>.
import type { App, InjectionKey, Plugin } from 'vue'
import { BXRestNavvy } from 'bx-rest'

export const bxRest = new BXRestNavvy()

export const BxRestKey: InjectionKey<BXRestNavvy> = Symbol('bxRest')

export const bxRestPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$bxRestNavvy = bxRest
    app.provide(BxRestKey, bxRest)
  }
}
