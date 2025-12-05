import { iHttpParamSettings } from '../../typification/rest/settings'

export class HttpData {

  defSettings: iHttpParamSettings = {
    timeZone: {
      calc: true,
      levelOut: false
    }
  }

  getHttpParamsPost(
    obj: any,
    sendHttpParams: FormData = new FormData(),
    nesting: string[] = [],
    settings = this.defSettings
  ): any {
    if (obj instanceof Blob) {
      let first = nesting[0]
      let setKey = (nesting.length > 1)
        ? first + '[' + nesting.slice(1).join('][') + ']'
        : first
      sendHttpParams.set(setKey, obj)
      return sendHttpParams
    } else if (obj instanceof Date) {
      let first = nesting[0]
      let tzoffset = (settings.timeZone.calc) ? obj.getTimezoneOffset() * 60000 : 0 // вычисляем влияние часового пояса
      let levelOut = (settings.timeZone.levelOut) ? obj.getTimezoneOffset() * 60000 : 0 // вычисляем влияние часового пояса
      let setKey = (nesting.length > 1)
        ? first + '[' + nesting.slice(1).join('][') + ']'
        : first
      sendHttpParams.set(setKey, (new Date(obj.valueOf() + tzoffset - levelOut)).toISOString())
      return sendHttpParams
    } else {
      for (const key in obj) {
        let setKey = ''
        if (nesting.length) {
          let first = nesting[0]
          setKey = (nesting.length > 1)
            ? first + '[' + nesting.slice(1).join('][') + '][' + key + ']'
            : first + '[' + key + ']'
        } else {
          setKey = key
        }
        switch (typeof obj[key]) {
          case 'string':
            sendHttpParams.set(setKey, obj[key])
            break
          case 'symbol':
          case 'number':
          case 'bigint':
          case 'boolean':
            sendHttpParams.set(setKey, String(obj[key]))
            break
          case 'object':
            nesting.push(key)
            sendHttpParams = this.getHttpParamsPost(
              obj[key],
              sendHttpParams,
              nesting,
              settings
            )
            nesting.pop()
            break
          case 'function':
          case 'undefined':
          default:
            console.error('You sent something wrong', obj[key], typeof obj[key], typeof obj)
        }
      }
    }
    return sendHttpParams
  }

  sliceArrayIntoChunks(arr: any[], chunkSize: number) {
    const res = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize)
      res.push(chunk)
    }
    return res
  }

  removingMultipleSlashes(str: string) {
    return str.replace(/\/{2,}/g, '/')
  }
}
