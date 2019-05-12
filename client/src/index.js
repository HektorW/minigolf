/* global module */
import 'react-hot-loader/patch'
import './styles/main.scss'

import React from 'react'
import { render } from 'react-dom'
import { AppContainer as HotLoaderContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import PartietApp from './PartietApp'
import createStore from './store/createStore'
import { registerServiceWorker } from './service-worker/registration'

const rootElement = document.getElementById('app')
const store = createStore()

const renderApp = AppRootComponent => {
  render(
    <HotLoaderContainer>
      <Provider store={store}>
        <AppRootComponent />
      </Provider>
    </HotLoaderContainer>,
    rootElement
  )
}

renderApp(PartietApp)

if (module.hot) {
  module.hot.accept('./PartietApp', () => renderApp(PartietApp))
}

registerServiceWorker()
