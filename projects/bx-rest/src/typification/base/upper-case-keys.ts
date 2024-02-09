export type ToUpperCaseKeys<T> = {
  [K in keyof T as Uppercase<K & string>]: T[K]
}

export type ToUpperCaseFreeKeys<T> = {
  [K in keyof T as Uppercase<K & string>]?: T[K]
}