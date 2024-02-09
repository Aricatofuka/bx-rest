export type AllKeyFree<T> = {
  [K in keyof T as K & string]?: T[K]
}