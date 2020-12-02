const RULES = {
  ERROR: 'error',
  OFF: 'off',
  WARN: 'warn',
};

module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': RULES.OFF,
    '@typescript-eslint/no-use-before-define': [RULES.ERROR],
    '@typescript-eslint/no-var-requires': RULES.OFF,
    'no-console': RULES.WARN,
    'no-nested-ternary': RULES.OFF,
    'no-use-before-define': RULES.OFF,
    'react/jsx-curly-newline': RULES.OFF,
    'react/jsx-props-no-spreading': RULES.OFF,
    'react/jsx-wrap-multilines': RULES.OFF,
    'react/no-unknown-property': [RULES.WARN, {}],
    'react/prop-types': RULES.OFF,
    'react/require-default-props': RULES.OFF,
    '@typescript-eslint/no-unused-vars': RULES.ERROR,
    'no-unused-vars': RULES.OFF,
  },
  settings: { react: { version: 'detect' } },
};
