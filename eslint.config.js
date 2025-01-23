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
            globals: globals.browser
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
        }
    }
];
