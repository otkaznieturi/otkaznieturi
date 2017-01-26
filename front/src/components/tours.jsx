import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as accountActions from '../actions/account'
import {Link} from 'react-router'
import {forEach} from 'lodash'

import './common.css'
import './tours.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {LinkContainer} from 'react-router-bootstrap'
import Rater from 'react-rater'
import DateTime from 'react-datetime'
import {
  ButtonToolbar,
  Form,
  Col,
  Nav,
  NavItem,
  FormControl,
  Glyphicon,
  FormGroup,
  Button,
  ControlLabel,
  Collapse,
  Well,
  Popover,
  OverlayTrigger
} from 'react-bootstrap'

const DINNER_HELPER = (
<Popover id="popover-trigger-hover-focus" title="Виды питания">
  <div className="help_row">
    <span><strong>AI</strong> - завтраки, обеды, ужины, напитки</span>
  </div>
  <div className="help_row">
    <span><strong>BB</strong> - завтраки</span>
  </div>
  <div className="help_row">
    <span><strong>FB</strong> - завтраки, обеды, ужины</span>
  </div>
  <div className="help_row">
    <span><strong>FB+</strong> - завтраки, обеды, ужины, расширенное меню</span>
  </div>
  <div className="help_row">
    <span><strong>HB</strong> - завтраки, ужины</span>
  </div>
  <div className="help_row">
    <span><strong>HB+</strong> - завтраки, ужины, расширенное меню</span>
  </div>
  <div className="help_row">
    <span><strong>RO</strong> - без питания</span>
  </div>
  <div className="help_row">
    <span><strong>UAI</strong> - завтраки, обеды, ужины, напитки, расширенное меню</span>
  </div>
</Popover>
)

class TextCollapser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      open: false
    };
  }

  render() {
    return (
      <div>
        <Button bsSize="xsmall" onClick={ ()=> this.setState({ open: !this.state.open })}>
          {this.state.open ? 'Скрыть' : 'Показать'}
        </Button>
        <Collapse in={this.state.open}>
          <div>
            {this.state.open &&
              <Well>
                {this.state.text}
              </Well>
            }
          </div>
        </Collapse>
      </div>
    );
  }
}

