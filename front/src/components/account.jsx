import React, { Component } from 'react'
import {Col, Nav, NavItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './common.css'

export default class AccountPage extends Component {
  render() {
    return (
		<div className="account">
			<Col lg={9} md={9} sm={9}>
      {
        this.props.children ?
				  React.cloneElement(this.props.children, { mode: 'my' })
        :
          null
      }
			</Col>
			<Col lg={3} md={3} sm={3}>
				<Nav bsStyle="pills" stacked>
					<LinkContainer to="/account/my/tours">
				    	<NavItem eventKey={1} href="/home">Мои туры</NavItem>
				    </LinkContainer>
				    <LinkContainer to="/account/my/change">
				    	<NavItem eventKey={2} >Изменить пароль</NavItem>
				    </LinkContainer>
		  		</Nav>
			</Col>
		</div>
    )
  }
}