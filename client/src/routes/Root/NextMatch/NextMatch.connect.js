import { connect } from 'react-redux'
import NextMatch from './NextMatch'
import { getNextMatch } from '../../../modules/matches/matches.selectors'

const mapStateToProps = state => {
  const match = getNextMatch(state)

  if (!match) {
    return { match: null }
  }

  return {
    match,
    opposition: match.teamA.id === 102 ? match.teamB : match.teamA
  }
}

export default connect(mapStateToProps)(NextMatch)
