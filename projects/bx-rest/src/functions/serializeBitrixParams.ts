import { stringify, type IStringifyOptions } from 'qs-esm'

const BITRIX_STRINGIFY_OPTIONS: IStringifyOptions = {
  // Добавляет числовые индексы массивов: fields[PHONE][0][VALUE].
  arrayFormat: 'indices',
  // allowDots не передаётся: значение по умолчанию false сохраняет bracket notation.
  // Выполняет URL-кодирование ключей и значений параметров.
  encode: true,
  // Кодирует не только значения, но и ключи вместе с квадратными скобками.
  encodeValuesOnly: false,
  // Кодирует пробел как %20 и использует правила RFC 3986.
  format: 'RFC3986',
  // Не удаляет null: значение сериализуется как пустой параметр key=.
  skipNulls: false,
  // Сохраняет знак равенства для null: key= вместо параметра без значения key.
  strictNullHandling: false,
}

/**
 * Serializes nested REST parameters using the indexed bracket notation
 * expected by Bitrix, for example: fields[PHONE][0][VALUE].
 */
export function serializeBitrixParams(params: unknown): string {
  return stringify(params, BITRIX_STRINGIFY_OPTIONS)
}
