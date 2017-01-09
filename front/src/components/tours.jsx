import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as accountActions from '../actions/account'
import {Link} from 'react-router'
import {forEach} from 'lodash'

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
  Glyphicon,
  FormGroup,
  Button,
  ControlLabel
} from 'react-bootstrap'

class ShowToursPage extends Component {
  componentWillMount() {
    this.props.actions.get_tour({id: this.props.params.id})
  }
  goBack() {
    this.props.router.goBack()
  }
  edit_tour() {
    this.props.router.push('/tours/' + this.props.params.id + '/edit')
  }
  delete_tour() {
    this.props.actions.delete_tour({id: this.props.params.id})
  }
  render() {
    return(
      <div className="tour_view_page">
        {this.props.account.loading || !this.props.account.tour ?
          <div className='loading_wrapper'>
            <div className='loading'></div>
          </div>
        :
          <div className="tour_info">
            <h4>Подробная информация о туре #{this.props.account.tour.id}</h4>
            <dl className="dl-horizontal">
              <dt className='agency'>Турагентство</dt><dd>{this.props.account.tour.agency}</dd>
              <dt className='country'>Страна</dt><dd>{this.props.account.tour.country}</dd>
              <dt className='city'>Город</dt><dd>{this.props.account.tour.city}</dd>
              <dt className='hotel'>Отель</dt><dd>{this.props.account.tour.hotel}</dd>
              <dt className='rating'>Количество звезд отеля</dt><dd>{this.props.account.tour.rating}*</dd>
              <dt className='room_rating'>Категория номера</dt><dd>{this.props.account.tour.room_rating}</dd>
              <dt className='dinner'>Питание</dt><dd>{this.props.account.tour.dinner}</dd>
              <dt className='departure_date'>Дата вылета</dt><dd>{DateTime.moment(this.props.account.tour.departure_date).format("DD.MM.YYYY")}</dd>
              <dt className='nights'>Количество ночей</dt><dd>{this.props.account.tour.nights}</dd>
              <dt className='adult_count'>Количество взрослых</dt><dd>{this.props.account.tour.adult_count}</dd>
              <dt className='child_count'>Количество детей</dt><dd>{this.props.account.tour.child_count}</dd>
              <dt className='child_ages'>Возраст каждого ребенка</dt><dd>{this.props.account.tour.child_ages}</dd>
              <dt className='information'>Общая информация по перелету</dt><dd>{this.props.account.tour.information}</dd>
              <dt className='transfer'>Трансфер</dt><dd>{this.props.account.tour.transfer}</dd>
              <dt className='hotel_link'>Сcылка на отель</dt><dd>{this.props.account.tour.hotel_link}</dd>
              <dt className='travel_agent'>Туроператор</dt><dd>{this.props.account.tour.travel_agent}</dd>
              <dt className='current_cost'>Стоимость тура у оператора</dt><dd>{this.props.account.tour.current_cost}</dd>
              <dt className='original_cost'>Начальная стоимость</dt><dd>{this.props.account.tour.original_cost}</dd>
              <dt className='real_cost'>Стоимость купленного тура</dt><dd>{this.props.account.tour.real_cost}</dd>
              <dt className='contacts'>Контакты</dt><dd>{this.props.account.tour.contacts}</dd>
              <dt className='status'>Статус</dt><dd>{this.props.account.tour.status}</dd>
              <dt className='created_at'>Дата создания тура</dt><dd>{DateTime.moment(this.props.account.tour.created_at).format("DD.MM.YYYY")}</dd>
            </dl>
            { this.props.account.tour.isMy ?
                <ButtonToolbar>
                  <Button bsStyle="primary" onClick={this.edit_tour.bind(this)}>
                    <Glyphicon glyph="pencil"/> Редактировать
                  </Button>
                  <Button bsStyle="danger" onClick={this.delete_tour.bind(this)}>
                    <Glyphicon glyph="trash"/> Удалить
                  </Button>
                  <Button onClick={this.goBack.bind(this)}>
                    Назад
                  </Button>
                </ButtonToolbar>
              :
                <ButtonToolbar>
                  <Button onClick={this.goBack.bind(this)}>
                    Назад
                  </Button>
                </ButtonToolbar>
            }
          </div>
        }
      </div>
    )
  }
}

