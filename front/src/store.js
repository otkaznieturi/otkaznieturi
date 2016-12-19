import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { rootReducer } from './reducers/index.js'
import { redirect } from './middlewares/redirect'

export let configureStore = () => {
  const store = compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(createLogger()),
    applyMiddleware(redirect),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore)(rootReducer)

  if (module.hot) {
    module.hot.accept('./reducers/index.js', () => {
      const nextRootReducer = require('./reducers/index.js').rootReducer
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}