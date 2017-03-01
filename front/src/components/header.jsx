import React, { Component } from 'react'
import { Nav, Navbar, NavItem, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'

import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

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
            <IndexLinkContainer to="/tours">
              <NavItem eventKey={1}>
                <i className="fa fa-plane fa-lg" aria-hidden="true"></i> Туры
              </NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/tours/add">
              <NavItem eventKey={2}>Добавить тур</NavItem>
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
              <NavItem eventKey={3}>
                <Glyphicon glyph="user"/> Аккаунт
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/logout">
              <NavItem eventKey={4}>
                <i className="fa fa-sign-out fa-lg" aria-hidden="true"></i> Выход
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