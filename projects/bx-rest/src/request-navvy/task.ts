import { BXRestNavvyElapsedItem } from './task/elapseditem'
import { BXRestNavvyTaskCommentItem } from './task/commentitem'
import { BXRestNavvyTaskPlanner } from './task/planner'
import { BXRestNavvyTaskItem } from './task/item'
import { BXRestNavvyTaskChecklistItem } from './task/checklistitem'
import { BXRestNavvyTaskDependence } from './task/dependence'
import { BXRestNavvyTaskStages } from './task/stages'

export class BXRestNavvyTask {
  public readonly elapsedItem = new BXRestNavvyElapsedItem()
  public readonly checklistItem = new BXRestNavvyTaskChecklistItem()
  public readonly commentItem = new BXRestNavvyTaskCommentItem()
  public readonly dependence = new BXRestNavvyTaskDependence()
  public readonly planner = new BXRestNavvyTaskPlanner()
  public readonly stages = new BXRestNavvyTaskStages()
  public readonly item = new BXRestNavvyTaskItem()
}
