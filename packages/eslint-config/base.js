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

  unicorn.configs.recommended,

  eslintConfigPrettier,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // использовать tsconfig.json из проекта
        project: true,
      },
    },
    plugins: {
      turbo: turboPlugin,
      prettier: pluginPrettier,
    },
    rules: {
      // проверка переменных окружения turbo
      'turbo/no-undeclared-env-vars': 'warn',

      // запрещает утверждения типа (angle bracket или 'as')
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],

      // запрещает ненулевые утверждения с использованием '!'
      '@typescript-eslint/no-non-null-assertion': 'error',

      // запрещает использование any
      '@typescript-eslint/no-explicit-any': 'error',

      // требует явного указания типа возвращаемого значения функции
      '@typescript-eslint/explicit-function-return-type': 'error',

      // требует явного указания модификаторов доступа в классах (кроме constructor)
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          overrides: {
            constructors: 'off',
          },
        },
      ],

      // разрешает использование null
      'unicorn/no-null': 'off',

      // проверяет соответствие форматированию prettier
      'prettier/prettier': 'error',

      // ограничивает функции максимум 40 строками (исключая пустые строки и комментарии)
      'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
            req: true,
            res: true,
          },
        },
      ],
    },
    linterOptions: {
      noInlineConfig: true, // запрещает отключение правил через комментарии
    },
  },

  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];
