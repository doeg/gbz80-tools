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
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    semi: ['error', 'never'],
  },
}
