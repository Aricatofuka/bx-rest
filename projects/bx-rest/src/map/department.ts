import { Injectable } from '@angular/core'
import { iBXRestDepartmentHttp, iBXRestDepartment } from '../typification/rest/department/department'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapDepartment {
  get(item: iBXRestDepartmentHttp[] | undefined): iBXRestDepartment[] | undefined {
    return (item) ? item.map(dep => {
      if (dep.PARENT) {
        return {
          ID: Number(dep.ID),
          UF_HEAD: Number(dep.UF_HEAD),
          PARENT: Number(dep.PARENT),
          NAME: dep.NAME,
          SORT: dep.SORT,
        }
      } else {
        return {
          ID: Number(dep.ID),
          UF_HEAD: Number(dep.UF_HEAD),
          NAME: dep.NAME,
          SORT: dep.SORT,
        }
      }
    }) : undefined
  }
}
