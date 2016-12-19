import React, { Component } from 'react'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'

export class Header extends Component {
  static defaultProps = {
    balance: 0,
    currency: 'RUR'
  }
  render(){
    return (
      <div className="Header">
        {this.props.auth.isAuthenticated ?
          <Navbar>
            <Nav bsStyle="pills">
              <LinkContainer to="/">
                <NavItem>
                  Главная
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/tours">
                <NavItem>
                  <Glyphicon glyph="transfer"/> Туры
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/search">
                <NavItem>
                  <Glyphicon glyph="search"/> Поиск
                </NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight={true}>
              <LinkContainer to="/account">
                <NavItem>
                  <Glyphicon glyph="user"/> Аккаунт
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/logout">
                <NavItem>
                  <Glyphicon glyph="log-out"/> Выход
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar>
        :
          <Navbar>
            <Nav bsStyle="pills">
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

export default connect(mapStateToProps)(Header)