import React, { Component } from 'react'
import { Link } from 'react-router'
import Header from './header.jsx'
import {Col} from 'react-bootstrap'

export default class NotFound extends Component {
  render() {
    return (
      <Col lg={8} lgOffset={2} md={12} sm={12}>
        <Header/>
        <div className='container-fluid'>
          <div className='text-center'>
            Страница не найдена. Вернуться на <Link to='/'>главную</Link>?
          </div>
        </div>
      </Col>
    )
  }
}