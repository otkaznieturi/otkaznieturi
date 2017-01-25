import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as mainActions from '../actions/main'

import Header from './header.jsx'
import {Link} from 'react-router'
import {Col} from 'react-bootstrap'

class Main extends Component {
  componentWillMount() {
    this.props.actions.get_tour_counters()
  }
  render() {
    return (
      <Col lg={8} lgOffset={2} md={12} sm={12}>
      	<Header/>
      	<div className='header text-center'>
      		<h3>
      			Сервис агрегации отказных туров.
      		</h3>
          { !this.props.loading &&
            <div className="counters">
              <div className="today">
            		<h5>
            			<Link to='/tours/today'>Сегодня добавлено туров: {this.props.main.today_tours}</Link>
                </h5>
              </div>
              <div className="all">
                <h5>
                  <Link to='/tours/all'>Всего туров: {this.props.main.tours}</Link>
                </h5>
              </div>
            </div>
          }
      	</div>
      </Col>
    )
  }
}


let mapStateToProps = (state) => {
  return {
    main: state.main
  }
}


let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(mainActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)