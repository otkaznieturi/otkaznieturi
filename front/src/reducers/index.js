import {combineReducers} from 'redux'
import {authReducer} from './auth'
import {accountReducer} from './account'
import {mainPageReducer} from './main'
import {routerReducer} from 'react-router-redux'

export const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  routing: routerReducer,
  main: mainPageReducer
})