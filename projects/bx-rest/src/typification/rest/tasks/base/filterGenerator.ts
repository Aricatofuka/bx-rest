export type filterGenerator<Type> = { [Property in keyof Type as `${filterGeneratorKey<Property & string>}`]?: Type[Property] }
type filterGeneratorKey<T extends string> = `${filterKeys}${T}`
type filterKeys = '' | '<' | '>'  | '!'  | '<='  | '>='
