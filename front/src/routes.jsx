import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import LoginPage from './components/auth/login.jsx'
import Logout from './components/auth/logout.jsx'
import MainPage from './components/main.jsx'
import RegisterPage from './components/auth/register.jsx'
import NotFound from './components/not_found.jsx'
import AccountPage from './components/account.jsx'
import {requireAuth} from './app.jsx'

export const routes = (  
  <div>
    <Route path='/tours' component={requireAuth()} >
      <IndexRedirect to='all' />
      <Route path='all' />
      <Route path='add' />
    </Route>
    <Route path='/account' component={requireAuth()} >
      <IndexRedirect to='/my' />
      <Route path='/my' component={AccountPage} />
    </Route>
    <Route path='/' component={MainPage} />
    <Route path='login' component={LoginPage} />
    <Route path='logout' component={Logout} />
    <Route path='register' component={RegisterPage} />
    <Route path='*' component={NotFound} />    
  </div>
)