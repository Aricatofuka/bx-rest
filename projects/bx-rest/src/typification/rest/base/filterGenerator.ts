export type BXRestFilterGenerator<Type> = { [Property in keyof Type as `${BXRestFilterGeneratorKey<Property & string>}`]?: Type[Property] }
export type BXRestFilterGeneratorKey<T extends string> = `${BXRestFilterKeys}${T}`
export type BXRestFilterKeys = '' | '<' | '>'  | '!'  | '<='  | '>='
