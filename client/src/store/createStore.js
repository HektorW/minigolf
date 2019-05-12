import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../modules'

const isDevelopment = process.env.NODE_ENV === 'development'

export default () => {
  const composeEnhancers =
    isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

  const middleware = [thunk]

  const store = createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(...middleware))
  )

  if (isDevelopment) {
    window.store = store
  }

  return store
}
