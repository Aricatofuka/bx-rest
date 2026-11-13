export type ReturnTypeNavvy<T, R> = T extends R ? T : R

/**
 * Размер страницы для `.resAll()`: из запроса, иначе `pageSize`, но не больше `maxPageSize`.
 * `.resAll()` передаёт его явно на каждой странице: по нему считается следующая страница
 * и видно, что страница последняя. Поэтому он не должен зависеть от умолчания портала
 */
export function pageSizeOf(requested: unknown, pageSize: number, maxPageSize?: number): number {
  const size = Number(requested) > 0 ? Number(requested) : pageSize
  return maxPageSize ? Math.min(size, maxPageSize) : size
}
