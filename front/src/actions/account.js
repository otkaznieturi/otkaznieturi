import {
  GET_MY_TOURS,
  SETUP_ACCOUNT_REQUEST,
  SETUP_ACCOUNT_SUCCESS,
  SETUP_ACCOUNT_ERR,
  HIDE_MSG,
  ROUTING,
  change_pass_url
} from '../constants'

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
