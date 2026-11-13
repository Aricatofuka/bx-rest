// Размеры страниц и пакетов Bitrix24 по документации. Все они собраны здесь, а не записаны
// числами по месту: так видно, у каких методов размер общий, и его легко поправить.

/**
 * Стандартный размер страницы Bitrix24. Столько записей отдают методы со `start`,
 * методы с `NAV_PARAMS` и большинство методов с другой пагинацией.
 */
export const PAGE_SIZE = 50

/** Больше команд в одном запросе `batch` Bitrix24 не принимает. */
export const BATCH_COMMANDS_LIMIT = 50

/** `im.dialog.users.list` и `im.recent.list`: наибольший `LIMIT`. По умолчанию — {@link PAGE_SIZE}. */
export const IM_LIST_MAX_PAGE_SIZE = 200

/** `im.department.colleagues.list` и `im.search.*.list`: `LIMIT` по умолчанию. Наибольший — {@link PAGE_SIZE}. */
export const IM_SEARCH_PAGE_SIZE = 10

/** `crm.timeline.logmessage.list`: постоянный размер страницы. */
export const CRM_TIMELINE_LOGMESSAGE_PAGE_SIZE = 10

/** `sign.b2e.company.provider.list`: `limit` по умолчанию. */
export const SIGN_PROVIDER_PAGE_SIZE = 100

/** `sign.b2e.company.provider.list`: наибольший `limit`. */
export const SIGN_PROVIDER_MAX_PAGE_SIZE = 1000

/** `mail.mailbox.list` и `mail.message.list`: `pagination.limit` по умолчанию. */
export const MAIL_PAGE_SIZE = 25

/** `mail.mailbox.list`: наибольший `pagination.limit`. */
export const MAIL_MAILBOX_MAX_PAGE_SIZE = 100

/** `mail.message.list`: наибольший `pagination.limit`. */
export const MAIL_MESSAGE_MAX_PAGE_SIZE = 200

/** `main.eventlog.list` и `timeman.record.list`: наибольший `pagination.limit`. По умолчанию — {@link PAGE_SIZE}. */
export const EVENTLOG_TIMEMAN_MAX_PAGE_SIZE = 1000

/** `note.collection.list`: наибольший `pagination.limit`. По умолчанию — {@link PAGE_SIZE}. */
export const NOTE_COLLECTION_MAX_PAGE_SIZE = 200
