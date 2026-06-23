import { HttpBXServices } from '../../services/http/HttpBX'
import { $getlist, $planner, $task } from '../../consts/part-name-methods'

export class BXRestTaskPlanner {
  private readonly http = new HttpBXServices()

  getList(){
    return this.http.post<(string | number)[]>([$task, $planner, $getlist])
  }
}
