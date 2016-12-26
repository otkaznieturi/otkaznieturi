import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './components/header.jsx'
import {Col} from 'react-bootstrap'

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
      return (
        <div className="App">
          <Col md={12} sm={12} lg={8} lgOffset={2}>
            <Header/>
            {this.props.children}
          </Col>
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
