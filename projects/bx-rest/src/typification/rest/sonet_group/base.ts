export type iBXRestSonetGroupFieldsSelect = iBXRestSonetGroupFieldsBase | iBXRestSonetGroupFieldsAddForSelect
export type iBXRestSonetGroupFieldsOrder = iBXRestSonetGroupFieldsBase | iBXRestSonetGroupFieldsAddForOrder
export type iBXRestSonetGroupFieldsFilter = iBXRestSonetGroupFieldsBase | iBXRestSonetGroupFieldsAddForOrder | iBXRestSonetGroupFieldsAddForFilter

type iBXRestSonetGroupFieldsAddForFilter =
    'CHECK_PERMISSIONS'


type iBXRestSonetGroupFieldsAddForOrder =
    'OWNER_LAST_NAME'
    | 'OWNER_LOGIN'
    | 'IMAGE_ID'

type iBXRestSonetGroupFieldsAddForSelect =
    'DESCRIPTION'
    | 'KEYWORDS'
    | 'IMAGE_ID'


export type iBXRestSonetGroupFieldsBase =
    'ID'
    | 'SITE_ID'
    | 'NAME'
    | 'DATE_CREATE'
    | 'DATE_UPDATE'
    | 'DATE_ACTIVITY'
    | 'ACTIVE'
    | 'VISIBLE'
    | 'OPENED'
    | 'CLOSED'
    | 'SUBJECT_ID'
    | 'OWNER_ID'
    | 'INITIATE_PERMS'
    | 'SPAM_PERMS'
    | 'SUBJECT_NAME'
    | 'NUMBER_OF_MEMBERS'
