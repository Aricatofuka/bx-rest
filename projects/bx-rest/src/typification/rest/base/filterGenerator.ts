export type iBXRestFilterGenerator<Type> = { [Property in keyof Type as `${iBXRestFilterGeneratorKey<Property & string>}`]?: Type[Property] }
export type iBXRestFilterGeneratorKey<T extends string> = `${iBXRestFilterKeys}${T}`
export type iBXRestFilterKeys = '' | '<' | '>'  | '!'  | '<='  | '>='
