import { BXRestNavvyElapsedItem } from './task/elapseditem'
import { BXRestNavvyTaskCommentItem } from './task/commentitem'
import { BXRestNavvyTaskPlanner } from './task/planner'
import { BXRestNavvyTaskItem } from './task/item'
import { BXRestNavvyTaskChecklistItem } from './task/checklistitem'
import { BXRestNavvyTaskDependence } from './task/dependence'
import { BXRestNavvyTaskStages } from './task/stages'

export class BXRestNavvyTask {
  /**
   * Затраченное время по задаче (`task.elapseditem.*`).
   */
  public readonly elapsedItem = new BXRestNavvyElapsedItem()
  /**
   * Чек-листы задач (`task.checklistitem.*`).
   */
  public readonly checklistItem = new BXRestNavvyTaskChecklistItem()
  /**
   * Комментарии к задачам (`task.commentitem.*`).
   */
  public readonly commentItem = new BXRestNavvyTaskCommentItem()
  /**
   * Зависимости между задачами (`task.dependence.*`).
   */
  public readonly dependence = new BXRestNavvyTaskDependence()
  /**
   * «План на день» (`task.planner.*`).
   */
  public readonly planner = new BXRestNavvyTaskPlanner()
  /**
   * Стадии канбана и «Моего плана» (`task.stages.*`).
   */
  public readonly stages = new BXRestNavvyTaskStages()
  /**
   * Пользовательские поля задачи (`task.item.*`).
   */
  public readonly item = new BXRestNavvyTaskItem()
}
