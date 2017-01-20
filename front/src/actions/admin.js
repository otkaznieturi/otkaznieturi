import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERR,
  get_users_url
} from '../constants'

export let get_users = (mode) => {
  return (dispatch) => {
    dispatch({
      type: GET_USERS_REQUEST
    })

    fetch(get_users_url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
        response.json().then((jsonResp) => {
          dispatch({
            type: GET_USERS_SUCCESS,
            payload: {
              users: jsonResp.users
            }
          })
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_USERS_ERR
        })
    });
  }
}
