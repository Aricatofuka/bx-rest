import { iBXRestYesNo } from '../base/yes-no'

export interface iBXRestAppInfo extends iBXRestAppInfoBase {
  ID: number // локальный идентификатор приложения на портале
  PAYMENT_EXPIRED: boolean,
}

export interface iBXRestAppInfoHttp extends iBXRestAppInfoBase {
  ID: string // локальный идентификатор приложения на портале
  PAYMENT_EXPIRED: iBXRestYesNo
}

export interface iBXRestAppInfoBase {
  VERSION: 1 // установленная версия приложения
  STATUS: 'F' // (Free) - бесплатное
    | 'D' // (Demo) - демо-версия
    | 'T' //  (Trial) - триальная версия (ограниченная по времени)
    | 'P' // (Paid) - оплаченное приложение
    | 'L' // (Local) - локальное приложение
    | 'S' // (Subscription) - подписное приложение
  INSTALLED: boolean,
  DAYS: null,
  LICENSE: 	// Обозначение тарифа с указанием региона в виде префикса.Состоит из базового языка портала и идентификатора тарифного плана. В случае с тарифами, состав которых менялся при сохранении публичного наименования (как CRM+, Команда и Компания), понять, какой именно тариф действует по этому полю нельзя. Примеры вариантов значений:
    'ru_project' // - тариф Проект
    | 'ru_basic' // - тариф Базовый
    | 'ru_std' // - тариф Стандартный
    | 'ru_pro100' // - тариф Профессиональный
    | 'ru_ent250' // - Энтерпрайз 250
    | 'ru_ent500' // - Энтерпрайз 500
    | 'ru_ent1000' // - Энтерпрайз 1000
    | 'ru_ent2000' // - Энтерпрайз 2000
    | 'ru_ent10000' // - Энтерпрайз 10000
}
