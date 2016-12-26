import React, {Component} from 'react'
import Header from './header.jsx'
import {Link} from 'react-router'
import {Col} from 'react-bootstrap'

import './common.css'

export default class Main extends Component {
  render() {
    return (
      <Col lg={8} lgOffset={2} md={12} sm={12}>
      	<Header/>
      	<div className='header text-center'>
      		<h3>
      			Сервис агрегации отказных туров.
      		</h3>
          <div className="today">
        		<h5>
        			<Link to='/tours/today'>Сегодня добавлено туров: 0</Link>
            </h5>
          </div>
          <div className="all">
            <h5>
              <Link to='/tours/all'>Всего туров: 0</Link>
            </h5>
          </div>
      	</div>
      </Col>
    )
  }
}