import React, { Component } from 'react'
import { Nav, Navbar, NavItem, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'

export class Header extends Component {
  static defaultProps = {
    balance: 0,
    currency: 'RUR'
  }
  render(){
    if(this.props.auth.isAuthenticated){
      return (
        <Navbar fluid>
          <Nav>
            <LinkContainer to="/">
              <NavItem>
                Главная
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/tours">
              <NavItem>
                <i className="fa fa-plane fa-lg" aria-hidden="true"></i> Туры
              </NavItem>
            </LinkContainer>
            {
              this.props.auth.admin &&
                <LinkContainer to="/users">
                  <NavItem>
                    <i className="fa fa-user fa-lg" aria-hidden="true"></i> Пользователи
                  </NavItem>
                </LinkContainer>
            }
          </Nav>
          <Nav pullRight={true}>
            <LinkContainer to="/account">
              <NavItem>
                <Glyphicon glyph="user"/> Аккаунт
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/logout">
              <NavItem>
                <i className="fa fa-sign-out fa-lg" aria-hidden="true"></i> Выход
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
      )
    } else {
      return (
        <Navbar fluid>
          <Nav>
            <LinkContainer to="/">
              <NavItem>
                Главная
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight={true}>
            <LinkContainer to="/login">
              <NavItem>
                Войти
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/register">
              <NavItem>
                Регистрация
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
      )
    }
  }
}

let mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header)