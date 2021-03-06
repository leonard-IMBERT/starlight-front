module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 'off',
    'import/extensions': ['error', { js: 'never', ts: 'never' }],
    'import/no-unresolved': 0,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
