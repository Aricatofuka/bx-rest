import { iBXRestYesNo } from '../base/YesNo'

export interface FieldItemLists {
  FIELD_ID: string
  SORT: number,
  NAME: string,
  IS_REQUIRED: iBXRestYesNo,
  MULTIPLE: iBXRestYesNo,
  DEFAULT_VALUE: any,
  TYPE: 'L' | 'F' | 'S:Date' | 'PREVIEW_TEXT' | string,
  PROPERTY_TYPE: string | boolean,
  PROPERTY_USER_TYPE: boolean | any,
  SETTINGS: {
    SHOW_ADD_FORM: iBXRestYesNo,
    SHOW_EDIT_FORM: iBXRestYesNo,
    USE_EDITOR?: iBXRestYesNo,
    WIDTH?: number,
    HEIGHT?: number,
    ADD_READ_ONLY_FIELD?: null | string,
    EDIT_READ_ONLY_FIELD?: null | string,
    SHOW_FIELD_PREVIEW: null | string
  },
  IBLOCK_ID: number,
  DISPLAY_VALUES_FORM?: {
    [key: number]: string
  }
}
