import { isServiceWorkerSupported } from './feature-support'

const SERVICE_WORKER_PATH = '/service-worker.js'

export const registerServiceWorker = async () => {
  if (isServiceWorkerSupported === false) {
    throw new Error('Service worker is not supported')
  }

  return window.navigator.serviceWorker.register(SERVICE_WORKER_PATH)
}

export const getRegistration = () =>
  window.navigator.serviceWorker.getRegistration().then(registration => {
    if (!registration) {
      throw new Error('No existing service worker registration')
    }
    return registration
  })

export const hasServiceWorker = () =>
  getRegistration().then(() => true, () => false)
