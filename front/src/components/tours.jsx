import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as accountActions from '../actions/account'
import {Link} from 'react-router'

import './common.css'
import {Table, Col, Nav, NavItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class TourTable extends Component {
  render(){
    return (
      <div className='tours'>
        { this.props.tours ?
          <Table striped bordered condensed hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Турагентство</th>
                <th>Страна</th>
                <th>Город</th>
                <th>Отель</th>
                <th>Рейтинг</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.tours.map((tour, index) => {
                  return <tr key={index}>
                    <td>{tour.id}</td>
                    <td>{tour.agency}</td>
                    <td>{tour.country}</td>
                    <td>{tour.city}</td>
                    <td>{tour.hotel}</td>
                    <td>{tour.rating}</td>
                  </tr>
                })
              }
            </tbody>
          </Table>
        :
          <div>
            <div className="text-center">Увы, пока нет ни одного тура :(</div>
            <div className="text-center">
              <Link to='/tours/add'>Создать</Link>
            </div>
          </div>
        }
      </div>
    )
  }
}

class Tours extends Component {
  componentWillMount() {
    switch(this.props.route.path){
      case 'my_tours':
        this.props.actions.get_tours('my')
      break
      case 'today':
        this.props.actions.get_tours('today')
      break
      case 'search':
      break
      default:
        this.props.actions.get_tours('all')
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('ATMTA')
  }
  render() {
    return this.props.route.path === 'my_tours' ?
      (<TourTable tours={this.props.account.tours} />)
    :
      (
      	<div className='tours'>
          <Col lg={9} md={9} sm={9}>
            <TourTable tours={this.props.account.tours} />
          </Col>
          <Col lg={3} md={3} sm={3}>
            <Nav bsStyle="pills" stacked>
              <LinkContainer to="/tours/all">
                <NavItem eventKey={1}>Все</NavItem>
              </LinkContainer>
              <LinkContainer to="/tours/today">
                <NavItem eventKey={2}>Созданные сегодня</NavItem>
              </LinkContainer>
              <LinkContainer to="/tours/search">
                <NavItem eventKey={3}>Поиск</NavItem>
              </LinkContainer>
            </Nav>
          </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tours)