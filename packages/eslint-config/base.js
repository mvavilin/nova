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
    files: ['**/socket.fetcher.middleware.ts'],
    rules: {
      'max-lines-per-function': 'off',
    },
  },

  {
    ignores: ['dist/**', 'node_modules/**', 'apps/server/generated/**'],
  },

  {
    files: [
      '**/src/api/ComponentsAPI/base/managers/core/ChildrenManager.test.ts',
      '**/src/api/ComponentsAPI/base/managers/core/HierarchyManager.test.ts',
      '**/src/components/BaseForm/BaseForm.test.ts',
      '**/src/components/InputForm/InputForm.test.ts',
      '**/src/store/reducers/form.reducer.ts',
      '**/src/store/middlewares/socket.fetcher.middleware.ts',
      '**/src/store/middlewares/form.fetcher.middleware.ts',
      '**/src/store/middlewares/room.fetcher.middleware.ts',
      '**/src/app.ts',
      '**/src/pages/GamePage/components/modals/GameResultsModal/GameResultsModal.ts',
      '**/src/pages/GamePage/components/modals/KnowledgeCheckModal/KnowledgeCheckModal.ts',
      '**/src/pages/RoomPage/RoomInfoBlock/RoomInfoBlock.ts',
      '**/src/pages/WelcomePage/AboutUs/AboutUs.ts',
      '**/src/rooms/game.ts',
      '**/src/tests/game.test.ts',
      '**/src/ws/socketHandlers/gameHandlers.ts',
      '**/src/api/ComponentsAPI/base/BaseComponent.test.ts',
      '**/src/api/ComponentsAPI/forms/FormComponent/FormComponent.test.ts',
      '**/src/api/ComponentsAPI/ui/LinkComponent/LinkComponent.test.ts',
      '**/src/api/ComponentsAPI/ui/ImageComponent/ImageComponent.test.ts',
      '**/src/api/ComponentsAPI/forms/SelectComponent/SelectComponent.test.ts',
    ],
    rules: {
      'max-lines-per-function': 'off',
    },
  },
];
