module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['eslint-plugin-flowtype'],
  rules: {
    'arrow-parens': [1, 'as-needed'],
    'comma-dangle': [0, 'never'],
    'function-paren-newline': [0, 'never'],
    'import/prefer-default-export': [0, 'never'],
    'jsx-a11y/click-events-have-key-events': [0, 'never'],
    'jsx-a11y/no-noninteractive-element-interactions': [0, 'never'],
    'jsx-a11y/no-static-element-interactions': [0, 'never'],
    'no-bitwise': [0, 'never'],
    'no-plusplus': [0, 'never'],
    'no-use-before-define': [0, 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-wrap-multilines': [0, 'never'],
    semi: ['error', 'never'],
  },
}
