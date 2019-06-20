module.exports = {
  'extends': [
    './core.js',
    './import.js',
    './fp.js',
  ],
  "rules": {
    'fp/no-nil': 'off',
    'fp/no-this': 'off',
    'fp/no-mutation': 'off',
    'no-invalid-this': 'off',
    'no-empty-function': 'off',
    'no-console': 'off',
    'no-unused-expressions': 'off',
  },
  'env': {
    'browser': false,
    'es6': true,
    'node': true,
  },
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
    },
    'sourceType': 'module',
  },
};
