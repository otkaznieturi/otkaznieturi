import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as accountActions from '../actions/account'
import {Link} from 'react-router'

import './common.css'
import {Table} from 'react-bootstrap'

class Tours extends Component {
  componentWillMount() {
    if(this.props.mode === 'my')
      this.props.actions.get_my_tours()
    else
      this.props.actions.get_all_tours()
  }
  render() {
    return (
    	<div className='tours'>
        { this.props.account.tours ?
          <Table striped bordered condensed hover>
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
                this.props.account.tours.map((tour, index) => {
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