module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['eslint-plugin-flowtype'],
  rules: {
    'arrow-parens': [1, 'as-needed'],
    'comma-dangle': [
      'error',
      {
        functions: 'ignore',
      },
    ],
    'function-paren-newline': [0, 'never'],
    'no-plusplus': [0, 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-wrap-multilines': [0, 'never'],
    semi: ['error', 'never'],
  },
}
