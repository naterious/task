module.exports = {
  extends: [
    './core.js',
    './import.js',
    './fp.js',
  ],
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  // 'installedESLint': true,
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
};
