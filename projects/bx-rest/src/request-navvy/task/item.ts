import { BXRestNavvyTaskItemUserField } from './item/userfield'

export class BXRestNavvyTaskItem {
  /**
   * Пользовательские поля задачи (`task.item.userfield.*`).
   */
  public readonly userField = new BXRestNavvyTaskItemUserField()
}