class AddToursPage extends Component {
  handleSubmit(e) {
    e.preventDefault()
    let data = {}
    forEach(e.target.elements, (v) => {data[v.id] = v.value})
    this.props.actions.create_tour(data)
  }
  goBack() {
    this.props.router.goBack()
  }
  render() {
    return(
      <div className="tour_form">
        <h3>Создание тура</h3>
        <TourForm
          handlerSubmit={this.handleSubmit.bind(this)}
          goBack={this.goBack.bind(this)}
          save_button_title='Создать'
        />
      </div>
    )
  }
}

class EditToursPage extends Component {
  componentWillMount() {
    this.props.actions.get_tour({id: this.props.params.id})
  }
  handleSubmit(e) {
    e.preventDefault()
    let data = {id: this.props.params.id}
    forEach(e.target.elements, (v) => {data[v.id] = v.value})
    this.props.actions.edit_tour(data)
  }
  goBack() {
    this.props.router.goBack()
  }
  render() {
    return(
      <div className="tour_edit_page">
        {this.props.account.loading || !this.props.account.tour ?
          <div className='loading_wrapper'>
            <div className='loading'></div>
          </div>
        :
          <div className="tour_form">
            <h3>Редактирование тура #{this.props.router.params.id}</h3>
            <TourForm
              data={this.props.account.tour}
              handlerSubmit={this.handleSubmit.bind(this)}
              goBack={this.goBack.bind(this)}
              save_button_title='Редактировать'
            />
          </div>
        }
      </div>
    )
  }
}

