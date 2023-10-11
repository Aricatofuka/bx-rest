import { Injectable } from '@angular/core'
import { BaseMapServices } from '../../base'
// import { iTaskResult, iTaskResultHttp } from '@/lib/typification/bitrix/api/rest/task/result/result'


@Injectable({
  providedIn: 'root'
})
export class BXRestMapTasksTaskResult extends BaseMapServices {
  // iTaskResultHttpToiTaskResult(item: iTaskResultHttp): iTaskResult {
  //   return Object.assign(item, {
  //     createdAt: this.toDate(item.createdAt),
  //     updatedAt: this.toDate(item.updatedAt)
  //   })
  // }
}

type iBXRestTasksTaskListHttpDefault = {
  id: number;
  groupId: string;
  // Add more properties as needed
};

type iBXRestTasksTaskListHttpDefaultKeys = keyof iBXRestTasksTaskListHttpDefault;

type iBXRestTasksTaskListHttpDefaultFromKeys<T extends iBXRestTasksTaskListHttpDefaultKeys[]> = {
  [K in T[number] as Uppercase<string & K>]: iBXRestTasksTaskListHttpDefault[K];
};

function getObjectWithKeys<T extends iBXRestTasksTaskListHttpDefaultKeys[]>(
  keys: T
): iBXRestTasksTaskListHttpDefaultFromKeys<T> {
  const obj = {} as iBXRestTasksTaskListHttpDefaultFromKeys<T>;
  for (const key of keys) {
    obj[key.toUpperCase()] = null; // Set initial values as needed
  }
  return obj;
}

// Usage
const result = getObjectWithKeys(['groupId']);
console.log(result); // { GROUP_ID: null }
result.GROUPID
