import { iBXRestYesNo } from '../base/YesNo'
import { iBXRestBaseParam } from '../support/param'

export interface iBXGetParam extends iBXRestBaseParam {
    ID?: number[] | number, // по ID
    PERSONAL_BIRTHDAY?: string | string[]
    order?: 'ASC' | 'DESC', // сортировка
    UF_DEPARTMENT?: number[],  // принадлежность к структуре компании
    UF_PHONE_INNER?: string, // внутренний телефонный номер
    IS_ONLINE?: iBXRestYesNo,  // позволяет показать только авторизованных или нет пользователей
    NAME_SEARCH?: string, // быстрый поиск по персональным данным
    USER_TYPE?: 'employee' | 'extranet' | 'email', // Тип пользователя. Может принимать следующие значения:
    // employee - сотрудник,
    // extranet - пользователь экстранета,
    // email - почтовый пользователь
    ACTIVE?: 2 | 1 | 0 // при значении 1 исключает из запроса уволенных пользователей. 2 - если нужны и те и те
}
