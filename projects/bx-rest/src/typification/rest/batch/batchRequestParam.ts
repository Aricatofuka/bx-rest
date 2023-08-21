import { iBXRestAnswer } from '../base/answer'

export type keyBatch = string | number

export interface iBatchRequestParam <T>{
    name: string,
    param: T
}

export type iBatchRequestParamHttp = {[key:keyBatch]: string}

export type iBatchRequestParamArr<T> = {[key:keyBatch]: iBatchRequestParam <T>}

export interface iBatchRequestAnswer<T> extends iBXRestAnswer<iBXRestAnswer<{[key:keyBatch]: T}>>{}
