import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import LoginPage from './components/auth/login.jsx'
import Logout from './components/auth/logout.jsx'
import MainPage from './components/main.jsx'
import RegisterPage from './components/auth/register.jsx'
import NotFound from './components/not_found.jsx'
import AccountPage from './components/account.jsx'
import {ToursPage} from './components/tours.jsx'
import {AddToursPage} from './components/tours.jsx'
import ChangeAccPage from './components/auth/change.jsx'
import {requireAuth} from './app.jsx'

export const routes = (
  <div>
    <Route path='tours' component={requireAuth()} >
      <IndexRedirect to='all' />
      <Route path='all' component={ToursPage}/>
      <Route path='today' component={ToursPage}/>
      <Route path='add' component={AddToursPage}/>
    </Route>
    <Route path='account' component={requireAuth()} >
      <IndexRedirect to='my' />
      <Route path='my' component={AccountPage}>
        <Route path='my_tours' component={ToursPage} />
        <Route path='change' component={ChangeAccPage} />
      </Route>
    </Route>
    <Route path='/' component={MainPage} />
    <Route path='login' component={LoginPage} />
    <Route path='logout' component={Logout} />
    <Route path='register' component={RegisterPage} />
    <Route path='*' component={NotFound} />
  </div>
)