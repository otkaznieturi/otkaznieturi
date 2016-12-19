import React, { Component } from 'react'
import { Link } from 'react-router'
import Header from './header.jsx'

export default class NotFound extends Component {
  render() {
    return (
      <div className='col-bg-8 col-bg-offset-2 col-md-12'>
        <Header/>
        <div className='container'>
          <div className='row'>
            <div className='text-center'>
              Страница не найдена. Вернуться на <Link to='/'>главную</Link>?
            </div>
          </div>
        </div>
      </div>
    )
  }
}