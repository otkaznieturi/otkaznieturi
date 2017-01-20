import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  HIDE_MSG
} from '../constants'

let token = localStorage.getItem('bearer')
let admin = localStorage.getItem('ca')

const initialState = {
  isAuthenticated: !!token,
  loading: false,
  token: token ? token : null,
  admin: !!admin
}

export let authReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOGIN_REQUEST:
      return {
        loading: action.payload.loading,
        token: action.payload.token
      }

    case LOGIN_SUCCESS:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        loading: action.payload.loading,
        token: action.payload.token,
        admin: action.payload.admin
      }

    case LOGIN_FAIL:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        loading: action.payload.loading,
        token: action.payload.token,
        errors: action.payload.errors
      }

    case LOGOUT_REQUEST:
      return {
        loading: action.payload.loading,
        token: action.payload.token
      }

    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        loading: action.payload.loading,
        token: action.payload.token
      }

    case HIDE_MSG:
      return {
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        token: state.token,
        errors: null
      }

    default:
      return state
    }
}