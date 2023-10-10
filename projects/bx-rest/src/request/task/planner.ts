import { Injectable } from '@angular/core'
import { $getlist, $planner, $task } from '../../consts/part-name-metods'
import { HttpBXServices } from '../../services/http/HttpBX'

@Injectable({
  providedIn: 'root'
})
export class BXRestTaskPlanner {

  constructor(
    private http: HttpBXServices
  ) {
  }

  getList(){
    return this.http.post<(string | number)[]>([$task, $planner, $getlist])
  }
}
