// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './components/App'
import reducers from './reducers'

const persistConfig = {
  key: 'gbz80',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(
  persistedReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
const persistor = persistStore(store)

const render = Component => {
  const root = document.getElementById('root')
  if (root) {
    ReactDOM.render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component />
        </PersistGate>
      </Provider>,
      root,
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
