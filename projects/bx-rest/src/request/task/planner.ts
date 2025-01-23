import { HttpBXServices } from '../../services/http/HttpBX'
import { methods } from '../../typification/base/methods'

export class BXRestTaskPlanner {
  private readonly http = new HttpBXServices()

  getList(){
    return this.http.post<(string | number)[]>(methods.task.planner.getList)
  }
}
