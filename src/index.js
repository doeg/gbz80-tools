// @flow
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

const render = Component => {
  const root = document.getElementById('root')
  if (root) {
    ReactDOM.render(<Component />, root)
  }
}

render(App)

// Webpack hot module replacement API
// See https://github.com/gaearon/react-hot-loader#getting-started
if (module.hot) {
  // eslint-disable-next-line no-extra-semi
  ;(module.hot: any).accept('./App', () => {
    render(App)
  })
}
