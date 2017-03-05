import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as adminActions from '../actions/admin'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {forEach, find} from 'lodash'

class CustomInsertModal extends React.Component {

  handleSaveBtnClick = () => {
    const { cols, onSave } = this.props
    const newRow = {}
    cols.forEach((column, i) => {
      newRow[column.field] = this.refs[column.field].value
    }, this)
    // You should call onSave function and give the new row
    onSave(newRow)
  }

  render() {
    const {
      onModalClose,
      onSave,
      cols,
      validateState,
      ignoreEditable
    } = this.props
    return (
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>Создание нового пользователя</h2>
        </div>
        <div className='col-md-12'>
          {
            cols.map((column, i) => {
              const {
                editable,
                format,
                field,
                name,
                hiddenOnInsert
              } = column
              const error = validateState[field] ?
                (<span className='help-block bg-danger'>{ validateState[field] }</span>) :
                null
              return (
                <div className='form-group' key={ field }>
                  <label className="control-label">{ name } : </label>
                  <input className="form-control" ref={ field } type={field == 'password' ? 'password' : 'text'} defaultValue={ '' } />
                  { error }
                </div>
              )
            })
          }
        </div>
        <div className='modal-footer'>
          <button className='btn btn-success' onClick={ () => this.handleSaveBtnClick(cols, onSave) }>Создать</button>
          <button className='btn btn-default' onClick={ onModalClose }>Закрыть</button>
        </div>
      </div>
    )
  }
}

class UsersPage extends Component {
  createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
    onSave = (data) => {this.props.actions.save(data)}
    let cols = []
    cols.push(find(columns, {field: 'email'}))
    cols.push({
      autoValue: false,
      editable: true,
      field: "password",
      format: false,
      name: "Пароль"
    })
    cols.push(find(columns, {field: 'company_name'}))
    cols.push(find(columns, {field: 'address'}))
    cols.push({
      autoValue: false,
      editable: true,
      field: "user_data",
      format: false,
      name: "Информация"
    })
    const attr = {
      onModalClose, onSave, cols, validateState, ignoreEditable
    }
    return (
      <CustomInsertModal { ... attr } />
    )
  }
  fetchUsers() {
    this.props.actions.get_users()
  }
  componentWillMount() {
    this.fetchUsers()
  }
  handleDeletedRow(del_data) {
    let fordel_ids = []
    forEach(this.props.admin.users, i => {if(~del_data.indexOf(i.id)) fordel_ids.push(i.id)})
    this.props.actions.delete_users(fordel_ids)
  }
  confirmDelete(next) {
    // make confirmation here
    next()
  }
  render() {
    return (
      this.props.admin.loading ?
        <div className='loading_wrapper'>
          <div className='loading'></div>
        </div>
      :
        <div className='users'>
          { this.props.admin.users && this.props.admin.users.length > 0 ?
            <BootstrapTable
              data={ this.props.admin.users }
              pagination
              striped
              condensed
              search
              deleteRow
              insertRow
              selectRow={{mode: 'checkbox', clickToSelect: true}}
              searchPlaceholder='Поиск по таблице...'
              options={{
                afterDeleteRow: this.handleDeletedRow.bind(this),
                insertModal: this.createCustomModal,
                deleteText: 'Удалить',
                insertText: 'Добавить',
                handleConfirmDeleteRow: this.confirmDelete
              }}
              hover>
              <TableHeaderColumn dataField='id' isKey={true} dataSort={ true }>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='email' dataSort={ true }>Email</TableHeaderColumn>
              <TableHeaderColumn dataField='company_name' dataSort={ true }>Название компании</TableHeaderColumn>
              <TableHeaderColumn dataField='address' dataSort={ true }>Адрес</TableHeaderColumn>
            </BootstrapTable>
          :
            <div>
              <div className="text-center"><h4>Пользователей нет</h4></div>
            </div>
          }
        </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    admin: state.admin
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(adminActions, dispatch)
  }
}

let users_page = connect(mapStateToProps, mapDispatchToProps)(UsersPage)

export {
  users_page as UsersPage
}