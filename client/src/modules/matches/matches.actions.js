import { get } from '../../api'

export const FETCHING_MATCHES_REQUEST = 'TABLES_FETCHING_MATCHES_REQUEST'
export const FETCHING_MATCHES_SUCCESS = 'TABLES_FETCHING_MATCHES_SUCCESS'
export const FETCHING_MATCHES_FAILURE = 'TABLES_FETCHING_MATCHES_FAILURE'

export const fetchMatches = (leagueId, teamId = null) => async dispatch => {
  dispatch({ type: FETCHING_MATCHES_REQUEST })

  let response
  try {
    const query = `
    {
      teamMatches(leagueId: ${leagueId}${teamId ? ', teamId: ' + teamId : ''}) {
        id
        date
        teamA {
          id
          name
        }
        teamB {
          id
          name
        }
        result {
          teamAScore
          teamBScore
        }
      }
    }
    `

    response = await get(`/graphql?query=${query}`)
  } catch (error) {
    dispatch({ type: FETCHING_MATCHES_FAILURE, error })
    return
  }

  dispatch({
    type: FETCHING_MATCHES_SUCCESS,
    matches: response.data.teamMatches
  })
}
