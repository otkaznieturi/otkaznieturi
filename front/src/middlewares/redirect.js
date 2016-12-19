import { browserHistory } from 'react-router'

const ROUTING = 'ROUTING'

export const redirect = store => next => action => {
  if (action.type === ROUTING)
    browserHistory[action.payload.method](action.payload.nextUrl)

  return next(action)
}