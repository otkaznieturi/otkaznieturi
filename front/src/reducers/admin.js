import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERR,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERR
} from '../constants'

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
      return {
        loading: false,
        users: action.payload.users
      }
    case GET_USERS_ERR:
      return {
        loading: false,
        users: []
      }
    case DELETE_USERS_REQUEST:
      return {
        loading: true
      }
    case DELETE_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.users
      }
    case DELETE_USERS_ERR:
      return {
        loading: false,
        users: state.users
      }

    default:
      return state
    }
}