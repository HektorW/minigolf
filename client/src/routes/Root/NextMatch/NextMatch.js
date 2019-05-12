import React from 'react'
import Months from '../../../constants/Months'
import WeekDays from '../../../constants/WeekDays'
import Surface from '../../../components/Surface'
import './next-match.scss'

const NextMatch = ({ match, opposition }) =>
  !match ? null : (
    <Surface className="next-match">
      <h2 className="next-match__heading">Nästa match är mot:</h2>

      <div className="next-match__opposition">
        <div className="next-match__opposition-name">{opposition.name}</div>

        {opposition.position && (
          <div className="next-match__opposition-position">
            Som ligger {opposition.position}:a i ligan.
          </div>
        )}
      </div>

      <div className="next-match__date">
        <span className="next-match__date-day">
          {WeekDays[match.date.getDay()]}
        </span>
        <span className="next-match__date-date">{match.date.getDate()}</span>
        <span className="next-match__date-month">
          {Months[match.date.getMonth()]}
        </span>
      </div>
      <div className="next-match__time">
        <span className="next-match__time-hour">{match.date.getHours()}</span>
        :
        <span className="next-match__time-minutes">
          {match.date.getMinutes()}
        </span>
      </div>
    </Surface>
  )

export default NextMatch
