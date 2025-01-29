import { BXRestNavvyRestCalendarEvent } from './calendar/event'
import { BXRestNavvyRestCalendarSection } from './calendar/section'

export class BXRestNavvyCalendar {

  // TODO: эту дичь расформировать потом по классам
  /*
  url = {
    accessibility: {get: getNameMethod([$calendar, $accessibility, $get])}, // Возвращает занятость пользователей из списка.
    meeting: {
      params: {
        set: getNameMethod([$calendar, $meeting, $params, $set]), // Устанавливает параметры события для текущего пользователя
      },
      status: {
        get: getNameMethod([$calendar, $meeting, $status, $get]), // Возвращает статус участия текущего пользователя в событии
        set: getNameMethod([$calendar, $meeting, $status, $set]), // Устанавливает статус участия в событии для текущего пользователя
      },
    },
    resource: {
      list: getNameMethod([$calendar, $resource, $list]), // Возвращает список (массив) всех ресурсов
      add: getNameMethod([$calendar, $resource, $add]), // Добавляет новый ресурс
      update: getNameMethod([$calendar, $resource, $update]), // Изменяет ресурс
      delete: getNameMethod([$calendar, $resource, $delete]), // Удаляет ресурс
      booking: {
        list: getNameMethod([$calendar, $resource, $booking, $list]), // Предоставляет возможность выбрать бронирования ресурсов
      }
    },
    settings: {
      get: getNameMethod([$calendar, $settings, $get]), // Возвращает основные настройки календаря
      set: getNameMethod([$calendar, $user, $settings, $set]), // Сохраняет пользовательские настройки календаря
    },
    getbyid: getNameMethod([$calendar, $event, 'getbyid']), // Возвращает событие календаря по идентификатору
  }
  */
  public readonly event = new BXRestNavvyRestCalendarEvent()
  public readonly section = new BXRestNavvyRestCalendarSection()
}
