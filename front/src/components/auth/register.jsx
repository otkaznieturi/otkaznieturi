import '../common.css'
import {Col, Button, Form, FormGroup, FormControl, Alert} from 'react-bootstrap'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as authActions from '../../actions/auth'
import Header from '../header.jsx'

export class RegisterPage extends Component {
  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.register({
      login: e.target.elements[0].value,
      pass: e.target.elements[1].value,
      pass_confirm: e.target.elements[2].value
    })
  }
  render() {
    return (
      <Col lg={8} lgOffset={2} md={12} sm={12}>
        <Header/>
        <div className="login_form">
          <div className="text-center">
          </div>
            {this.props.auth.loading ?
              <div className='loading_wrapper'>
                <div className='loading'></div>
              </div>
            :
              <div>
                <div className="row text-center">
                  <Col mdOffset={4} md={4} smOffset={3} sm={6}>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      <FormGroup controlId="formHorizontalEmail">
                        Email
                        <FormControl type="text" placeholder="Email" />
                      </FormGroup>
                      <FormGroup controlId="formHorizontalPassword">
                        Пароль
                        <FormControl type="password" placeholder="Password" />
                      </FormGroup>
                      <FormGroup controlId="formHorizontalPasswordConfirm">
                        Подтверждение пароля
                        <FormControl type="password" placeholder="Password" />
                      </FormGroup>
                      <FormGroup>
                        <Button bsStyle='primary' type="submit">
                          Регистрация
                        </Button>
                      </FormGroup>
                    </Form>
                    { this.props.auth.errors ?
                      <div className="error_info">
                        <Alert bsStyle="danger">
                          {this.props.auth.errors.map(function(item, index){
                            return <div key={'error' + index}><strong>{item}</strong></div>
                          })}
                        </Alert>
                      </div>
                    :
                      null
                    }
                  </Col>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)