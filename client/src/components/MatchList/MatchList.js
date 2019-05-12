import React from 'react'
import PropTypes from 'prop-types'
import FormattedDate from '../FormattedDate'
import FormattedTime from '../FormattedTime/FormattedTime'
import './match-list.scss'

const MatchList = ({ matches }) => (
  <ul className="match-list">
    {matches.map(match => (
      <li key={match.id} className="match-list__match">
        <FormattedDate className="match-list__match-date" date={match.date} />
        <FormattedTime className="match-list__match-time" date={match.date} />

        <div className="match-list__match-teams">
          <div className="match-list__match-team-a">{match.teamA.name}</div>
          <span className="match-list__match-team-divider">-</span>
          <div className="match-list__match-team-b">{match.teamB.name}</div>
        </div>

        {match.result && (
          <div className="match-list__match-result">
            <span className="match-list__match-result-a">
              {match.result.teamAScore}
            </span>
            <span className="match-list__match-result-divider">-</span>
            <span className="match-list__match-result-b">
              {match.result.teamBScore}
            </span>
          </div>
        )}
      </li>
    ))}
  </ul>
)

MatchList.propTypes = {}

export default MatchList
