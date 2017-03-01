import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as mainActions from '../actions/main'

import Header from './header.jsx'
import {Link} from 'react-router'
import {Col} from 'react-bootstrap'

class Main extends Component {
  componentWillMount() {
    let route = this.props.auth.isAuthenticated ? '/tours' : '/login'
    this.props.router.replace(route)
  }
  render() {
    return (
      <div></div>
    )
  }
}


let mapStateToProps = (state) => {
  return {
    main: state.main,
    auth: state.auth
  }
}


let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(mainActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)