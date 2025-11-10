export function CatchError(options?: { rethrow?: boolean; defaultValue?: any }) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value

    descriptor.value = function (...args: any[]) {
      try {
        return original.apply(this, args)
      } catch (err) {
        const errorInfo = {
          message: `❌ Error in ${target.constructor.name}.${propertyKey}`,
          args,
          error: err instanceof Error ? err.message : String(err),
          stack: err instanceof Error ? err.stack : new Error().stack,
        }

        console.error(formatError(errorInfo))

        if (options?.rethrow) throw err
        return options?.defaultValue
      }
    }

    return descriptor
  }
}

// Общая функция форматирования
export function formatError(info: { message: string; args?: any[]; error?: string; stack?: string }): string {
  const stackLines = info.stack?.split('\n').slice(2).join('\n')
  return [
    info.message,
    info.args ? `   • args: ${JSON.stringify(info.args)}` : '',
    info.error ? `   • error: ${info.error}` : '',
    `   • stack trace:\n${stackLines}`,
  ].join('\n')
}
