import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGIN_FAIL,
  LOGIN_CHECK,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  ROUTING,
  loginUrl,
  registrationUrl,
  sessionUrl
} from '../constants'

let login_success = (dispatch, payload) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      isAuthenticated: true,
      loading: false,
      token: payload.auth_token
    }
  })
  localStorage.setItem('bearer', payload.auth_token)
  dispatch({
    type: ROUTING,
    payload: {
      method: 'replace',
      nextUrl: '/'
    }
  })
}

let login_fail = (dispatch) => {
  dispatch({
    type: LOGIN_FAIL,
    payload: {
      isAuthenticated: false,
      loading: false,
      token: null
    }
  })
}

let register_success = (dispatch, payload) => {
  dispatch({
    type: REGISTER_SUCCESS,
    payload: {
      isAuthenticated: true,
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
    data.append('password_confirmation', payload.pass)
    fetch(registrationUrl, { 
      method: 'POST',
      credentials: 'include',
      body: data
    }).then((response) => {
        response.status !== 200 ?
          login_fail(dispatch)
        :
          response.json().then((jsonResp) => { login_success(dispatch, jsonResp) })
      })
      .catch((error) => {
        register_fail(dispatch)
    });
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
          login_fail(dispatch)
        :
          response.json().then((jsonResp) => { login_success(dispatch, jsonResp) })
      })
      .catch((error) => {
        login_fail(dispatch)
    });
  }
}

export let logout = (payload) => {
  return (dispatch) => {
    localStorage.removeItem('bearer')
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