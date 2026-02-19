import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier';
import unicorn from 'eslint-plugin-unicorn';
import turboPlugin from 'eslint-plugin-turbo';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,

  ...tsEslint.configs.recommended,

  eslintConfigPrettier,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // Использовать tsconfig.json из проекта
        project: true,
      },
    },
    plugins: {
      turbo: turboPlugin,
      unicorn,
      prettier: pluginPrettier,
    },
    rules: {
      // Проверка переменных окружения Turbo
      'turbo/no-undeclared-env-vars': 'warn',

      // Запрещает утверждения типа (angle bracket или 'as')
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],

      // Запрещает ненулевые утверждения с использованием '!'
      '@typescript-eslint/no-non-null-assertion': 'error',

      // Проверяет соответствие форматированию Prettier
      'prettier/prettier': 'error',

      // Ограничивает функции максимум 40 строками (исключая пустые строки и комментарии)
      'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
    },
  },

  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];
