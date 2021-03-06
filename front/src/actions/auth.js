import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  HIDE_MSG,
  ROUTING,
  CHANGE_SUBSCRIBE_SUCCESS,
  TOKEN_NOT_FOUND,
  loginUrl,
  registration_url,
  activate_acc_url
} from '../constants'

let login_success = (dispatch, payload) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      isAuthenticated: true,
      loading: false,
      token: payload.auth_token,
      admin: payload.user.admin
    }
  })
  localStorage.setItem('bearer', payload.auth_token)
  localStorage.setItem('ca', payload.user.admin)
  localStorage.setItem('sub', payload.user.subscribe)
  dispatch({
    type: CHANGE_SUBSCRIBE_SUCCESS,
    payload: {
      subscribe: payload.user.subscribe
    }
  })
  dispatch({
    type: ROUTING,
    payload: {
      method: 'replace',
      nextUrl: '/'
    }
  })
}

let login_fail = (dispatch, payload) => {
  dispatch({
    type: LOGIN_FAIL,
    payload: {
      isAuthenticated: false,
      loading: false,
      token: null,
      errors: payload.errors
    }
  })
  setTimeout(() => {
    dispatch({
      type: HIDE_MSG
    })
  }, 5000)
}

let register_fail = (dispatch) => {
  dispatch({
    type: REGISTER_FAIL,
    payload: {
      isAuthenticated: false,
      loading: false,
      token: null
    }
  })
}

export let register = (payload) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
      payload: {
        loading: true
      }
    })

    let data = new FormData()
    data.append('email', payload.login)
    data.append('password', payload.pass)
    data.append('password_confirmation', payload.pass_confirm)
    fetch(registration_url, {
      method: 'POST',
      credentials: 'include',
      body: data
    }).then((response) => {
        response.status !== 200 ?
          response.json().then((jsonResp) => { login_fail(dispatch, jsonResp) })
        :
          response.json().then((jsonResp) => {
            dispatch({
              type: REGISTER_SUCCESS,
              payload: {
                message: 'Письмо с адресом активации выслано на указанный email'
              }
            })
          })
      })
      .catch((error) => {
        register_fail(dispatch)
    })
  }
}

export let login = (payload) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        loading: true
      }
    })

    let data = new FormData()
    data.append('email', payload.login)
    data.append('password', payload.pass)
    fetch(loginUrl, {
      method: 'POST',
      credentials: 'include',
      body: data
    }).then((response) => {
        response.status === 401 ?
          response.json().then((jsonResp) => { login_fail(dispatch, jsonResp) })
        :
          response.json().then((jsonResp) => { login_success(dispatch, jsonResp) })
      })
      .catch((error) => {
        login_fail(dispatch)
    })
  }
}

export let logout = (payload) => {
  return (dispatch) => {
    localStorage.removeItem('bearer')
    localStorage.removeItem('ca')
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: {
        isAuthenticated: false,
        loading: false,
        token: null
      }
    })

    dispatch({
      type: ROUTING,
      payload: {
        method: 'replace',
        nextUrl: '/'
      }
    })
  }
}

export let activate_account = (payload) => {
  return (dispatch) => {
    fetch(activate_acc_url + '?token=' + payload.token, {
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
        response.status === 404 ?
          dispatch({
            type: TOKEN_NOT_FOUND,
            payload: {
              activate_error: 'Аккаунт/токен не найден'
            }
          })
        :
          dispatch({
            type: ROUTING,
            payload: {
              method: 'replace',
              nextUrl: '/login'
            }
          })
      })
      .catch((error) => {
        console.error(error)
    });
  }
}