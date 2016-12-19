import {LOGIN_REQUEST, LOGOUT_REQUEST, LOGIN_FAIL, LOGIN_CHECK, LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../constants'

let token = localStorage.getItem('bearer')

const initialState = {
  isAuthenticated: !!token,
  loading: false,
  token: token ? token : null
}

export let authReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOGIN_REQUEST:
      return {
        loading: action.payload.loading,
        token: action.payload.token
      }

    case LOGIN_CHECK:
      return {
        token: action.payload.token
      }

    case LOGIN_SUCCESS:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        loading: action.payload.loading,
        token: action.payload.token
      }

    case LOGIN_FAIL:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        loading: action.payload.loading,
        token: action.payload.token
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

    default:
      return state
    }
}