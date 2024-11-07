import { inject, Injectable } from '@angular/core'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestParamLogBlogPostAdd } from '../../typification/rest/log/blogpost/add'
import { iBXRestBlogPostHttp, iBXRestParamBlogPostGet } from '../../typification/rest/log/blogpost/get'
import { methods } from '../../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestLogBlogPost {

  protected url = methods.log.blogpost

  private readonly http = inject(HttpBXServices)

  add(param: iBXRestParamLogBlogPostAdd) {
    return this.http.post<boolean>(this.url.add, param)
  }

  get(param: iBXRestParamBlogPostGet = {}) {
    return this.http.post<iBXRestBlogPostHttp[]>(this.url.get, param)
  }

}
