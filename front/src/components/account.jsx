import React, { Component } from 'react'
import {Col, Nav, NavItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {Button} from 'react-bootstrap'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as accountActions from '../actions/account'

import './common.css'

export class AccountPage extends Component {
  render() {
    return (
  		<div className="account">
        <Nav bsStyle="pills">
          <LinkContainer to="/account/my/my_tours">
            <NavItem eventKey={1}>Мои туры</NavItem>
          </LinkContainer>
          <LinkContainer to="/account/my/subscribes">
            <NavItem eventKey={2}>Настройка рассылки</NavItem>
          </LinkContainer>
          <LinkContainer to="/account/my/change">
            <NavItem eventKey={3}>Изменить пароль</NavItem>
          </LinkContainer>
        </Nav>
        {
          this.props.children && React.cloneElement(this.props.children, { mode: 'my' })
        }
  		</div>
    )
  }
}

class SubscribesPage extends Component {
  change_subscribe() {
    this.props.actions.change_subscribe()
  }
  render() {
    return (
      <div className="subscribes_form text-center">
        <h5>На этой странице можно подписаться на email-рассылку новых туров. В дальнейшем можно будет подписаться на рассылку по параметрам</h5>
        {
          this.props.account.subscribe ?
            <Button bsStyle="warning" onClick={this.change_subscribe.bind(this)}>
              <i className="fa fa-envelope-o" aria-hidden="true"></i> Отписаться от рассылки
            </Button>
          :
            <Button bsStyle="primary" onClick={this.change_subscribe.bind(this)}>
              <i className="fa fa-envelope" aria-hidden="true"></i> Подписаться на рассылку
            </Button>
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

let connected_page = connect(mapStateToProps, mapDispatchToProps)(SubscribesPage)

export {connected_page as SubscribesPage}