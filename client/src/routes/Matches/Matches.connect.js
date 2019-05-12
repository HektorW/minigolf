import { connect } from 'react-redux'
import Matches from './Matches'
import {
  getUpcomingMatches,
  getPlayedMatches,
  isFetchingMatches
} from '../../modules/matches/matches.selectors'

const mapStateToProps = state => ({
  isFetching: isFetchingMatches(state),
  upcomingMatches: getUpcomingMatches(state),
  playedMatches: getPlayedMatches(state)
})

export default connect(mapStateToProps)(Matches)
