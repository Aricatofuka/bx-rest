import { filterGenerator } from '@/lib/typification/bitrix/api/rest/base/filterGenerator'
import tOrderOption from '@/lib/typification/bitrix/api/rest/base/OrderOptions'

export interface iFilterListTask extends filterGenerator<
    {
        ID: number, // идентификатор комментария
        AUTHOR_ID: number, // идентификатор автора комментария
        POST_DATE: Date // дата публикации комментария
    }
> {
    AUTHOR_NAME?: string, // имя автора
}


export interface iOrderListTask {
    ID?: tOrderOption, // идентификатор комментария
    AUTHOR_ID?: tOrderOption, // идентификатор автора комментария
    POST_DATE?: tOrderOption // дата публикации комментария
    AUTHOR_NAME?: tOrderOption, // имя автора
    AUTHOR_EMAIL?: tOrderOption, // почтовый адрес автора
}
