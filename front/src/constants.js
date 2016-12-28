const host = "http://127.0.0.1:4000"
// const host = "http://85.143.214.26:4000"

// URL's
export const loginUrl = host + '/api/sign_in'
export const registrationUrl = host + '/api/sign_up'
export const change_pass_url = host + '/api/change_pass'
export const my_tours_url = host + '/api/tours/my_tours'

// REDUX STATES
// common
export const HIDE_MSG = 'HIDE_MSG'
// auth
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// account
export const SETUP_ACCOUNT_REQUEST = 'SETUP_ACCOUNT_REQUEST'
export const SETUP_ACCOUNT_SUCCESS = 'SETUP_ACCOUNT_SUCCESS'
export const SETUP_ACCOUNT_ERR = 'SETUP_ACCOUNT_ERR'
export const GET_MY_TOURS_REQUEST = 'GET_MY_TOURS_REQUEST'
export const GET_MY_TOURS_SUCCESS = 'GET_MY_TOURS_SUCCESS'

export const ROUTING = 'ROUTING'