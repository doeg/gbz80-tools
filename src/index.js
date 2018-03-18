// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './components/App'
import reducers from './reducers'

const store = createStore(reducers)

const render = Component => {
  const root = document.getElementById('root')
  if (root) {
    ReactDOM.render(
      <Provider store={store}>
        <Component />
      </Provider>,
      root
    )
  }
}

render(App)

// Webpack hot module replacement API
// See https://github.com/gaearon/react-hot-loader#getting-started
if (module.hot) {
  // eslint-disable-next-line no-extra-semi
  ;(module.hot: any).accept('./components/App', () => {
    render(App)
  })
}
