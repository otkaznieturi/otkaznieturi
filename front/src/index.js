import React from 'react';
import ReactDOM from 'react-dom';
import {routes} from './routes.jsx'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './store.js'

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)
