import { iBXRestHttpTask, iBXRestTask } from '../task'
import { CamelToSnake } from 'snake-camel-types'

// каждому битриксойду что писал REST API желаю протий через типизацию своих методов

/**
 * Причины таких странных мувов можно найти тут
 * https://dev.1c-bitrix.ru/rest_help/tasks/task/tasks/tasks_task_list.php
 *
 * в разеделе select и после него глянуть на ответ
 */
type UppercaseKeys<T extends CamelToSnake<iBXRestHttpTask | iBXRestTask>> = {
  [K in keyof T as Uppercase<K & string>]: T[K]
}

/**
 * Причины таких странных мувов можно найти тут
 * https://dev.1c-bitrix.ru/rest_help/tasks/task/tasks/tasks_task_list.php
 *
 * в разеделе select и после него глянуть на ответ
 */
export type iBXRestTaskFieldsName = keyof UppercaseKeys<CamelToSnake<iBXRestHttpTask | iBXRestTask>>

