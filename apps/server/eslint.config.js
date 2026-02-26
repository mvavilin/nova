import baseConfig from '@repo/eslint-config/base';

export default [
  ...baseConfig,
  {
    rules: {
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            req: true,
            res: true,
          },
        },
      ],
    },
  },
];