class TourForm extends Component {
  render() {
    let values = this.props.data || {}
    return (
      <Form onSubmit={this.props.handlerSubmit}>
        <ControlLabel>Турагентство:</ControlLabel>
        <FormControl
          id="agency"
          type="text"
          placeholder="Введите название агентства..."
          defaultValue={values.agency}
        />
        <ControlLabel>Страна:</ControlLabel>
        <FormControl
          id="country"
          type="text"
          placeholder="Введите название страны..."
          defaultValue={values.country}
        />
        <ControlLabel>Город:</ControlLabel>
        <FormControl
          id="city"
          type="text"
          placeholder="Введите название города..."
          defaultValue={values.city}
        />
        <ControlLabel>Отель:</ControlLabel>
        <FormControl
          id="hotel"
          type="text"
          placeholder="Введите название отеля..."
          defaultValue={values.hotel}
        />
        <FormGroup>
          <ControlLabel>Количество звезд отеля</ControlLabel>
          <FormControl id="rating" componentClass="select" placeholder="Количество звезд отеля" defaultValue={values.rating}>
            <option value={1}>1 звезда</option>
            <option value={2}>2 звезды</option>
            <option value={3}>3 звезды</option>
            <option value={4}>4 звезды</option>
            <option value={5}>5 звезд</option>
          </FormControl>
        </FormGroup>
        <ControlLabel>Категория номера:</ControlLabel>
        <FormControl
          id="room_rating"
          type="number"
          placeholder="Введите категорию номера..."
          defaultValue={values.room_rating}
        />
        <ControlLabel>Питание:</ControlLabel>
        <FormControl
          id="dinner"
          type="text"
          placeholder="Тип питания в туре..."
          defaultValue={values.dinner}
        />
        <ControlLabel>Дата вылета:</ControlLabel>
        <DateTime
          inputProps={{id: 'departure_date', placeholder: 'Выберите дату', required: true}}
          closeOnSelect={true}
          timeFormat={false}
          dateFormat='DD.MM.YYYY'
          defaultValue={DateTime.moment(values.departure_date)}
          isValidDate={ (current) => { return current.isAfter( DateTime.moment().subtract(1, 'day') ) } }
        />
        <ControlLabel>Количество ночей:</ControlLabel>
        <FormControl
          id="nights"
          type="number"
          defaultValue={values.nights}
        />
        <ControlLabel>Количество взрослых:</ControlLabel>
        <FormControl
          id="adult_count"
          type="number"
          defaultValue={values.adult_count}
        />
        <ControlLabel>Количество детей:</ControlLabel>
        <FormControl
          id="child_count"
          type="number"
          defaultValue={values.child_count}
        />
        <ControlLabel>Возраст каждого ребенка:</ControlLabel>
        <FormControl
          id="child_ages"
          type="text"
          placeholder="Перечисление через запятую"
          defaultValue={values.child_ages}
        />
        <FormGroup controlId="information">
          <ControlLabel>Общая информация по перелету</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Информация о рейсе и пр." defaultValue={values.information} />
        </FormGroup>
        <ControlLabel>Трансфер:</ControlLabel>
        <FormControl
          id="transfer"
          type="text"
          placeholder="Тип трансфера"
          defaultValue={values.transfer}
        />
        <ControlLabel>Туроператор:</ControlLabel>
        <FormControl
          id="travel_agent"
          type="text"
          placeholder="Название туроператора"
          defaultValue={values.travel_agent}
        />
        <ControlLabel>Сcылка на отель:</ControlLabel>
        <FormControl
          id="hotel_link"
          type="text"
          placeholder="Ссылка на сайт отеля"
          defaultValue={values.hotel_link}
        />
        <ControlLabel>Начальная стоимость:</ControlLabel>
        <FormControl
          id="original_cost"
          type="number"
          placeholder="Стоимость, по которой отдают этот тур ТО"
          defaultValue={values.original_cost}
        />
        <ControlLabel>Стоимость купленного тура:</ControlLabel>
        <FormControl
          id="real_cost"
          type="number"
          placeholder="Стоимость, по которой тур был куплен у ТО"
          defaultValue={values.real_cost}
        />
        <ControlLabel>Стоимость тура у оператора:</ControlLabel>
        <FormControl
          id="current_cost"
          type="number"
          placeholder="Текущая стоимость такого тура у ТО"
          defaultValue={values.current_cost}
        />
        <FormGroup controlId="contacts">
          <ControlLabel>Контакты</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Контактная информация по туру" defaultValue={values.contacts} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Статус</ControlLabel>
          <FormControl id="status" componentClass="select" placeholder="select" defaultValue={values.status}>
            <option value="active">Активен</option>
            <option value="bought">Продан</option>
            <option value="closed">Закрыт</option>
          </FormControl>
        </FormGroup>
        <ButtonToolbar>
          <Button bsStyle="primary" type="submit">
            {this.props.save_button_title}
          </Button>
          <Button onClick={this.props.goBack}>
            Отмена
          </Button>
        </ButtonToolbar>
      </Form>
    );
  }
}

class TourTable extends Component {
  handleRowClick(item_data){
    this.props.handlerRowClick(item_data.id)
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
            options={{onRowClick: this.handleRowClick.bind(this)}}
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
  handlerRowClick(id) {
    this.props.router.push('/tours/' + id)
  }
  render() {
    return this.props.route.path === 'my_tours' ?
      (
        this.props.account.loading ?
          <div className='loading_wrapper'>
            <div className='loading'></div>
          </div>
        :
          <TourTable tours={this.props.account.tours} handlerRowClick={this.handlerRowClick.bind(this)} />
      )
    :
      (
      	<div className='tours'>
          <Col lg={10} md={10} sm={10}>
            {this.props.account.loading ?
              <div className='loading_wrapper'>
                <div className='loading'></div>
              </div>
            :
              <TourTable tours={this.props.account.tours} handlerRowClick={this.handlerRowClick.bind(this)} />
            }
          </Col>
          <Col lg={2} md={2} sm={2}>
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
let connected_edit_page = connect(mapStateToProps, mapDispatchToProps)(EditToursPage)
let connected_show_page = connect(mapStateToProps, mapDispatchToProps)(ShowToursPage)

export {
  connected_page as ToursPage,
  connected_add_page as AddToursPage,
  connected_edit_page as EditToursPage,
  connected_show_page as ShowToursPage
}