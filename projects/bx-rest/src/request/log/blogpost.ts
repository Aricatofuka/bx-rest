import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestParamLogBlogPostAdd } from '../../typification/rest/log/blogpost/add'
import { iBXRestBlogPostHttp, iBXRestParamBlogPostGet } from '../../typification/rest/log/blogpost/get'
import { $add, $blogpost, $get, $log } from '../../consts/part-name-methods'

export class BXRestLogBlogPost {

  protected url = {
    add: [$log, $blogpost, $add],
    get: [$log, $blogpost, $get],
  }

  private readonly http = new HttpBXServices()

  add(param: iBXRestParamLogBlogPostAdd) {
    return this.http.post<boolean>(this.url.add, param)
  }

  get(param: iBXRestParamBlogPostGet = {}) {
    return this.http.post<iBXRestBlogPostHttp[]>(this.url.get, param)
  }

}
