// typescript.js лениво делает require('source-map-support').install(), но
// только в Node-окружении (проверка происходит внутри самого пакета) — в
// браузере эта ветка никогда не выполняется. Тем не менее esbuild резолвит
// импорт статически, а сам пакет source-map-support тянет за собой Node-only
// модуль 'path', которого нет в браузерной сборке. Подставляем no-op вместо
// реального пакета через tsconfig.json paths (см. "source-map-support" там).
export function install(): void {}

export default { install }
