// const host = "http://127.0.0.1:4000"
const host = "xn--80akfkrctkfk9fe.xn--p1ai"

const prefix = '/api/'

// URL's
export const loginUrl = host + prefix + 'sign_in'
export const registrationUrl = host + prefix + 'sign_up'
export const change_pass_url = host + prefix + 'change_pass'
export const my_tours_url = host + prefix + 'tours/my_tours'
export const all_tours_url = host + prefix + 'tours'
export const today_tours_url = host + prefix + 'tours/today_tours'
export const get_counters_url = host + prefix + 'tours/counters'
export const create_tour_url = host + prefix + 'tours'
export const get_tour_url = host + prefix + 'tours'

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
export const CREATE_TOUR_REQUEST = 'CREATE_TOUR_REQUEST'
export const CREATE_TOUR_SUCCESS = 'CREATE_TOUR_SUCCESS'
export const GET_TOUR_INFO_REQUEST = 'GET_TOUR_INFO_REQUEST'
export const GET_TOUR_INFO_SUCCESS = 'GET_TOUR_INFO_SUCCESS'
export const DELETE_TOUR_REQUEST = 'DELETE_TOUR_REQUEST'
export const DELETE_TOUR_SUCCESS = 'DELETE_TOUR_SUCCESS'
export const UPDATE_TOUR_REQUEST = 'UPDATE_TOUR_REQUEST'
export const UPDATE_TOUR_SUCCESS = 'UPDATE_TOUR_SUCCESS'
// main
export const GET_TOURS_COUNTER_REQUEST = 'GET_TOURS_COUNTER_REQUEST'
export const GET_TOURS_COUNTER_SUCCESS = 'GET_TOURS_COUNTER_SUCCESS'

export const ROUTING = 'ROUTING'