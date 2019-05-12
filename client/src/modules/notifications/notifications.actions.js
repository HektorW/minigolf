import { get, post } from '../../api'
import {
  requestPushPermission,
  isPermissionGranted,
  isPermissionDenied
} from '../../service-worker/push-notifications/permission'
import {
  subscribe,
  unsubscribe,
  getSubscription
} from '../../service-worker/push-notifications/subscription'
import {
  isServiceWorkerSupported,
  isPushSupported
} from '../../service-worker/feature-support'
import { hasServiceWorker } from '../../service-worker/registration'

const API_ENDPOINT_SUBSCRIBE = '/api/push-subscription/add'

export const SET_PUSH_IS_SUPPORTED = 'PUSH_NOTIFICATIONS_SET_PUSH_IS_SUPPORTED'

export const ASK_FOR_PERMISSION_START =
  'PUSH_NOTIFICATIONS_ASK_FOR_PERMISSION_START'
export const ASK_FOR_PERMISSION_STOP =
  'PUSH_NOTIFICATIONS_ASK_FOR_PERMISSION_STOP'

export const SUBSCRIBE_REQUEST = 'PUSH_NOTIFICATIONS_SUBSCRIBE_REQUEST'
export const SUBSCRIBE_SUCCESS = 'PUSH_NOTIFICATIONS_SUBSCRIBE_SUCCESS'
export const SUBSCRIBE_FAILURE = 'PUSH_NOTIFICATIONS_SUBSCRIBE_FAILURE'

export const UNSUBSCRIBE_REQUEST = 'PUSH_NOTIFICATIONS_UNSUBSCRIBE_REQUEST'
export const UNSUBSCRIBE_SUCCESS = 'PUSH_NOTIFICATIONS_UNSUBSCRIBE_SUCCESS'
export const UNSUBSCRIBE_FAILURE = 'PUSH_NOTIFICATIONS_UNSUBSCRIBE_FAILURE'

export const subscribeToPush = () => async (dispatch, getState) => {
  if (isPermissionDenied()) {
    return
  }

  if (isPermissionGranted() !== true) {
    dispatch({ type: ASK_FOR_PERMISSION_START })

    let permisionWasGranted = false
    try {
      await requestPushPermission()
      permisionWasGranted = true
    } catch (error) {
      // Ignore error
    }

    dispatch({ type: ASK_FOR_PERMISSION_STOP })

    if (permisionWasGranted !== true) {
      return
    }
  }

  dispatch({ type: SUBSCRIBE_REQUEST })

  const { vapidPublicKey } = await get('/api/push-subscription/vapid')

  let subscriptionId
  try {
    console.log(vapidPublicKey)
    const subscription = await subscribe(vapidPublicKey)
    const response = await sendSubscriptionToServer(subscription)
    subscriptionId = response.subscriptionId
  } catch (error) {
    dispatch({ type: SUBSCRIBE_FAILURE, error })
    return
  }

  dispatch({ type: SUBSCRIBE_SUCCESS, subscriptionId })
}

const sendSubscriptionToServer = subscription => {
  const subscriptionJson = subscription.toJSON()

  const requestOptions = {
    body: {
      subscription: {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscriptionJson.keys.p256dh,
          auth: subscriptionJson.keys.auth
        }
      },
      userAgent: navigator.userAgent
    }
  }

  return post(API_ENDPOINT_SUBSCRIBE, requestOptions)
}

export const unsubscribeFromPush = () => dispatch => {
  dispatch({ type: UNSUBSCRIBE_REQUEST })

  return unsubscribe().then(
    () => dispatch({ type: UNSUBSCRIBE_SUCCESS }),
    error => dispatch({ type: UNSUBSCRIBE_FAILURE, error })
  )
}

export const initializePush = () => async (dispatch, getState) => {
  const isSupported =
    isServiceWorkerSupported === true &&
    isPushSupported === true &&
    (await hasServiceWorker()) === true

  dispatch({ type: SET_PUSH_IS_SUPPORTED, isSupported })

  if (isSupported === false) {
    return
  }

  try {
    const subscription = await getSubscription()
    sendSubscriptionToServer(subscription)
    dispatch({ type: SUBSCRIBE_SUCCESS })
  } catch (error) {
    // Ignore error
  }
}
