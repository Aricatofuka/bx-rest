import { Injectable } from '@angular/core'
import { HttpBXServices } from '../../services/http/HttpBX'
import { methods } from '../../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestTaskPlanner {

  constructor(
    private http: HttpBXServices
  ) {
  }

  getList(){
    return this.http.post<(string | number)[]>(methods.task.planner.getList)
  }
}
