import React from 'react'
import PropTypes from 'prop-types'
import Months from '../../constants/Months'
import WeekDays from '../../constants/WeekDays'
import { classNames, addChildClassName } from '../../utils/classNames'
import './formatted-date.scss'

const FormattedDate = ({ date, className }) => {
  const weekDay = WeekDays[date.getDay()]
  const _date = date.getDate()
  const month = Months[date.getMonth()]

  return (
    <span className={classNames('formatted-date', className)}>
      <span
        className={classNames(
          'formatted-date__weekday',
          addChildClassName(className, 'weekday')
        )}
      >
        {weekDay}
      </span>
      <span
        className={classNames(
          'formatted-date__date',
          addChildClassName(className, 'date')
        )}
      >
        {_date}
      </span>
      <span
        className={classNames(
          'formatted-date__month',
          addChildClassName(className, 'month')
        )}
      >
        {month}
      </span>
    </span>
  )
}

FormattedDate.propTypes = {
  date: PropTypes.instanceOf(Date)
}

export default FormattedDate
