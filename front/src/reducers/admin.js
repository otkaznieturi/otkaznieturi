import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERR,
} from '../constants'

import Moment from 'moment'

const initialState = {
  loading: false,
  users: []
}

export let adminReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_USERS_REQUEST:
      return {
        loading: true,
        users: []
      }
    case GET_USERS_SUCCESS:
      let corrected_users = action.payload.users.map((user) => {
        user.created_at = Moment(user.created_at).format('DD.MM.YYYY HH:mm')
        return user
      })
      return {
        loading: false,
        users: action.payload.users
      }
    case GET_USERS_ERR:
      return {
        loading: false,
        users: []
      }

    default:
      return state
    }
}