import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../../components/_inputs/Checkbox'
import Surface from '../../../components/Surface'
import useUILoadState from '../../../hooks/useUILoadState'
import './notifications.scss'

const Notifications = ({
  isPushSupported,
  isSubscribed,
  isLoading,
  notSupportedReasons,
  setSubscribed
}) => {
  const shouldShowLoadState = useUILoadState(isLoading, 100, 1500)

  return (
    <Surface className="notifications" withPadding>
      {isPushSupported ? (
        <>
          <Checkbox
            className="notifications__checkbox"
            isChecked={isSubscribed}
            onChange={setSubscribed}
            disabled={shouldShowLoadState}
          >
            Skicka notis för nya matchresultat
          </Checkbox>

          {shouldShowLoadState && (
            <small className="notifications__loading">
              Vänta lite, tar hand om några kopplingar bakom kulisserna
            </small>
          )}
        </>
      ) : (
        <>
          <p>Din webbläsare stödjer inte push notiser :(</p>
          <ul>
            {notSupportedReasons.map(reason => <li key={reason}>{reason}</li>)}
          </ul>
        </>
      )}
    </Surface>
  )
}

Notifications.propTypes = {}

export default Notifications
