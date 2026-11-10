import { BXRestSettings } from '../settings'
import { iBXRestSettings } from '../typification/settings'
import type { AxiosInstance } from 'axios'

/**
 * Контекст клиента: его настройки, экземпляр axios и общее состояние
 * продления авторизации и очереди `throttle`.
 *
 * Объекты библиотеки запоминают контекст в момент создания
 * (`currentContext()`), поэтому все запросы клиента `new BXRestNavvy(settings)`
 * идут с его настройками, а не с глобальными. Внутренняя деталь библиотеки.
 */
export class BXRestContext {
  /** Идущее сейчас продление авторизации, его ждут все упавшие запросы клиента. */
  pendingRefresh: Promise<void> | undefined
  /** Сколько продлений уже завершилось успешно. */
  refreshCount = 0
  /** Экземпляр axios клиента: один на контекст, создаётся при первом запросе. */
  axios: AxiosInstance | undefined
  /** Очередь `throttle`: когда можно отправить следующий запрос клиента (мс, Date.now()). */
  throttleNextSlot = 0

  constructor(private readonly own?: iBXRestSettings) {}

  /**
   * Свои настройки клиента, а без них — глобальные `BXRestSettings.value`,
   * прочитанные в момент обращения: `BXRestSettings.update()` заменяет объект.
   */
  get settings(): iBXRestSettings {
    return this.own ?? BXRestSettings.value
  }
}

/**
 * Контекст глобальных настроек. С ним работают `new BXRestNavvy()` без
 * аргумента и объекты, созданные приложением напрямую (`new Navvy()`,
 * `new BXRestRequest()`).
 */
export const globalContext = /* @__PURE__ */ new BXRestContext()

let current = globalContext

export function currentContext(): BXRestContext {
  return current
}

/**
 * Делает `ctx` текущим и возвращает прежний контекст. Вызывающий обязан
 * вернуть его через `restoreContext()` в `finally`: иначе после исключения
 * чужие настройки достанутся объектам, созданным позже.
 */
export function enterContext(ctx: BXRestContext): BXRestContext {
  const previous = current
  current = ctx
  return previous
}

export function restoreContext(previous: BXRestContext): void {
  current = previous
}

/** Создаёт объекты в контексте `ctx` и возвращает прежний контекст, даже при исключении. */
export function runInContext<T>(ctx: BXRestContext, build: () => T): T {
  const previous = enterContext(ctx)
  try {
    return build()
  } finally {
    restoreContext(previous)
  }
}
