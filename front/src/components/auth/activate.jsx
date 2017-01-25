import '../common.css'
import {Col} from 'react-bootstrap'
import Header from '../header.jsx'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as authActions from '../../actions/auth'

class ActivatePage extends Component {
  componentDidMount() {
    this.props.actions.activate_account({token: this.props.params.token})
  }
  render() {
    return (
      <Col lg={8} lgOffset={2} md={12} sm={12}>
        <Header/>
        <div>
          {
            this.props.auth.activate_error &&
              <div className='text-center'>
                <h4>{this.props.auth.activate_error}</h4>
              </div>
          }
        </div>
      </Col>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivatePage)