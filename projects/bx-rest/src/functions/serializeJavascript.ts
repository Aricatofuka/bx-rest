// Generate an internal UID to make the regexp pattern harder to guess.
const UID_LENGTH = 16
const UID = generateUID()
const PLACE_HOLDER_REGEXP = new RegExp('(\\\\)?"@__(F|R|D|M|S|A|U|I|B|L)-' + UID + '-(\\d+)__@"', 'g')

const IS_NATIVE_CODE_REGEXP = /\{\s*\[native code]\s*}/g
const IS_PURE_FUNCTION = /function.*?\(/
const IS_ARROW_FUNCTION = /.*?=>.*?/
const UNSAFE_CHARS_REGEXP = /[<>\/\u2028\u2029]/g

const RESERVED_SYMBOLS = ['*', 'async']

// Mapping of unsafe HTML and invalid JavaScript line terminator chars to their
// Unicode char counterparts which are safe to use in JavaScript strings.
const ESCAPED_CHARS: {[key: string]: string}  = {
  '<': '\\u003C',
  '>': '\\u003E',
  '/': '\\u002F',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029'
}

function escapeUnsafeChars(unsafeChar: string): string {
  return (ESCAPED_CHARS.hasOwnProperty(unsafeChar)) ? ESCAPED_CHARS[unsafeChar] : ''
}

function generateUID() {
  let bytes = window.crypto.getRandomValues(new Uint32Array(UID_LENGTH))
  let result = ''
  for (let i = 0; i < UID_LENGTH; ++i) {
    result += bytes[i].toString(16)
  }
  return result
}

function deleteFunctions(obj: any) {
  let functionKeys = []
  for (let key in obj) {
    if (typeof obj[key] === 'function') {
      functionKeys.push(key)
    }
  }
  for (let i = 0; i < functionKeys.length; i++) {
    delete obj[functionKeys[i]]
  }
}

function serialize(obj: any, options: any = {}): any {
  // Backwards-compatibility for `space` as the second argument.
  if (typeof options === 'number' || typeof options === 'string') {
    options = {space: options}
  }

  let functions: Function[] = []
  let regexps: any[] = []
  let dates: any[] = []
  let maps: any[] = []
  let sets: any[] = []
  let arrays: any[] = []
  let undefs: any[] = []
  let infinities: any[] = []
  let bigInts: any[] = []
  let urls: any[] = []

  // Returns placeholders for functions and regexps (identified by index)
  // which are later replaced by their string representation.
  function replacer(key: string, value: any) {

    // For nested function
    if (options.ignoreFunction) {
      deleteFunctions(value)
    }

    if (!value && value !== undefined) {
      return value
    }

    // let origValue: any = this[key]
    let origValue: any = value
    let type = typeof origValue

    switch (type){
      case 'object':

        if (origValue instanceof RegExp) {
          return '@__R-' + UID + '-' + (regexps.push(origValue) - 1) + '__@'
        } else if (origValue instanceof Date) {
          return '@__D-' + UID + '-' + (dates.push(origValue) - 1) + '__@'
        } else if (origValue instanceof Map) {
          return '@__M-' + UID + '-' + (maps.push(origValue) - 1) + '__@'
        } else if (origValue instanceof Set) {
          return '@__S-' + UID + '-' + (sets.push(origValue) - 1) + '__@'
        }

        if (origValue instanceof Array) {
          let isSparse = origValue.filter(function () {
            return true
          }).length !== origValue.length
          if (isSparse) {
            return '@__A-' + UID + '-' + (arrays.push(origValue) - 1) + '__@'
          }
        }

        if (origValue instanceof URL) {
          return '@__L-' + UID + '-' + (urls.push(origValue) - 1) + '__@'
        }
        break
      case 'function':
        return '@__F-' + UID + '-' + (functions.push(origValue) - 1) + '__@'
      case 'undefined':
        return '@__U-' + UID + '-' + (undefs.push(origValue) - 1) + '__@'
      case 'number':
        return '@__I-' + UID + '-' + (infinities.push(origValue) - 1) + '__@'
      case 'bigint':
        return '@__B-' + UID + '-' + (bigInts.push(origValue) - 1) + '__@'
    }

    return value
  }

  function serializeFunc(fn: Function) {
    let serializedFn = fn.toString()
    if (IS_NATIVE_CODE_REGEXP.test(serializedFn)) {
      throw new TypeError('Serializing native function: ' + fn.name)
    }

    // pure functions, example: {key: function() {}}
    if (IS_PURE_FUNCTION.test(serializedFn)) {
      return serializedFn
    }

    // arrow functions, example: arg1 => arg1+5
    if (IS_ARROW_FUNCTION.test(serializedFn)) {
      return serializedFn
    }

    let argsStartsAt = serializedFn.indexOf('(')
    let def = serializedFn.slice(0, argsStartsAt)
    .trim()
    .split(' ')
    .filter(function (val) {
      return val.length > 0
    })

    let nonReservedSymbols = def.filter(function (val) {
      return RESERVED_SYMBOLS.indexOf(val) === -1
    })

    // enhanced literal objects, example: {key() {}}
    if (nonReservedSymbols.length > 0) {
      return (def.indexOf('async') > -1 ? 'async ' : '') + 'function'
        + (def.join('').indexOf('*') > -1 ? '*' : '')
        + serializedFn.slice(argsStartsAt)
    }

    // arrow functions
    return serializedFn
  }

  // Check if the parameter is function
  if (options.ignoreFunction && typeof obj === "function") {
    obj = undefined
  }
  // Protects against `JSON.stringify()` returning `undefined`, by serializing
  // to the literal string: "undefined".
  if (obj === undefined) {
    return String(obj)
  }

  let str = ''
  // Creates a JSON string representation of the value.
  // NOTE: Node 0.12 goes into slow mode with extra JSON.stringify() args.
  if (options.isJSON && !options.space) {
    str = JSON.stringify(obj)
  } else {
    str = JSON.stringify(obj, options.isJSON ? undefined : replacer, options.space)
  }

  // Replace unsafe HTML and invalid JavaScript line terminator chars with
  // their safe Unicode char counterpart. This _must_ happen before the
  // regexps and functions are serialized and added back to the string.
  if (options.unsafe !== true) {
    str = str.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars)
  }

  if (functions.length === 0 && regexps.length === 0 && dates.length === 0 && maps.length === 0 && sets.length === 0 && arrays.length === 0 && undefs.length === 0 && infinities.length === 0 && bigInts.length === 0 && urls.length === 0) {
    return str
  }

  // Replaces all occurrences of function, regexp, date, map and set placeholders in the
  // JSON string with their string representations. If the original value can
  // not be found, then `undefined` is used.
  return str.replace(PLACE_HOLDER_REGEXP, function (match, backSlash, type, valueIndex) {
    // The placeholder may not be preceded by a backslash. This is to prevent
    // replacing things like `"a\"@__R-<UID>-0__@"` and thus outputting
    // invalid JS.
    if (backSlash) {
      return match
    }

    switch (type){
      case 'D':
        return "new Date(\"" + dates[valueIndex].toISOString() + "\")"
      case 'R':
        return "new RegExp(" + serialize(regexps[valueIndex].source) + ", \"" + regexps[valueIndex].flags + "\")"
      case 'M':
        return "new Map(" + serialize(Array.from(maps[valueIndex].entries()), options) + ")"
      case 'S':
        return "new Set(" + serialize(Array.from(sets[valueIndex].values()), options) + ")"
      case 'A':
        return "Array.prototype.slice.call(" + serialize(Object.assign({length: arrays[valueIndex].length}, arrays[valueIndex]), options) + ")"
      case 'U':
        return 'undefined'
      case 'I':
        return infinities[valueIndex]
      case 'B':
        return "BigInt(\"" + bigInts[valueIndex] + "\")"
      case 'L':
        return "new URL(\"" + urls[valueIndex].toString() + "\")"
    }

    let fn = functions[valueIndex]

    return serializeFunc(fn)
  })
}

export default serialize
