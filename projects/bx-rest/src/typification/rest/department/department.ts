export interface iBXRestDepartment extends iBXRestDepartmentBase {
    ID: number,
    PARENT?: number,
    UF_HEAD: number
}

export interface iBXRestDepartmentHttp extends iBXRestDepartmentBase {
    ID: string, // к сожалению, это не ошибка
    PARENT?: string, // к сожалению, это не ошибка ещё у заглавного департамента нет родителя
    UF_HEAD: string // к сожалению, это не ошибка
}

export interface iBXRestDepartmentBase {
    NAME: string,
    SORT: number,
}

