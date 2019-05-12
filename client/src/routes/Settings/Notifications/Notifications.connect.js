import { connect } from 'react-redux'
import Notifications from './Notifications'
import {
  subscribeToPush,
  unsubscribeFromPush
} from '../../../modules/notifications/notifications.actions'
import {
  isPushSupported,
  isSubscribed,
  isLoading
} from '../../../modules/notifications/notifications.selectors'
import * as featureSupport from '../../../service-worker/feature-support'

const mapStateToProps = state => ({
  isPushSupported: isPushSupported(state),
  isSubscribed: isSubscribed(state),
  isLoading: isLoading(state),

  notSupportedReasons: [
    `Service worker is ${
      featureSupport.isServiceWorkerSupported ? '' : 'not '
    }supported`,
    `Web push is ${featureSupport.isPushSupported ? '' : 'not '}supported`
  ]
})

const mapDispatchToProps = {
  subscribeToPush,
  unsubscribeFromPush
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,

  setSubscribed: shouldSubscribe => {
    if (shouldSubscribe) {
      dispatchProps.subscribeToPush()
    } else {
      dispatchProps.unsubscribeFromPush()
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Notifications
)
