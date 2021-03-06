import {
  GET_MY_TOURS_REQUEST,
  GET_MY_TOURS_SUCCESS,
  SETUP_ACCOUNT_REQUEST,
  SETUP_ACCOUNT_SUCCESS,
  SETUP_ACCOUNT_ERR,
  CREATE_TOUR_REQUEST,
  CREATE_TOUR_SUCCESS,
  GET_TOUR_INFO_REQUEST,
  GET_TOUR_INFO_SUCCESS,
  DELETE_TOUR_REQUEST,
  DELETE_TOUR_SUCCESS,
  UPDATE_TOUR_REQUEST,
  UPDATE_TOUR_SUCCESS,
  CHANGE_SUBSCRIBE_REQUEST,
  CHANGE_SUBSCRIBE_SUCCESS,
  SEARCH_TOURS_REQUEST,
  SEARCH_TOURS_SUCCESS,
  HIDE_MSG,
  REFRESH_AVAILABLE_COUNTRIES
} from '../constants'

let sub = localStorage.getItem('sub')

const initialState = {
  loading: false,
  subscribe: sub
}

export let accountReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_MY_TOURS_REQUEST:
      return {
        loading: true,
        tours: []
      }
    case GET_MY_TOURS_SUCCESS:
      return {
        loading: false,
        tours: action.payload.tours
      }

    case SETUP_ACCOUNT_REQUEST:
      return {
        loading: true
      }

    case SETUP_ACCOUNT_SUCCESS:
      return {
        loading: false,
        errors: null,
        info_msg: action.payload.info_msg
      }

    case SETUP_ACCOUNT_ERR:
      return {
        loading: false,
        errors: action.payload.errors
      }
    case CREATE_TOUR_REQUEST:
      return {
        loading: true,
        status: null
      }
    case CREATE_TOUR_SUCCESS:
      return {
        loading: false,
        status: null
      }
    case GET_TOUR_INFO_REQUEST:
      return {
        loading: true,
        tour: null
      }
    case GET_TOUR_INFO_SUCCESS:
      return {
        loading: false,
        tour: action.payload.tour
      }
    case DELETE_TOUR_REQUEST:
      return {
        loading: true
      }
    case DELETE_TOUR_SUCCESS:
      return {
        loading: false
      }
    case UPDATE_TOUR_REQUEST:
      return {
        loading: true
      }
    case UPDATE_TOUR_SUCCESS:
      return {
        loading: false
      }
    case CHANGE_SUBSCRIBE_REQUEST:
      return {
        loading: true
      }
    case CHANGE_SUBSCRIBE_SUCCESS:
      localStorage.setItem('sub', action.payload.subscribe)
      return {
        loading: false,
        subscribe: action.payload.subscribe
      }
    case SEARCH_TOURS_REQUEST:
      return {
        loading: true,
        init_found: false,
        available_countries: state.available_countries
      }
    case SEARCH_TOURS_SUCCESS:
      return {
        loading: false,
        tours: action.payload.tours,
        init_found: true,
        available_countries: state.available_countries
      }
    case REFRESH_AVAILABLE_COUNTRIES:
      return {
        loading: state.loading,
        subscribe: state.subscribe,
        available_countries: action.payload.countries
      }

    case HIDE_MSG:
      return {
        loading: state.loading,
        errors: null,
        info_msg: null
      }

    default:
      return state
    }
}