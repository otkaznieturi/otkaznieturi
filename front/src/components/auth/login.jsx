import '../common.css'
import {Col, Button, Form, FormGroup, FormControl, Alert} from 'react-bootstrap'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as authActions from '../../actions/auth'
import Header from '../header.jsx'

export class LoginPage extends Component {
  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.login({login: e.target.elements[0].value, pass: e.target.elements[1].value})
  }
  render() {
    return (
      <Col lg={8} lgOffset={2} md={12} sm={12}>
        {
          <div>
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
                      <Col mdOffset={3} md={6} smOffset={2} sm={8}>
                        <p className="text-center">
                          Для того, чтобы присоединиться напишите нам на e-mail: otkaztur@gmail.com<br/>
В письме пришлите название компании, город и юридический адрес
                        </p>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                          <FormGroup controlId="formHorizontalEmail">
                            Email
                            <FormControl type="text" placeholder="Email" />
                          </FormGroup>
                          <FormGroup controlId="formHorizontalPassword">
                            Пароль
                            <FormControl type="password" placeholder="Password" />
                          </FormGroup>
                          <FormGroup>
                            <Button bsStyle='primary' type="submit">
                              Войти
                            </Button>
                          </FormGroup>
                        </Form>
                        { this.props.auth.errors &&
                          <div className="error_info">
                            <Alert bsStyle="danger">
                              <strong>{this.props.auth.errors}</strong>
                            </Alert>
                          </div>
                        }
                      </Col>
                    </div>
                  </div>
                }
            </div>
          </div>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)