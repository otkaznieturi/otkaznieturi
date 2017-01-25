import {
  GET_TOURS_COUNTER_REQUEST,
  GET_TOURS_COUNTER_SUCCESS
} from '../constants'

const initialState = {
  loading: false,
  tours: 0,
  today_tours: 0
}

export let mainPageReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_TOURS_COUNTER_REQUEST:
      return {
        loading: true
      }
    case GET_TOURS_COUNTER_SUCCESS:
      return {
        loading: false,
        tours: action.payload.tours,
        today_tours: action.payload.today_tours
      }

    default:
      return state
    }
}