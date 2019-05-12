import produce from 'immer'
import {
  SET_PUSH_IS_SUPPORTED,
  ASK_FOR_PERMISSION_START,
  ASK_FOR_PERMISSION_STOP,
  SUBSCRIBE_REQUEST,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAILURE,
  UNSUBSCRIBE_REQUEST,
  UNSUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_FAILURE
} from './notifications.actions'

const initialState = {
  vapidPublicKey: null,
  subscriptionId: null,

  isPushSupported: false,
  isSubscribed: false,

  isAskingForPermission: false,

  isSubscribing: false,
  subscribeError: null,

  isUnsubscribing: false,
  unsubscribeError: null
}

export default function notificationsReducer(
  state = initialState,
  action = {}
) {
  return produce(state, draft => {
    switch (action.type) {
      case SET_PUSH_IS_SUPPORTED:
        draft.isPushSupported = action.isSupported === true
        break

      case ASK_FOR_PERMISSION_START:
        draft.isAskingForPermission = true
        break

      case ASK_FOR_PERMISSION_STOP:
        draft.isAskingForPermission = false
        break

      case SUBSCRIBE_REQUEST:
        draft.isSubscribing = true
        draft.subscribeError = null
        break

      case SUBSCRIBE_SUCCESS:
        draft.isSubscribed = true
        draft.isSubscribing = false
        break

      case SUBSCRIBE_FAILURE:
        draft.isSubscribing = false
        draft.subscribeError = action.error
        break

      case UNSUBSCRIBE_REQUEST:
        draft.isUnsubscribing = true
        draft.unsubscribeError = null
        break

      case UNSUBSCRIBE_SUCCESS:
        draft.isSubscribed = false
        draft.isUnsubscribing = false
        break

      case UNSUBSCRIBE_FAILURE:
        draft.isUnsubscribing = false
        draft.unsubscribeError = action.error
        break
    }
  })
}
