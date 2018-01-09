module.exports = {
    extends: [
      'airbnb',
      'plugin:jest/recommended',
      'plugin:flowtype/recommended',
    ],
    plugins: [
      'react',
      'jsx-a11y',
      'import',
      'react-native',
      'flowtype',
      'lodash-fp',
      'promise',
      'jest',
      'json',
    ],
    parserOptions: {
        ecmaVersion: 7,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true
        }
    },
    rules: {
      'class-methods-use-this': 0,
      'comma-dangle': ['error', 'always-multiline'],
      'global-require': 2,
      'lodash-fp/use-fp': 2,
      'no-confusing-arrow': 0,
      'no-nested-ternary': 0,
      'no-return-assign': 0,
      'no-unused-expressions': 0,
      'one-var': 0,
      'promise/catch-or-return': 2,
      'promise/no-native': 2,
      'react-native/no-color-literals': 0,
      'react-native/no-unused-styles': 2,
      'react-native/split-platform-components': 2,
      'react/jsx-filename-extension': 0,
      'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
      'react/sort-comp': 0,
      'jsx-a11y/accessible-emoji': 0,
      'jsx-quotes': ['error', 'prefer-single'],
      'quote-props': ['error', 'consistent-as-needed'],
      'indent': ['error', 2, { VariableDeclarator: { var: 2, let: 2, const: 3 } }],
      'quotes': [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
    },
    env: {
      'jest/globals': true,
    },
    globals: {
      fetch: true,
      __DEV__: true,
      __OFFLINE__: true,
      window: true,
    },
    settings: {
      flowtype: {
        onlyFilesWithFlowAnnotation: true,
      },
    },
  };