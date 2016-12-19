import '../common.css'
import { Col, Button, Form, FormGroup, FormControl } from 'react-bootstrap'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../actions/auth'
import Header from '../header.jsx'

export class LoginPage extends Component {
  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.login({login: e.target.elements[0].value, pass: e.target.elements[1].value})
  }
  render() {
    return (
      <div className='col-bg-8 col-bg-offset-2 col-md-12'>
        <Header/>
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
                          <FormGroup>
                            <Button bsStyle='primary' type="submit">
                              Авторизация
                            </Button>
                          </FormGroup>
                        </Form>
                      </Col>
                    </div>
                  </div>
                }
            </div>
          </div>
        }        
      </div>
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