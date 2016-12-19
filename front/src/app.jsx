import React, { Component } from 'react'
import { connect } from 'react-redux'
import LK from './components/lk.jsx'
import Header from './components/header.jsx'

export let requireAuth = () => {
  class App extends Component {
    componentWillMount() {
      this.checkAuth(this.props.auth)
    }
    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.auth)
    }
    checkAuth(auth) {
      if (!auth || !auth.isAuthenticated) {
        this.props.dispatch({
          type: 'ROUTING',
          payload: {
            method: 'replace',
            nextUrl: '/login'
          }
        })
      }
    }
    render() {
      console.log(this.props)
      return (
        <div className="App">
          <div className='col-bg-8 col-bg-offset-2 col-md-12'>
            <Header/>
            {this.props.children}
          </div>
        </div>
      )
    }
  }
  let mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  }

  return connect(mapStateToProps)(App)
}
