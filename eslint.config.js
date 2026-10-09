import eslint from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import globals from 'globals'

export default [
    {
        // Конфигурация для TypeScript файлов
        files: ["projects/bx-rest/src/**/*.ts"],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
            // Код живёт в браузере, но *.spec.ts выполняются в Node (vitest) и
            // читают `process.env` напрямую — без globals.node это ловилось
            // базовым no-undef как ложная ошибка.
            globals: { ...globals.browser, ...globals.node }
        },
        plugins: {
            "@typescript-eslint": tseslint,
        },
        rules: {
            ...eslint.configs.recommended.rules, // Рекомендуемые правила ESLint
            ...tseslint.configs.recommended.rules, // Рекомендуемые правила для TypeScript
            ...tseslint.configs.stylistic.rules, // Правила стиля для TypeScript
            "@typescript-eslint/no-explicit-any": "off", // Разрешить использование `any`
            "@angular-eslint/no-input-rename": "off", // Отключить правило о переименовании входных параметров
            "import/extensions": "off", // Отключить необходимость указывать расширения
            // Базовое правило не понимает TS-перегрузки методов (несколько
            // сигнатур с одним именем — валидный паттерн, см. httpNavvy.ts) и
            // ложно помечает их как дублирование. tsc и так проверяет, что
            // сигнатуры совместимы, так что здесь это чистый шум.
            "no-dupe-class-members": "off",
            // Та же история, что и с no-dupe-class-members, но для
            // function-перегрузок на уровне модуля (см. mapResult.ts).
            "no-redeclare": "off",
            // В проекте намеренно используются пустые интерфейсы вида
            // `interface FooHttp extends Base {}` как именованные алиасы
            // (отдельный номинальный тип для варианта "как приходит по HTTP"
            // / агрегаторы generic-параметров в typification/base). Это не
            // ошибка, а устоявшийся в кодовой базе приём.
            "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
            // Пустые функции-заглушки в тестах (`() => {}` для мока) —
            // легитимный паттерн, не стоит требовать их переписывать.
            "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
        }
    }
];
