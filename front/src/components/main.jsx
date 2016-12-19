import React, { Component } from 'react'
import Header from './header.jsx'
import { Link } from 'react-router'

import './common.css'

export default class Main extends Component {
  render() {
    return (
      <div className='col-bg-8 col-bg-offset-2 col-md-12'>
      	<Header/>
      	<div className='header text-center'>
      		<h4>
      			Сервис агрегации отказных туров.
      		</h4>
      		<h5>
      			Сегодня добавлено туров: 0. Всего туров: 0. <Link to='/tours/add'>Добавить свой тур</Link>
      		</h5>
      	</div>
      </div>
    )
  }
}