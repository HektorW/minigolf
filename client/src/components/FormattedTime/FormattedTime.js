import React from 'react'
import PropTypes from 'prop-types'
import { classNames, addChildClassName } from '../../utils/classNames'

const leadingZero = value => (value < 10 ? `0${value}` : String(value))

const FormattedTime = ({ date, className }) => {
  const hours = date.getHours()
  const minutes = leadingZero(date.getMinutes())

  return (
    <span className={classNames('formatted-time', className)}>
      <span
        className={classNames(
          'formatted-time__hours',
          addChildClassName(className, 'hours')
        )}
      >
        {hours}
      </span>
      <span
        className={classNames(
          'formatted-time__divider',
          addChildClassName(className, 'divider')
        )}
      >
        :
      </span>
      <span
        className={classNames(
          'formatted-time__minutes',
          addChildClassName(className, 'minutes')
        )}
      >
        {minutes}
      </span>
    </span>
  )
}

FormattedTime.propTypes = {
  date: PropTypes.instanceOf(Date)
}

export default FormattedTime
