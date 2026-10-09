import { iBXRestAnswer } from '../base/answer'

export type keyBatch = string | number

export interface iBatchRequestParam <T>{
    name: string,
    param: T
}

export type iBatchRequestParamHttp = Record<keyBatch, string>;

export type iBatchRequestParamArr<T> = Record<keyBatch, iBatchRequestParam <T>>;

export type iBatchRequestAnswer<T> = iBXRestAnswer<iBXRestAnswer<Record<keyBatch, T>>>
