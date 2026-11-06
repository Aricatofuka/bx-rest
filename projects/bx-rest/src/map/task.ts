import { BXRestMapTaskCommentItem } from './task/commentitem'
import { BXRestMapTaskElapsedItem } from './task/elapseditem'
import { BXRestMapTaskStage } from './task/stages'

export class BXRestMapTask {
  // Геттеры, а не статические поля: статический инициализатор выполняется при загрузке
  // модуля, поэтому бандлер не сможет выбросить класс, даже если он нигде не используется.
  public static get commentItem() {
    return BXRestMapTaskCommentItem
  }

  public static get elapsedItem() {
    return BXRestMapTaskElapsedItem
  }

  public static get stages() {
    return BXRestMapTaskStage
  }
}
