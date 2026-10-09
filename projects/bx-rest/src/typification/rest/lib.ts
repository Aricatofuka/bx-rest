export interface iRestLib {
    init: (callback?: () => void) => void
    getAuth: () => iRestLibGetAuth
    placement: {
        info: () => {
            options: any,
            placement: string
        }
    }
    fitWindow: (func?: () => void) => void
}

export interface iRestLibGetAuth {
    access_token: string,
    domain: string,
    expires_in: number
    member_id: string
    refresh_token: string
}
