module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended', // Для правил линтинга TypeScript
        'next/core-web-vitals', // Для правил Next.js
        "prettier"
    ],
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "ignorePatterns": ['.eslintrc.js', 'next.config.js', 'postcss.config.js'],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": '@typescript-eslint/parser', // Указываем парсер для TypeScript
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true, // Для поддержки JSX
        },
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react",
        '@typescript-eslint', // Добавляем плагин для TypeScript
    ],
    "rules": {},
    "settings": {
        "react": {
            "version": 'detect', // Автоматически определяет версию React для правил линтинга
        },
    },
}
