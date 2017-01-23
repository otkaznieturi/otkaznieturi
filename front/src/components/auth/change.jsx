import '../common.css'
import {Col, Button, Form, FormGroup, FormControl, Alert} from 'react-bootstrap'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as accountActions from '../../actions/account'

class ChangeAccPage extends Component {
  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.setup_account({
      old_pass: e.target.elements[0].value,
      new_pass: e.target.elements[1].value,
      new_pass_confirm: e.target.elements[2].value
    })
  }
  render() {
    return (
      <div className="change_acc_form">
        <div className="text-center">
        </div>
          {this.props.account.loading ?
            <div className='loading_wrapper'>
              <div className='loading'></div>
            </div>
          :
            <div>
              <div className="row text-center">
                <Col lg={6} lgOffset={3} md={6} mdOffset={3} sm={12}>
                  <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup controlId="formHorizontalOldPassword">
                      Текущий пароль
                      <FormControl type="password" placeholder="Password" />
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                      Новый пароль
                      <FormControl type="password" placeholder="Password" />
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPasswordConfirm">
                      Подтверждение пароля
                      <FormControl type="password" placeholder="Password" />
                    </FormGroup>
                    <FormGroup>
                      <Button bsStyle='primary' type="submit">
                        Сменить пароль
                      </Button>
                    </FormGroup>
                  </Form>
                  { this.props.account.errors ?
                    <div className="error_info">
                      <Alert bsStyle="danger">
                        {this.props.account.errors.map(function(item, index){
                          return <div key={'error' + index}><strong>{item}</strong></div>
                        })}
                      </Alert>
                    </div>
                  :
                    this.props.account.info_msg ?
                      <div className="info_msg">
                        <Alert bsStyle="success">
                          {this.props.account.info_msg}
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
    )
  }
}

let mapStateToProps = (state) => {
  return {
    account: state.account
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(accountActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAccPage)