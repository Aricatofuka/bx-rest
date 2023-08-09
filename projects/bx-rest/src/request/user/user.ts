import { Observable, of, take } from 'rxjs'
import { first, map, mergeMap, tap } from 'rxjs/operators'
import clone from 'just-clone'
import compare from 'just-compare'
import { iBXGetParam } from '../../typification/rest/user/get'
import HttpBXServices from '../../services/http/HttpBX'
import UserFilterSearch from '../../typification/rest/user/UserFilterSearch'
// import ImgServices from 'bx-rest/services/api/bitrix/custom/img'
import { Store } from '@ngrx/store'
import { loadAll, saveArr, saveIDLoadedDepartment, saveSelf, storeUsers } from '../../store/users'
import { iCustomUserFieldInfo } from '../../typification/rest/user/CustomUserFieldInfo'
import { DatePipe } from '@angular/common'
import { BitrixApiUserMapServices } from '../../services/map/rest/user'
// import DateTrace from 'bx-rest/services/api/trace/metods/date'
import SnackBarService from '../../services/snack-bar/snack-bar.service'
import iHttpAnswerBX from '../../typification/rest/base/httpAnswerBX'
import { iBXRestUser, iBXRestUserHttp, iBXRestUserHttpField } from '../../typification/rest/user/user'
import { $get, $list, $search, $update, $user } from '../../consts/part-name-metods'
import { UserFilter } from '../../typification/rest/user/userFilter'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestUser {
    url = {
        admin: [$user, 'admin'],
        get: [$user, $get],
        self: [$user, 'current'],
        update: [$user, $update],
        search: [$user, $search],
        access: [$user, 'access'], // U1 - пользователь с id =1
        // AU - все авторизованные пользователи
        // D1 - подразделение с id=1
        // G1 - группа с id=1
        fields: [$user, 'fields'],
        userfield: {
            list: [$user, 'userfield', $list]
        }
    }

    def: { params: { ACTIVE: 1, start: 0 } } = {
        params: {ACTIVE: 1, start: 0}
    }

    user$: Observable<storeUsers>

    constructor(
        private http: HttpBXServices,
        private snackBar: SnackBarService,
       // private img: ImgServices,
        //private dateTrace: DateTrace,
        private store: Store<{ users: storeUsers }>,
        private userMap: BitrixApiUserMapServices,
        private datePipe: DatePipe
    ) {
        this.user$ = this.store.select('users')
    }

    get(params: iBXGetParam = {}): Observable<iHttpAnswerBX<iBXRestUserHttp[]> | undefined> {
        let copyParams = clone(params)
        this.setDefParam(copyParams)
        return this.http.post<iHttpAnswerBX<iBXRestUserHttp[]> | undefined>
        (this.url.get, copyParams, 'Не удалось получить пользователей')
            .pipe(
                tap(v => {
                    if (v && v.result) {
                        this.saveArrUser(v.result)
                    }
                })
            )
    }

    getOnePage(page: number = 1) {
        return this.get({start: (page - 1) * 50}).pipe(
            map(v => {
                let res = this.http.mapResult(v)
                return (res) ? res.map(r => this.userMap.HttpToBX(r)) : undefined
            })
        )
    }

    getByID(id: number, reload = true): Observable<iBXRestUser | undefined> {
        return this.getByIDs([id], reload).pipe(map(v => (v && v.length) ? v[0] : undefined))
    }

    getByIDs(ids: number[], reload = true): Observable<iBXRestUser[] | undefined> {
        ids = Array.from(new Set(ids))
        return this.user$.pipe(
            take(1),
            mergeMap(v => {
                if (!reload) {
                    let find = v.data.filter(i => ids.includes(i.ID))
                    if (find && find.length === ids.length) {
                        return of(find)
                    }
                }
                return this.getAll({ID: ids, ACTIVE: 2}).pipe(map(v => (v && v.length) ? v : undefined))
            })
        )
    }

    getSelf(update = false) {
        if (update) {
            return this.getSelfHttp()
        } else {
            return this.user$.pipe(
                mergeMap(v => {
                    if (v && v.self) {
                        return of(v.self)
                    } else {
                        return this.getSelfHttp()
                    }
                }),
                first()
            )
        }
    }

    getSelfHttp() {
        return this.http.get<iHttpAnswerBX<iBXRestUserHttp>>
        (this.url.self, {}, 'Не удалось получить пользователя')
            .pipe(
                map(v => {
                    if (v && v.result) {
                        return this.userMap.HttpToBX(v.result)
                    }
                    return undefined
                }),
                tap(v => {
                    if (v) {
                        this.store.dispatch(saveSelf({self: v}))
                    }
                }),
            )
    }

    access(access: string[], textError = 'Не удалось получить права') {
        return this.http.get<iHttpAnswerBX<boolean> | undefined>(this.url.access, {ACCESS: access}, textError).pipe(
            map(v => this.http.mapResult(v))
        )
    }

    getByDepartment(id: number[] | number): Observable<iBXRestUser [] | undefined> {
        const ids: number[] = (typeof id === 'number') ? [id] : id
        return this.user$.pipe(
            first(),
            mergeMap(
                v => {
                    if (v.load.all) {
                        return of(clone(v.data.filter(i => ids.find(id => i.UF_DEPARTMENT.includes(id)))))
                    }
                    if (ids.every(i => v.load.department.includes(i))) {
                        return of(clone(v.data.filter(i => ids.find(id => i.UF_DEPARTMENT.includes(id)))))
                    }
                    return this.getAll({UF_DEPARTMENT: ids}).pipe(tap(_ => {
                        this.store.dispatch(saveIDLoadedDepartment({id: ids}))
                    }))
                })
        )
    }

    getAll(params: iBXGetParam = {}): Observable<iBXRestUser [] | undefined> {
        if (!Object.keys(params).length) {
            params = clone(this.def.params)
        }

        const saveAllUser = compare(params, this.def.params)
        return this.user$.pipe(
            take(1),
            mergeMap(v => {
                if (v.load.all) {
                    if (compare(this.def.params, params)) {
                        return of(clone(v.data))
                    }
                }

                return this.getEndArray(params).pipe(
                    take(1),
                    map(v => {
                        if (v && v.result) {
                            let cl = clone(v.result)
                            return this.saveArrUser(cl)
                        }
                        return undefined
                    }),
                )
            }),
            tap(v => {
                if (v && v.length && saveAllUser) {
                    this.store.dispatch(loadAll({load: true}))
                }
                params.start = this.def.params.start
            })
        )
    }

    getAllByPersonalBirthday(day: number | undefined = undefined, month: number | undefined = undefined, checkWeekend = false) {
        return this.http.timeNowOnServer().pipe(
            mergeMap(date => {
                if (date) {
                    let daySent = (day) ? day : date.getDate()
                    let start = date.getFullYear() + 1
                    let monthSent = (month) ? month : date.getMonth() + 1
                    let arr: string[] = Array.from(Array(200).keys()).map(_ => {
                        start--
                        let res = this.datePipe.transform(new Date(start, monthSent - 1, daySent), 'YYYY-MM-dd')
                        return (res) ? res : ''
                    })
                    // TODO: Упростить
                    if (checkWeekend && date.getDay() === 1) {
                        start = date.getFullYear() + 1
                        arr.push(
                            ...Array.from(Array(200).keys()).map(_ => {
                                start--
                                let res = this.datePipe.transform(new Date(start, monthSent - 1, daySent - 1), 'YYYY-MM-dd')
                                return (res) ? res : ''
                            })
                        )
                        start = date.getFullYear() + 1
                        arr.push(
                            ...Array.from(Array(200).keys()).map(_ => {
                                start--
                                let res = this.datePipe.transform(new Date(start, monthSent - 1, daySent - 2), 'YYYY-MM-dd')
                                return (res) ? res : ''
                            })
                        )
                    }
                    return this.getAll({PERSONAL_BIRTHDAY: arr})
                }
                this.snackBar.warning('Не удалось получить время сервера')
                return of(undefined)
            })
        )
    }

    saveArrUser(users: iBXRestUserHttp[]) {
        let result: iBXRestUser [] = []
        for (const user of users) {
            result.push(this.userMap.HttpToBX(user))
        }
        this.store.dispatch(saveArr({arr: result}))

        return result
    }

    search(params: string | UserFilterSearch): Observable<iBXRestUser [] | undefined> {
        if (typeof params === 'string') {
            params = {FIND: params}
        }
        if (typeof params.ACTIVE !== 'boolean') {
            params.ACTIVE = true
        }
        return this.http.get<iHttpAnswerBX<iBXRestUserHttp[]>>(this.url.search, params, 'Сервер не отвечает на запрос поиска')
            .pipe(
                map(v => {
                    if (v && v.result) {
                        const mapResult = this.http.mapResult(v)
                        if (mapResult) {
                            return this.saveArrUser(mapResult)
                        }
                    }
                    return undefined
                })
            )
    }

    fields(): Observable<iBXRestUserHttpField | undefined> {
        return this.http.get<iHttpAnswerBX<iBXRestUserHttpField>>(this.url.fields).pipe(
            map(v => this.http.mapResult(v))
        )
    }

    update(user: iBXRestUser, fieldUpdate: string[]): Observable<iHttpAnswerBX<iBXRestUserHttp[]> | undefined> {
        if (fieldUpdate && fieldUpdate.length) {
            let sendData: any = {
                ID: user.ID,
            }
            const userBX = this.userMap.BXtoHttp(user)
            for (const field of fieldUpdate) {
                if (userBX[field]) {
                    sendData[field] = userBX[field]
                } else {
                    this.snackBar.error('Одно из указанных полей отправлено не верно')
                }
            }
            return this.http.post(this.url.update, sendData, 'Не удалось обновить пользователя с ID' + user.ID)
        } else {
            this.snackBar.error('Не указано ни одно поле для редактирования пользователя')
            return of({})
        }
    }

    getEndArray(params: UserFilter = {}): Observable<iHttpAnswerBX<iBXRestUserHttp[]> | undefined> {
        return this.get(params).pipe(
            mergeMap(items => {
                if (items && items.result && typeof items.result === 'object') {
                    if (items.next) {
                        params.start = items.next
                        return this.getEndArray(params).pipe(map(vEnd => {
                            if (vEnd && items.result && vEnd.result) {
                                return {result: [...items.result, ...vEnd.result]}
                            }
                            return (items) ? items : undefined
                        }))
                    }
                    return of(items)
                } else {
                    return of(undefined)
                }
            }),
        )
    }

    // getUrlCompressedImage(url: string, width: number, height: number) {
    //     return this.img.getUrlCompressed(url, width, height)
    // }

    setDefParam(params: iBXGetParam) {
        if (!params.hasOwnProperty('ACTIVE')) {
            params.ACTIVE = this.def.params.ACTIVE
        }
        if (params.ACTIVE && params.ACTIVE === 2) {
            delete params.ACTIVE
        }
        if (!params.hasOwnProperty('start')) {
            params.start = this.def.params.start
        }

        if (params.UF_DEPARTMENT && !params.UF_DEPARTMENT.length) {
            delete params.UF_DEPARTMENT
        }
    }

    getInfoAboutCustomFieldsBX() {
        return this.http.get<iHttpAnswerBX<iCustomUserFieldInfo[]>>(this.url.userfield.list).pipe(
            map(v => this.http.mapResult(v))
        )
    }

    itIsAdmin() {
        return this.http.get<iHttpAnswerBX<boolean>>(this.url.admin).pipe(
            map(v => this.http.mapResult(v))
        )
    }
}
