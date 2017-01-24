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
  ROUTING,
  change_pass_url,
  my_tours_url,
  tours_url,
  today_tours_url,
  change_subscribe_url,
  search_tours_url
} from '../constants'

import {forEach} from 'lodash'

export let setup_account = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SETUP_ACCOUNT_REQUEST
    })

    let data = new FormData()
    data.append('old_pass', payload.old_pass)
    data.append('new_pass', payload.new_pass)
    data.append('new_pass_confirm', payload.new_pass_confirm)
    fetch(change_pass_url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'POST',
      credentials: 'include',
      body: data
    }).then((response) => {
        if(response.status !== 200){
          response.json().then((jsonResp) => {
            dispatch({
              type: SETUP_ACCOUNT_ERR,
              payload: {
                errors: jsonResp.errors
              }
            })
          })
        } else {
          response.json().then((jsonResp) => {
            dispatch({
              type: SETUP_ACCOUNT_SUCCESS,
              payload: {
                info_msg: jsonResp.info_msg
              }
            })
          })
        }
        setTimeout(() => {
          dispatch({
            type: HIDE_MSG
          })
        }, 5000)
      })
      .catch((error) => {
        dispatch({
          type: SETUP_ACCOUNT_ERR
        })
    });
  }
}

export let get_tours = (mode) => {
  return (dispatch) => {
    dispatch({
      type: GET_MY_TOURS_REQUEST
    })

    let url = null;
    switch (mode){
      case 'all':
        url = tours_url;
      break
      case 'my':
        url = my_tours_url;
      break
      case 'today':
        url = today_tours_url;
      break
      default:
      break
    }
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
        response.json().then((jsonResp) => {
          dispatch({
            type: GET_MY_TOURS_SUCCESS,
            payload: {
              tours: jsonResp.tours
            }
          })
        })
      })
      .catch((error) => {
        dispatch({
          type: SETUP_ACCOUNT_ERR
        })
    });
  }
}

export let create_tour = (payload) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_TOUR_REQUEST
    })

    let data = new FormData()
    forEach(payload, (value, key) => {data.append(key, value)})
    fetch(tours_url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'POST',
      credentials: 'include',
      body: data
    }).then((response) => {
      response.json().then((jsonResp) => {
        dispatch({
          type: CREATE_TOUR_SUCCESS
        })
        dispatch({
          type: ROUTING,
          payload: {
            method: 'goBack'
          }
        })
      })
    })
    .catch((error) => {
      // dispatch({
      //   type: SETUP_ACCOUNT_ERR
      // })
    });
  }
}

export let get_tour = (payload) => {
  return (dispatch) => {
    dispatch({
      type: GET_TOUR_INFO_REQUEST
    })
    fetch(tours_url + '/' + payload.id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
      if(response.status === 404)
        dispatch({
          type: ROUTING,
          payload: {
            method: 'replace',
            nextUrl: '/not_found'
          }
        })
      else
        response.json().then((jsonResp) => {
          dispatch({
            type: GET_TOUR_INFO_SUCCESS,
            payload: {
              tour: jsonResp.tour
            }
          })
        })
    })
    .catch((error) => {
      dispatch({
        type: ROUTING,
        payload: {
          method: 'replace',
          nextUrl: '/not_found'
        }
      })
    });
  }
}

export let delete_tour = (payload) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_TOUR_REQUEST
    })
    fetch(tours_url + '/' + payload.id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'DELETE',
      credentials: 'include'
    }).then((response) => {
      response.json().then((jsonResp) => {
        dispatch({
          type: DELETE_TOUR_SUCCESS
        })
        dispatch({
          type: ROUTING,
          payload: {
            method: 'goBack'
          }
        })
      })
    })
    .catch((error) => {
      console.error(error)
      // dispatch({
      //   type: SETUP_ACCOUNT_ERR
      // })
    });
  }
}

export let edit_tour = (payload) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOUR_REQUEST
    })

    let data = new FormData()
    forEach(payload, (value, key) => {data.append(key, value)})
    fetch(tours_url + '/' + payload.id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'PUT',
      credentials: 'include',
      body: data
    }).then((response) => {
      response.json().then((jsonResp) => {
        dispatch({
          type: UPDATE_TOUR_SUCCESS
        })
        dispatch({
          type: ROUTING,
          payload: {
            method: 'goBack'
          }
        })
      })
    })
    .catch((error) => {
      console.log(error)
      // dispatch({
      //   type: SETUP_ACCOUNT_ERR
      // })
    });
  }
}

export let change_subscribe = (payload) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_SUBSCRIBE_REQUEST
    })

    let data = new FormData()
    forEach(payload, (value, key) => {data.append(key, value)})
    fetch(change_subscribe_url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'PUT',
      credentials: 'include',
      body: data
    }).then((response) => {
      response.json().then((jsonResp) => {
        dispatch({
          type: CHANGE_SUBSCRIBE_SUCCESS,
          payload: {
            subscribe: jsonResp.subscribe
          }
        })
      })
    })
    .catch((error) => {
      console.log(error)
      // dispatch({
      //   type: SETUP_ACCOUNT_ERR
      // })
    });
  }
}

export let search_tours = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_TOURS_REQUEST
    })
    let url_with_params = search_tours_url + '?'
    forEach(payload, (value, key) => {url_with_params += key + "=" + value + '&'})
    url_with_params = url_with_params.slice(0, -1)
    fetch(url_with_params, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
      },
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
      response.json().then((jsonResp) => {
        dispatch({
          type: SEARCH_TOURS_SUCCESS,
          payload: {
            tours: jsonResp.tours
          }
        })
      })
    })
    .catch((error) => {
      console.error(error)
    });
  }
}