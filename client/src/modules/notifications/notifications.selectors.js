export const isSubscribed = state => state.notifications.isSubscribed

export const isLoading = state =>
  state.notifications.isSubscribing || state.notifications.isUnsubscribing

export const isAskingForPermission = state =>
  state.notifications.isAskingForPermission

export const isPushSupported = state => state.notifications.isPushSupported
