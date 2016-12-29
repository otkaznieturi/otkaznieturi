import {
  GET_TOURS_COUNTER_REQUEST,
  GET_TOURS_COUNTER_SUCCESS,
  get_counters_url
} from '../constants'

export let get_tour_counters = () => {
  return (dispatch) => {
    dispatch({
      type: GET_TOURS_COUNTER_REQUEST
    })
    fetch(get_counters_url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
        response.json().then((jsonResp) => {
          dispatch({
            type: GET_TOURS_COUNTER_SUCCESS,
            payload: {
              tours: jsonResp.tours,
              today_tours: jsonResp.today_tours
            }
          })
        })
      })
      .catch((error) => {
        dispatch({
          type: 'ERR'
        })
      });
  }
}