import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERR,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERR,
  get_users_url,
  SAVE_USER_REQUEST,
  SAVE_USER_SUCCESS,
  delete_users_url
} from '../constants'

import {forEach} from 'lodash'

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
    })
  }
}

export let delete_users = (ids) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_USERS_REQUEST
    })

    let data = new FormData()
    data.append('ids', ids)
    fetch(delete_users_url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'DELETE',
      credentials: 'include',
      body: data
    }).then((response) => {
        response.json().then((jsonResp) => {
          dispatch({
            type: DELETE_USERS_SUCCESS,
            payload: {
              users: jsonResp.users
            }
          })
        })
      })
      .catch((error) => {
        dispatch({
          type: DELETE_USERS_ERR
        })
    })
  }
}

export let save = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_USER_REQUEST
    })

    let data = new FormData()
    forEach(payload, (value, key) => {data.append(key, value)})
    fetch(get_users_url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'POST',
      credentials: 'include',
      body: data
    }).then((response) => {
        response.json().then((jsonResp) => {
          dispatch({
            type: SAVE_USER_SUCCESS,
            payload: {
              users: jsonResp.users
            }
          })
        })
      })
  }
}