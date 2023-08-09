import iHttpAnswerBX from '@/bx-rest/typification/rest/base/httpAnswerBX'

export type keyBatch = string | number

export interface iBatchRequestParam <T>{
    name: string,
    param: T
}

export type iBatchRequestParamHttp = {[key:keyBatch]: string}

export type iBatchRequestParamArr<T> = {[key:keyBatch]: iBatchRequestParam <T>}

export interface iBatchRequestAnswer<T> extends iHttpAnswerBX<iHttpAnswerBX<{[key:keyBatch]: T}>>{}
