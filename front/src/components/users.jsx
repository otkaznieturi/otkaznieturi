import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as adminActions from '../actions/admin'
import {Link} from 'react-router'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

class UsersPage extends Component {
  fetchUsers() {
    this.props.actions.get_users()
  }
  componentWillMount() {
    this.fetchUsers()
  }
  handleDeletedRow(del_data) {
    let fordel_ids = []
    for(var i in del_data)
      fordel_ids.push(this.props.admin.users[i].id)
    this.props.actions.delete_users(fordel_ids)
  }
  confirmDelete(next) {
    // make confirmation here
    next();
  }
  render() {
    return (
      <div className='users'>
        { this.props.admin.users  && this.props.admin.users.length > 0 ?
          <BootstrapTable
            data={ this.props.admin.users }
            pagination
            striped
            condensed
            search
            deleteRow
            selectRow={{mode: 'checkbox', clickToSelect: true}}
            searchPlaceholder='Поиск по таблице...'
            options={{
              afterDeleteRow: this.handleDeletedRow.bind(this),
              deleteText: 'Удалить',
              handleConfirmDeleteRow: this.confirmDelete
            }}
            hover>
            <TableHeaderColumn dataField='id' isKey={true} dataSort={ true }>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='email' dataSort={ true }>Email</TableHeaderColumn>
            <TableHeaderColumn dataField='created_at' dataSort={ true }>Дата регистрации</TableHeaderColumn>
          </BootstrapTable>
        :
          <div>
            <div className="text-center">Пользователей нет</div>
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