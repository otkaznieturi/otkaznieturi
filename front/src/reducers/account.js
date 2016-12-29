import {
  GET_MY_TOURS_REQUEST,
  GET_MY_TOURS_SUCCESS,
  SETUP_ACCOUNT_REQUEST,
  SETUP_ACCOUNT_SUCCESS,
  SETUP_ACCOUNT_ERR,
  HIDE_MSG
} from '../constants'

const initialState = {
  loading: false
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