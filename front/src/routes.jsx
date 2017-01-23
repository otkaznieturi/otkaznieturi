import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import LoginPage from './components/auth/login.jsx'
import Logout from './components/auth/logout.jsx'
import MainPage from './components/main.jsx'
import RegisterPage from './components/auth/register.jsx'
import NotFound from './components/not_found.jsx'
import {AccountPage, SubscribesPage} from './components/account.jsx'
import {ToursPage, ShowToursPage, AddToursPage, EditToursPage, SearchToursPage} from './components/tours.jsx'
import {UsersPage} from './components/users.jsx'
import ChangeAccPage from './components/auth/change.jsx'
import {App, AdminApp} from './app.jsx'

export const routes = (
  <div>
    <Route path='tours' component={App} >
      <IndexRedirect to='all' />
      <Route path='all' component={ToursPage}/>
      <Route path='today' component={ToursPage}/>
      <Route path='add' component={AddToursPage}/>
      <Route path='search' component={SearchToursPage}/>
      <Route path=':id' component={ShowToursPage}/>
      <Route path=':id/edit' component={EditToursPage}/>
    </Route>
    <Route path='users' component={AdminApp} >
      <IndexRedirect to='all' />
      <Route path='all' component={UsersPage}/>
    </Route>
    <Route path='account' component={App} >
      <IndexRedirect to='my' />
      <Route path='my' component={AccountPage}>
        <Route path='my_tours' component={ToursPage} />
        <Route path='change' component={ChangeAccPage} />
        <Route path='subscribes' component={SubscribesPage} />
      </Route>
    </Route>
    <Route path='/' component={MainPage} />
    <Route path='login' component={LoginPage} />
    <Route path='logout' component={Logout} />
    <Route path='register' component={RegisterPage} />
    <Route path='*' component={NotFound} />
  </div>
)