class TourNav extends Component {
  render() {
    return (
      <Nav bsStyle="pills">
        <LinkContainer to="/tours/all">
          <NavItem eventKey={1}>Все</NavItem>
        </LinkContainer>
        <LinkContainer to="/tours/today">
          <NavItem eventKey={2}>Созданные сегодня</NavItem>
        </LinkContainer>
        <LinkContainer to="/tours/search">
          <NavItem eventKey={3}>Глобальный поиск</NavItem>
        </LinkContainer>
        <LinkContainer to="/tours/add">
          <NavItem eventKey={4}>Добавить тур</NavItem>
        </LinkContainer>
      </Nav>
    )
  }
}

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
    let converted_status = ''
    if(this.props.account.tour)
      switch(this.props.account.tour.status){
        case 'active':
          converted_status = 'Активен'
        break
        case 'bought':
          converted_status = 'Продан'
        break
        case 'closed':
          converted_status = 'Закрыт'
        break
        default:
          converted_status = ''
        break
      }
    return(
      <div className="tour_view_page">
        {this.props.account.loading || !this.props.account.tour ?
          <div className='loading_wrapper'>
            <div className='loading'></div>
          </div>
        :
          <div className="tour_info">
            <h4>Подробная информация о туре</h4>
            <dl className="dl-horizontal">
              <dt className='agency'>Турагентство</dt><dd>{this.props.account.tour.agency}</dd>
              <dt className='country'>Страна</dt><dd>{this.props.account.tour.country}</dd>
              <dt className='city'>Город</dt><dd>{this.props.account.tour.city}</dd>
              <dt className='hotel'>Отель</dt><dd>{this.props.account.tour.hotel}</dd>
              <dt className='rating'>Количество звезд отеля</dt><dd><Rater interactive={false} rating={this.props.account.tour.rating} /></dd>
              <dt className='room_rating'>Категория номера</dt><dd>{this.props.account.tour.room_rating}</dd>
              <dt className='dinner'>
                Питание {<OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={DINNER_HELPER}>
                          <Glyphicon glyph="question-sign" />
                        </OverlayTrigger>}
              </dt>
              <dd>{this.props.account.tour.dinner}</dd>
              <dt className='departure_date'>Дата вылета</dt><dd>{DateTime.moment(this.props.account.tour.departure_date).format("DD.MM.YYYY")}</dd>
              <dt className='nights'>Количество ночей</dt><dd>{this.props.account.tour.nights}</dd>
              <dt className='adult_count'>Количество взрослых</dt><dd>{this.props.account.tour.adult_count}</dd>
              <dt className='child_count'>Количество детей</dt><dd>{this.props.account.tour.child_count}</dd>
              <dt className='child_ages'>Возраст каждого ребенка</dt><dd>{this.props.account.tour.child_ages}</dd>
              <dt className='information'>Общая информация по перелету</dt><dd>{this.props.account.tour.information}</dd>
              <dt className='transfer'>Трансфер</dt><dd>{this.props.account.tour.transfer}</dd>
              <dt className='travel_agent'>Туроператор</dt><dd>{this.props.account.tour.travel_agent}</dd>
              <dt className='original_cost'>Стоимость на сайте ТО в день продажи</dt><dd>{this.props.account.tour.original_cost} руб.</dd>
              <dt className='current_cost'>Стоимость на сайте ТО на данный момент</dt><dd>{this.props.account.tour.current_cost} руб.</dd>
              <dt className='real_cost'>Стоимость тура у нас</dt><dd>{this.props.account.tour.real_cost} руб. (за один тур)</dd>
              <dt className='contacts'>Контакты</dt><dd>{<TextCollapser text={this.props.account.tour.contacts}/>}</dd>
              <dt className='status'>Статус</dt><dd>{converted_status}</dd>
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
  handleSubmit(data) {
    this.props.actions.create_tour(data)
  }
  goBack() {
    this.props.router.goBack()
  }
  render() {
    return(
      <div className="tour_form">
        <TourNav />
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
  handleSubmit(data) {
    data.id = this.props.params.id
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
            <h3>Редактирование тура</h3>
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

class RaterStar extends Component {
  defaultProps = {
    willBeActive: false,
    isActive: false,
    isActiveHalf: false,
    isDisabled: false
  }
  render() {
    let nameMap = {
      isDisabled: 'is-disabled',
      isActive: 'is-active',
      isActiveHalf: 'is-active-half',
      willBeActive: 'will-be-active'
    }
    let className = Object.keys(nameMap)
          .filter((prop) => this.props[prop])
          .map((prop) => nameMap[prop])
          .join(' ')
    let { onClick, onMouseEnter, isDisabled } = this.props
    let icon = null
    switch(this.props.view_type) {
      case 'parent':
        icon = <Glyphicon glyph='user' />
      break
      case 'child':
        icon = <i className="fa fa-child fa-lg" aria-hidden="true"></i>
      break
      default:
        icon = '★'
    }
    if (isDisabled) {
      return (<a className={className}>{icon}</a>)
    }
    return (<a className={className} onClick={onClick} onMouseEnter={onMouseEnter}>{icon}</a>)
  }
}

class RaterGetter extends Component {
  constructor(props) {
    super(props)
    this.state = {rating: props.rating}
  }
  render() {
    if(this.state.rating === undefined)
      return (<span>Не важно</span>)
    else
      return (<span>{this.state.rating}</span>)
  }
}

class ChildAgeSetter extends Component {
  constructor(props) {
    super(props)
    let data = props.child_ages ? props.child_ages.split(',') : []
    this.state = {count: data.length, values: data}
  }
  handleChange(index, event) {
    let state = this.state
    state.values[index] = event.target.value
    this.setState(state)
  }
  render() {
    return (
      <div>
        {
          [...Array(this.state.count)].map((x, i) =>
            <div key={i}>
              <ControlLabel>Возраст {i + 1} ребенка:</ControlLabel>
              <FormControl key={i} componentClass="select" placeholder="select" defaultValue={this.state.values[i]} onChange={(e) => this.handleChange(i, e)}>
                {[...Array(18)].map((x, i) =>
                  <option key={i} value={i}>{i}</option>
                )}
              </FormControl>
            </div>)
        }
      </div>
    )
  }
}

class CountrySelect extends Component {
  constructor(props) {
    super(props)
    this.state = {country: props.country}
  }
  handleChange(event) {
    this.setState({country: event.target.value})
  }
  render() {
    return (
      <FormControl id="country" componentClass="select" placeholder="select" defaultValue={this.state.country} onChange={(e) => this.handleChange(e)}>
        {this.props.withEmpty && <option value="none">Не важно</option>}
        <optgroup label="Топовые">
          <option value="Болгария">Болгария</option>
          <option value="Греция">Греция</option>
          <option value="Доминикана">Доминикана</option>
          <option value="Израиль">Израиль</option>
          <option value="Испания">Испания</option>
          <option value="Италия">Италия</option>
          <option value="Китай">Китай</option>
          <option value="Кипр">Кипр</option>
          <option value="Куба">Куба</option>
          <option value="Мальдивы">Мальдивы</option>
          <option value="Мальта">Мальта</option>
          <option value="Марокко">Марокко</option>
          <option value="Монако">Монако</option>
          <option value="ОАЭ">ОАЭ</option>
          <option value="Португалия">Португалия</option>
          <option value="Россия">Россия</option>
          <option value="Таиланд">Таиланд</option>
          <option value="Тунис">Тунис</option>
          <option value="Турция">Турция</option>
          <option value="Франция">Франция</option>
          <option value="Хорватия">Хорватия</option>
          <option value="Черногория">Черногория</option>
          <option value="Чехия">Чехия</option>
          <option value="Швеция">Швеция</option>
          <option value="Шри-Ланка">Шри-Ланка</option>
        </optgroup>
        <optgroup label="Популярные">
          <option value="Австрия">Австрия</option>
          <option value="Багамы">Багамы</option>
          <option value="Барбадос">Барбадос</option>
          <option value="Беларусь">Беларусь</option>
          <option value="Бельгия">Бельгия</option>
          <option value="Бразилия">Бразилия</option>
          <option value="Великобритания">Великобритания</option>
          <option value="Венгрия">Венгрия</option>
          <option value="Вьетнам">Вьетнам</option>
          <option value="Германия">Германия</option>
          <option value="Индия">Индия</option>
          <option value="Ирландия">Ирландия</option>
          <option value="Камбоджа">Камбоджа</option>
          <option value="Латвия">Латвия</option>
          <option value="Литва">Литва</option>
          <option value="Маврикий">Маврикий</option>
          <option value="Мьянма (Бирма)">Мьянма (Бирма)</option>
          <option value="Нидерланды">Нидерланды</option>
          <option value="Новая Зеландия">Новая Зеландия</option>
          <option value="Норвегия">Норвегия</option>
          <option value="Польша">Польша</option>
          <option value="Сейшелы">Сейшелы</option>
          <option value="Сингапур">Сингапур</option>
          <option value="Словакия">Словакия</option>
          <option value="Словения">Словения</option>
          <option value="США">США</option>
          <option value="Украина">Украина</option>
          <option value="Швейцария">Швейцария</option>
          <option value="Финляндия">Финляндия</option>
          <option value="Эстония">Эстония</option>
          <option value="Ямайка">Ямайка</option>
        </optgroup>
        <optgroup label="Остальные">
          <option value="Абхазия">Абхазия</option>
          <option value="Австралия">Австралия</option>
          <option value="Азербайджан">Азербайджан</option>
          <option value="Албания">Албания</option>
          <option value="Ангилья">Ангилья</option>
          <option value="Андорра">Андорра</option>
          <option value="Антарктида">Антарктида</option>
          <option value="Антигуа">Антигуа</option>
          <option value="Аргентина">Аргентина</option>
          <option value="Армения">Армения</option>
          <option value="Аруба">Аруба</option>
          <option value="Бангладеш">Бангладеш</option>
          <option value="Бахрейн">Бахрейн</option>
          <option value="Белиз">Белиз</option>
          <option value="Бермудские острова">Бермудские острова</option>
          <option value="Боливия">Боливия</option>
          <option value="Босния и Герцеговина">Босния и Герцеговина</option>
          <option value="Ботсвана">Ботсвана</option>
          <option value="Бруней">Бруней</option>
          <option value="Буркина-Фасо">Буркина-Фасо</option>
          <option value="Бурунди">Бурунди</option>
          <option value="Бутан">Бутан</option>
          <option value="Венесуэла">Венесуэла</option>
          <option value="Гана">Гана</option>
          <option value="Гваделупа">Гваделупа</option>
          <option value="Гватемала">Гватемала</option>
          <option value="Гондурас">Гондурас</option>
          <option value="Гонконг">Гонконг</option>
          <option value="Гренада">Гренада</option>
          <option value="Гренландия">Гренландия</option>
          <option value="Грузия">Грузия</option>
          <option value="Дания">Дания</option>
          <option value="Джибути">Джибути</option>
          <option value="Доминика">Доминика</option>
          <option value="Замбия">Замбия</option>
          <option value="Зимбабве">Зимбабве</option>
          <option value="Индонезия">Индонезия</option>
          <option value="Иордания">Иордания</option>
          <option value="Иран">Иран</option>
          <option value="Исландия">Исландия</option>
          <option value="Кабо-Верде">Кабо-Верде</option>
          <option value="Казахстан">Казахстан</option>
          <option value="Камерун">Камерун</option>
          <option value="Канада">Канада</option>
          <option value="Катар">Катар</option>
          <option value="Кения">Кения</option>
          <option value="Колумбия">Колумбия</option>
          <option value="Коста-Рика">Коста-Рика</option>
          <option value="Кыргызcтан">Кыргызcтан</option>
          <option value="Лаос">Лаос</option>
          <option value="Ливан">Ливан</option>
          <option value="Лихтенштейн">Лихтенштейн</option>
          <option value="Люксембург">Люксембург</option>
          <option value="Мадагаскар">Мадагаскар</option>
          <option value="Македония">Македония</option>
          <option value="Малайзия">Малайзия</option>
          <option value="Марианские о-ва">Марианские о-ва</option>
          <option value="Мартиника">Мартиника</option>
          <option value="Мексика">Мексика</option>
          <option value="Мозамбик">Мозамбик</option>
          <option value="Молдавия">Молдавия</option>
          <option value="Монголия">Монголия</option>
          <option value="Намибия">Намибия</option>
          <option value="Непал">Непал</option>
          <option value="Нигерия">Нигерия</option>
          <option value="Никарагуа">Никарагуа</option>
          <option value="о. Кука">о. Кука</option>
          <option value="Оман">Оман</option>
          <option value="Пакистан">Пакистан</option>
          <option value="Палау">Палау</option>
          <option value="Панама">Панама</option>
          <option value="Папуа Новая Гвинея">Гвинея</option>
          <option value="Парагвай">Парагвай</option>
          <option value="Перу">Перу</option>
          <option value="Реюньон">Реюньон</option>
          <option value="Румыния">Румыния</option>
          <option value="Сан-Марино">Марино</option>
          <option value="Саудовская Аравия">Аравия</option>
          <option value="Свазиленд">Свазиленд</option>
          <option value="Северная Корея">Северная Корея</option>
          <option value="Сенегал">Сенегал</option>
          <option value="Сен-Мартен">Мартен</option>
          <option value="Сент-Винсент и Гренадины">Сент-Винсент и Гренадины</option>
          <option value="Сент-Китс и Невис">Сент-Китс и Невис</option>
          <option value="Сент-Люсия">Сент-Люсия</option>
          <option value="Сербия">Сербия</option>
          <option value="Сирия">Сирия</option>
          <option value="Танзания">Танзания</option>
          <option value="Теркс и Кайкос">Теркс и Кайкос</option>
          <option value="Того">Того</option>
          <option value="Туркменистан">Туркменистан</option>
          <option value="Уганда">Уганда</option>
          <option value="Узбекистан">Узбекистан</option>
          <option value="Уругвай">Уругвай</option>
          <option value="Фиджи">Фиджи</option>
          <option value="Филиппины">Филиппины</option>
          <option value="Французская Полинезия">Полинезия</option>
          <option value="ЦАР">ЦАР</option>
          <option value="Чили">Чили</option>
          <option value="Эквадор">Эквадор</option>
          <option value="Эритрея">Эритрея</option>
          <option value="Эфиопия">Эфиопия</option>
          <option value="ЮАР">ЮАР</option>
          <option value="Южная Корея">Южная Корея</option>
          <option value="Япония">Япония</option>
        </optgroup>
      </FormControl>
    )
  }
}

class TravelAgentSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {travel_agent: props.travel_agent}
  }
  handleChange(event) {
    this.setState({travel_agent: event.target.value})
  }
  render() {
    return (
      <FormControl id="travel_agent" componentClass="select" placeholder="select" defaultValue={this.state.travel_agent}>
        {this.props.withEmpty && <option value="none">Не важно</option>}
        <optgroup label="Популярные">
          <option value="Anex">Anex</option>
          <option value="Biblio Globus">Biblio Globus</option>
          <option value="Coral Travel">Coral Travel</option>
          <option value="Diamond Tours">Diamond Tours</option>
          <option value="DSBW">DSBW</option>
          <option value="ICS Travel Group">ICS Travel Group</option>
          <option value="Natalie Tours">Natalie Tours</option>
          <option value="Pegas Touristik">Pegas Touristik</option>
          <option value="Space Travel">Space Travel</option>
          <option value="Sunmar">Sunmar</option>
          <option value="TED Travel">TED Travel</option>
          <option value="TEZ TOUR">TEZ TOUR</option>
          <option value="TUI">TUI</option>
          <option value="Vilar Tours">Vilar Tours</option>
          <option value="АРТ-ТУР">АРТ-ТУР</option>
          <option value="Ванд">Ванд</option>
          <option value="ДАНКО Трэвел Компани">ДАНКО Трэвел Компани</option>
          <option value="ИННА ТУР">ИННА ТУР</option>
          <option value="Интерюнион">Интерюнион</option>
          <option value="Интурист">Интурист</option>
          <option value="Пантеон Тревел">Пантеон Тревел</option>
          <option value="Русский Экспресс">Русский Экспресс</option>
          <option value="Тройка Холдинг">Тройка Холдинг</option>
        </optgroup>
        <optgroup label="Остальные">
          <option value="7 Тур">7 Тур</option>
          <option value="AATravel">AATravel</option>
          <option value="ACTI tour Russia">ACTI tour Russia</option>
          <option value="Ambotis Holidays">Ambotis Holidays</option>
          <option value="Amigo S">Amigo S</option>
          <option value="Amigo Tours">Amigo Tours</option>
          <option value="Avrora-BG">Avrora-BG</option>
          <option value="BALKAN">BALKAN</option>
          <option value="CALYPSO TOUR">CALYPSO TOUR</option>
          <option value="De Visu">De Visu</option>
          <option value="Elite Travel">Elite Travel</option>
          <option value="Evroport">Evroport</option>
          <option value="Express Tours">Express Tours</option>
          <option value="Good Time Travel">Good Time Travel</option>
          <option value="Grand">Grand</option>
          <option value="GTV">GTV</option>
          <option value="KazTour (KZ)">KazTour (KZ)</option>
          <option value="KAZUNION (KZ)">KAZUNION (KZ)</option>
          <option value="Kompas (KZ)">Kompas (KZ)</option>
          <option value="Meteors Travel">Meteors Travel</option>
          <option value="More Travel">More Travel</option>
          <option value="Mouzenidis Travel">Mouzenidis Travel</option>
          <option value="PAC GROUP">PAC GROUP</option>
          <option value="Pegas Touristik (KZ)">Pegas Touristik (KZ)</option>
          <option value="Pegas Touristik (UA)">Pegas Touristik (UA)</option>
          <option value="Robinson Tours">Robinson Tours</option>
          <option value="SMOK TRAVEL (BY)">SMOK TRAVEL (BY)</option>
          <option value="SOLVEX">SOLVEX</option>
          <option value="TOUR A VENT">TOUR A VENT</option>
          <option value="VIP TOUR EXCLUSIVE">VIP TOUR EXCLUSIVE</option>
          <option value="Voyage Service">Voyage Service</option>
          <option value="West-Line Travel">West-Line Travel</option>
          <option value="Алеан">Алеан</option>
          <option value="Арт-Тревел">Арт-Тревел</option>
          <option value="ВЕДИ ТУРГРУПП">ВЕДИ ТУРГРУПП</option>
          <option value="Время-тур">Время-тур</option>
          <option value="ДАНКО Трэвел Компани (BY)">ДАНКО Трэвел Компани (BY)</option>
          <option value="ДВМ-Тур">ДВМ-Тур</option>
          <option value="Джет Тревел">Джет Тревел</option>
          <option value="Звёзды путешествий">Звёзды путешествий</option>
          <option value="Иволга">Иволга</option>
          <option value="Кандагар">Кандагар</option>
          <option value="Каприкон">Каприкон</option>
          <option value="Мальдивиана">Мальдивиана</option>
          <option value="Матрёшка-Тур">Матрёшка-Тур</option>
          <option value="Меркурий">Меркурий</option>
          <option value="МУЛЬТИТУР">МУЛЬТИТУР</option>
          <option value="Пакс">Пакс</option>
          <option value="Питертур">Питертур</option>
          <option value="Планета Travel">Планета Travel</option>
          <option value="ПЛАНЕТА СОЧИ">ПЛАНЕТА СОЧИ</option>
          <option value="Премьера">Премьера</option>
          <option value="ПТ без доплат">ПТ без доплат</option>
          <option value="Пулково Сервис">Пулково Сервис</option>
          <option value="Ривьера Сочи">Ривьера Сочи</option>
          <option value="Роза Ветров Юг">Роза Ветров Юг</option>
          <option value="Русь-Тур">Русь-Тур</option>
          <option value="Сард Тревел">Сард Тревел</option>
          <option value="Слетать.ру">Слетать.ру</option>
          <option value="Спектрум">Спектрум</option>
          <option value="Топ Тур">Топ Тур</option>
          <option value="Фонд Мира">Фонд Мира</option>
          <option value="Этуаль">Этуаль</option>
          <option value="Юго Стар">Юго Стар</option>
        </optgroup>
      </FormControl>
    )
  }
}

class TourForm extends Component {
  handle(e) {
    e.preventDefault()
    let data = {}
    forEach(e.target.elements, (v) => {data[v.id] = v.value})
    data.rating = this.hotel_rate.state.rating
    data.adult_count = this.adult_count.state.rating
    data.child_count = this.child_count.state.rating
    data.child_ages = this.child_age_setter.state.values.slice(0, data.child_count).join(',')
    this.props.handlerSubmit(data)
  }
  render() {
    let values = this.props.data || {}
    return (
      <Form onSubmit={this.handle.bind(this)}>
        <ControlLabel>Турагентство:</ControlLabel>
        <FormControl
          id="agency"
          type="text"
          placeholder="Введите название агентства..."
          defaultValue={values.agency}
        />
        <ControlLabel>Страна:</ControlLabel>
        <CountrySelect country={values.country}/>
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
        <ControlLabel>Категория отеля: <RaterGetter rating={values.rating || 1} ref={(ref)=>{this.rating_shower = ref}} /></ControlLabel>
        <Rater rating={values.rating || 1} onRate={(e) => {this.rating_shower.setState({rating: e.rating})}} ref={(rater) => { this.hotel_rate = rater; }}>
          <RaterStar view_type="star" />
        </Rater>
        <ControlLabel>Категория номера:</ControlLabel>
        <FormControl
          id="room_rating"
          type="text"
          placeholder="Введите категорию номера..."
          defaultValue={values.room_rating}
        />
        <ControlLabel>Питание:</ControlLabel>
        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={DINNER_HELPER}>
          <Glyphicon glyph="question-sign" />
        </OverlayTrigger>
        <FormControl id="dinner" componentClass="select" placeholder="select" defaultValue={values.dinner}>
          <option value="AI">AI</option>
          <option value="BB">BB</option>
          <option value="FB">FB</option>
          <option value="FB+">FB+</option>
          <option value="HB">HB</option>
          <option value="HB+">HB+</option>
          <option value="RO">RO</option>
          <option value="UAI">UAI</option>
        </FormControl>
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
        <FormControl id="nights" componentClass="select" placeholder="select" defaultValue={values.nights}>
          {[...Array(29)].map((x, i) =>
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          )}
        </FormControl>
        <ControlLabel>Количество взрослых: <RaterGetter rating={values.adult_count || 1} ref={(ref)=>{this.adult_count_shower = ref}} /></ControlLabel>
        <Rater rating={values.adult_count || 1} total={4} onRate={(e) => {this.adult_count_shower.setState({rating: e.rating})}} ref={(rater) => { this.adult_count = rater; }}>
          <RaterStar view_type="parent" />
        </Rater>
        <ControlLabel>Количество детей: <RaterGetter rating={values.child_count || 0} ref={(ref)=>{this.child_count_shower = ref}} /></ControlLabel>
        <Rater
          rating={values.child_count || 0}
          total={3}
          onRate={(e) => {
            this.child_age_setter.setState({count: e.rating})
            this.child_count_shower.setState({rating: e.rating})
          }}
          ref={(rater) => { this.child_count = rater; }}>
          <RaterStar view_type="child" />
        </Rater>
        <FormGroup>
          <ChildAgeSetter child_ages={values.child_ages || ''} ref={(st) => { this.child_age_setter = st }}/>
        </FormGroup>
        <FormGroup controlId="information">
          <ControlLabel>Общая информация по перелету</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Информация о рейсе и пр." defaultValue={values.information} />
        </FormGroup>
        <ControlLabel>Трансфер:</ControlLabel>
        <FormControl id="transfer" componentClass="select" placeholder="select" defaultValue={values.transfer}>
          <option value="Без трансфера">Без трансфера</option>
          <option value="Групповой">Групповой</option>
          <option value="Индивидуальный">Индивидуальный</option>
        </FormControl>
        <ControlLabel>Туроператор:</ControlLabel>
        <TravelAgentSelect travel_agent={values.travel_agent} />
        <ControlLabel>Стоимость покупки у ТО:</ControlLabel>
        <FormControl
          id="original_cost"
          type="number"
          placeholder="Стоимость на сайте ТО в день продажи"
          defaultValue={values.original_cost}
        />
        <ControlLabel>Сейчас стоит у ТО:</ControlLabel>
        <FormControl
          id="current_cost"
          type="number"
          placeholder="Стоимость на сайте ТО на данный момент"
          defaultValue={values.current_cost}
        />
        <ControlLabel>Стоимость:</ControlLabel>
        <FormControl
          id="real_cost"
          type="number"
          placeholder="Стоимость отказного тура"
          defaultValue={values.real_cost}
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

let ratingFormatter = (cell, row) => {
  return (<Rater interactive={false} rating={cell} />)
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
            options={{onRowClick: this.handleRowClick.bind(this)}}
            hover>
            <TableHeaderColumn hidden dataField='id' isKey={true} dataSort={ true }>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='agency' dataSort={ true }>Турагентство</TableHeaderColumn>
            <TableHeaderColumn dataField='country' dataSort={ true }>Страна</TableHeaderColumn>
            <TableHeaderColumn dataField='city' dataSort={ true }>Город</TableHeaderColumn>
            <TableHeaderColumn dataField='hotel' dataSort={ true }>Отель</TableHeaderColumn>
            <TableHeaderColumn dataField='rating' dataFormat={ ratingFormatter } dataSort={ true }>Рейтинг</TableHeaderColumn>
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
    if(this.props.route.path === 'my_tours')
      return (
        this.props.account.loading ?
          <div className='loading_wrapper'>
            <div className='loading'></div>
          </div>
        :
          <TourTable tours={this.props.account.tours} handlerRowClick={this.handlerRowClick.bind(this)} />
      )
    else
      return (
        <div className='tours'>
          <TourNav />
          {this.props.account.loading ?
            <div className='loading_wrapper'>
              <div className='loading'></div>
            </div>
          :
            <TourTable tours={this.props.account.tours} handlerRowClick={this.handlerRowClick.bind(this)} />
          }
        </div>
      )
  }
}

class SearchForm extends Component {
  handleSearch(e) {
    e.preventDefault()
    let data = {}
    forEach(e.target.elements, (v) => {if(v.value && v.value !== 'none') data[v.id] = v.value})
    if(!!this.adult_count.state.rating)
    data.adult_count = this.adult_count.state.rating
    if(!!this.child_count.state.rating)
    data.child_count = this.child_count.state.rating
    this.props.handleSearch(data)
  }
  render() {
    return (
      <Form onSubmit={this.handleSearch.bind(this)}>
        <Col lg={3} md={6} sm={12}>
          <ControlLabel>Страна:</ControlLabel>
          <CountrySelect withEmpty={true} />
        </Col>
        <Col lg={3} md={6} sm={12}>
          <ControlLabel>Город:</ControlLabel>
          <FormControl
            id="city"
            type="text"
            placeholder="Введите название города..."
          />
        </Col>
        <Col lg={3} md={6} sm={12}>
          <ControlLabel>Дата вылета:</ControlLabel>
          <DateTime
            inputProps={{id: 'departure_date', placeholder: 'Выберите дату'}}
            closeOnSelect={true}
            timeFormat={false}
            dateFormat='DD.MM.YYYY'
            isValidDate={ (current) => { return current.isAfter( DateTime.moment().subtract(1, 'day') ) } }
          />
        </Col>
        <Col lg={3} md={6} sm={12}>
          <ControlLabel>Туроператор:</ControlLabel>
          <TravelAgentSelect withEmpty={true} />
        </Col>
        <Col lg={3} md={6} sm={12}>
          <ControlLabel>Количество ночей:</ControlLabel>
          <FormControl id="nights" componentClass="select" placeholder="select">
            <option key='none' value='none'>Не важно</option>
            {[...Array(29)].map((x, i) =>
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            )}
          </FormControl>
        </Col>
        <Col lg={3} md={6} sm={12}>
          <ControlLabel>Количество взрослых: <RaterGetter ref={(ref)=>{this.adult_count_shower = ref}} /></ControlLabel>
          <Rater total={4} onRate={(e) => {this.adult_count_shower.setState({rating: e.rating || undefined})}} ref={(rater) => { this.adult_count = rater; }}>
            <RaterStar view_type="parent" />
          </Rater>
        </Col>
        <Col lg={3} md={6} sm={12}>
          <ControlLabel>Количество детей: <RaterGetter ref={(ref)=>{this.child_count_shower = ref}} /></ControlLabel>
          <Rater
            total={3}
            onRate={(e) => {
              this.child_count_shower.setState({rating: e.rating || undefined})
            }}
            ref={(rater) => { this.child_count = rater; }}>
            <RaterStar view_type="child" />
          </Rater>
        </Col>
        <Col lg={3} md={6} sm={12}>
          <ControlLabel>Стоимость:</ControlLabel>
          <FormControl
            id="real_cost"
            type="number"
            placeholder="Стоимость тура"
          />
        </Col>
        <Col lg={3} md={6} sm={12}>
          <br />
          <Button bsStyle="primary" type="submit">
            Поиск
          </Button>
        </Col>
      </Form>
    )
  }
}

class SearchToursPage extends Component {
  fetchSearchTours(data) {
    this.props.actions.search_tours(data)
  }
  handlerRowClick(id) {
    this.props.router.push('/tours/' + id)
  }
  render() {
    let results = (
      this.props.account.tours && this.props.account.tours.length > 0 ?
        <div className="results_table">
          <TourTable tours={this.props.account.tours} handlerRowClick={this.handlerRowClick.bind(this)} />
        </div>
      :
        <div className="text-center">
          <h5>
            Увы, по выбранным параметрам ничего не найдено
          </h5>
        </div>
    )
    return (
      <div className="search_page">
        <TourNav />
        <SearchForm handleSearch={this.fetchSearchTours.bind(this)}/>
        <Col lg={12} md={12} sm={12} className="search_form">
          {
            this.props.account.loading ?
              <div className='loading_wrapper'>
                <div className='loading fullpage'></div>
              </div>
            :
              this.props.account.init_found &&
                results
          }
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
let connected_search_page = connect(mapStateToProps, mapDispatchToProps)(SearchToursPage)

export {
  connected_page as ToursPage,
  connected_add_page as AddToursPage,
  connected_edit_page as EditToursPage,
  connected_show_page as ShowToursPage,
  connected_search_page as SearchToursPage
}