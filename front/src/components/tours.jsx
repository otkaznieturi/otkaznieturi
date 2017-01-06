import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as accountActions from '../actions/account'
import {Link} from 'react-router'

import './common.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {LinkContainer} from 'react-router-bootstrap'
import DateTime from 'react-datetime'
import {
  ButtonToolbar,
  Form,
  Col, 
  Nav, 
  NavItem, 
  NavDropdown, 
  MenuItem,
  FormControl,
  Checkbox,
  FormGroup,
  Button,
  ControlLabel
} from 'react-bootstrap'

class TourTable extends Component {
  handleRowClick(item_data){
    console.log(item_data)
  }
  render(){
    return (
      <div className='tours'>
        { this.props.tours && this.props.tours.length > 0 ?
          <BootstrapTable
            data={ this.props.tours } 
            pagination 
            striped 
            condensed
            search
            searchPlaceholder='Поиск по таблице...'
            options={{onRowClick: this.handleRowClick}}
            hover>
            <TableHeaderColumn dataField='id' isKey={true} dataSort={ true }>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='agency' dataSort={ true }>Турагентство</TableHeaderColumn>
            <TableHeaderColumn dataField='country' dataSort={ true }>Страна</TableHeaderColumn>
            <TableHeaderColumn dataField='city' dataSort={ true }>Город</TableHeaderColumn>
            <TableHeaderColumn dataField='hotel' dataSort={ true }>Отель</TableHeaderColumn>
            <TableHeaderColumn dataField='rating' dataSort={ true }>Рейтинг</TableHeaderColumn>
          </BootstrapTable>
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

class AddToursPage extends Component {
  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.create_tour({
      agency: e.target.elements[0].value,
      country: e.target.elements[1].value,
      city: e.target.elements[2].value,
      hotel: e.target.elements[3].value,
      rating: e.target.elements[4].value
    })
  }
  goBack() {
    this.props.router.goBack()
  }
  render() {
    return(
      <div className="tour_form">
        <h3>Создание тура</h3>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <ControlLabel>Турагентство:</ControlLabel>
          <FormControl
            id="agency"
            type="text"
            placeholder="Введите название агентства..."
          />
          <ControlLabel>Страна:</ControlLabel>
          <FormControl
            id="formControlsText"
            type="text"
            placeholder="Введите название страны..."
          />
          <ControlLabel>Город:</ControlLabel>
          <FormControl
            id="formControlsText"
            type="text"
            placeholder="Введите название города..."
          />
          <ControlLabel>Отель:</ControlLabel>
          <FormControl
            id="formControlsText"
            type="text"
            placeholder="Введите название отеля..."
          />
          <FormGroup>
            <ControlLabel>Количество звезд отеля</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value={1}>1 звезда</option>
              <option value={2}>2 звезды</option>
              <option value={3}>3 звезды</option>
              <option value={4}>4 звезды</option>
              <option value={5}>5 звезд</option>
            </FormControl>
          </FormGroup>
          <ControlLabel>Категория номера:</ControlLabel>
          <FormControl
            id="formControlsText"
            type="number"
            placeholder="Введите категорию номера..."
          />
          <ControlLabel>Питание:</ControlLabel>
          <FormControl
            id="formControlsText"
            type="text"
            placeholder="Тип питания в туре..."
          />
          <ControlLabel>Дата вылета:</ControlLabel>
          <DateTime inputProps={{placeholder: 'Выберите дату'}}/>
          <ControlLabel>Количество ночей:</ControlLabel>
          <FormControl
            id="nights"
            type="number"
          />
          <ControlLabel>Количество взрослых:</ControlLabel>
          <FormControl
            id="parents"
            type="number"
          />
          <ControlLabel>Количество детей:</ControlLabel>
          <FormControl
            id="childs"
            type="number"
          />
          <ControlLabel>Возраст каждого ребенка:</ControlLabel>
          <FormControl
            id="childs"
            type="text"
            placeholder="Перечисление через запятую"
          />
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Общая информация по перелету</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Информация о рейсе и пр." />
          </FormGroup>
          <ControlLabel>Трансфер:</ControlLabel>
          <FormControl
            id="transfer"
            type="text"
            placeholder="Тип трансфера"
          />
          <ControlLabel>Туроператор:</ControlLabel>
          <FormControl
            id="operator"
            type="text"
            placeholder="Название туроператора"
          />
          <ControlLabel>Сcылка на отель:</ControlLabel>
          <FormControl
            id="hotel_link"
            type="text"
            placeholder="Ссылка на сайт отеля"
          />
          <ControlLabel>Начальная стоимость:</ControlLabel>
          <FormControl
            id="cost"
            type="number"
            placeholder="Стоимость, по которой отдают этот тур ТО"
          />
          <ControlLabel>Стоимость купленного тура:</ControlLabel>
          <FormControl
            id="cost"
            type="number"
            placeholder="Стоимость, по которой тур был куплен у ТО"
          />
          <ControlLabel>Стоимость тура у оператора:</ControlLabel>
          <FormControl
            id="cost"
            type="number"
            placeholder="Текущая стоимость такого тура у ТО"
          />
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Контакты</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Контактная информация по туру" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Статус</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">Активен</option>
              <option value="select">Продан</option>
              <option value="select">Закрыт</option>
            </FormControl>
          </FormGroup>
          <ButtonToolbar>
            <Button bsStyle="primary" type="submit">
              Создать
            </Button>
            <Button onClick={this.goBack.bind(this)}>
              Отмена
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    )
  }
}

class Tours extends Component {
  fetchTours() {
    switch(this.props.route.path){
      case 'my_tours':
        this.props.actions.get_tours('my')
      break
      case 'today':
        this.props.actions.get_tours('today')
      break
      default:
        this.props.actions.get_tours('all')
    }
  }
  componentWillMount() {
    this.fetchTours()
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.route.path !== this.props.route.path)
      this.fetchTours()
  }
  render() {
    return this.props.route.path === 'my_tours' ?
      (
        this.props.account.loading ?
          <div className='loading_wrapper'>
            <div className='loading'></div>
          </div>
        :
          <TourTable tours={this.props.account.tours} />
      )
    :
      (
      	<div className='tours'>
          <Col lg={9} md={9} sm={9}>
            {this.props.account.loading ?
              <div className='loading_wrapper'>
                <div className='loading'></div>
              </div>
            :
              <TourTable tours={this.props.account.tours} />
            }
          </Col>
          <Col lg={3} md={3} sm={3}>
            <Nav bsStyle="pills" stacked>
              <LinkContainer to="/tours/all">
                <NavItem eventKey={1}>Все</NavItem>
              </LinkContainer>
              <LinkContainer to="/tours/today">
                <NavItem eventKey={2}>Созданные сегодня</NavItem>
              </LinkContainer>
              <NavDropdown eventKey={22} title="Действия" id="nav-dropdown">
                <LinkContainer to="/tours/search" disabled>
                  <MenuItem eventKey={3}>Глобальный поиск</MenuItem>
                </LinkContainer>
                <LinkContainer to="/tours/add">
                  <MenuItem eventKey={4}>Добавить тур</MenuItem>
                </LinkContainer>
              </NavDropdown>
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

let connected_page = connect(mapStateToProps, mapDispatchToProps)(Tours)
let connected_add_page = connect(mapStateToProps, mapDispatchToProps)(AddToursPage)

export {connected_page as ToursPage, connected_add_page as AddToursPage}