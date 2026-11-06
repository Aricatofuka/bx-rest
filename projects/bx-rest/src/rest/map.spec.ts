import { describe, expect, it } from 'vitest'
import { BXRestMap } from './map'
import { BXRestMapDisk } from '../map/disk'
import { BXRestMapTaskCommentItem } from '../map/task/commentitem'
import { BXRestMapTaskElapsedItem } from '../map/task/elapseditem'
import { BXRestMapTaskStage } from '../map/task/stages'
import { BXRestMapTasksTask } from '../map/tasks/task'
import { BXRestMapTasksTaskResult } from '../map/tasks/task/result'

describe('BXRestMap', () => {
  const map = new BXRestMap()

  it('disk gives the disk mapper', () => {
    expect(map.disk).toBe(BXRestMapDisk)
  })

  it('task gives the nested mappers', () => {
    expect(map.task.commentItem).toBe(BXRestMapTaskCommentItem)
    expect(map.task.elapsedItem).toBe(BXRestMapTaskElapsedItem)
    expect(map.task.stages).toBe(BXRestMapTaskStage)
  })

  it('tasks gives the nested mappers', () => {
    expect(map.tasks.task).toBe(BXRestMapTasksTask)
    expect(map.tasks.task.result).toBe(BXRestMapTasksTaskResult)
  })
})
