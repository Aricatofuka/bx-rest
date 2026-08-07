/** Main calendar settings returned by `calendar.settings.get`. */
export interface iBXRestCalendarSettings {
  work_time_start: string
  work_time_end: string
  year_holidays: string
  year_workdays?: string
  week_holidays: string[]
  week_start: string
  user_name_template: string
  sync_by_push: boolean
  user_show_login: boolean
  path_to_user: string
  path_to_user_calendar: string
  path_to_group: string
  path_to_group_calendar: string
  path_to_vr: string
  path_to_rm: string
  rm_iblock_type: string
  rm_iblock_id: string
  dep_manager_sub: boolean
  denied_superpose_types: string[]
  pathes_for_sites: string | boolean
  forum_id: string
  rm_for_sites: boolean
  path_to_type_company_calendar: string
  path_to_type_location: string
  path_to_type_open_event: string
}
