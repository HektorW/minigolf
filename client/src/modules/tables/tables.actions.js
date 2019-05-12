import { get } from '../../api'
import { isFetching } from './tables.selectors'

export const FETCHING_TABLE_REQUEST = 'TABLES_FETCHING_TABLE_REQUEST'
export const FETCHING_TABLE_SUCCESS = 'TABLES_FETCHING_TABLE_SUCCESS'
export const FETCHING_TABLE_FAILURE = 'TABLES_FETCHING_TABLE_FAILURE'
export const TEAMS_UPDATED = 'TABLES_TEAMS_UPDATED'

export const fetchLeagueTable = leagueId => async (dispatch, getState) => {
  if (isFetching(getState())) return

  dispatch({ type: FETCHING_TABLE_REQUEST })

  let response
  try {
    const query = `
    {
      table(leagueId:${leagueId}) {
        rows {
          teamId
          position
          imageId
          name
          played
          won
          draw
          lost
          scored
          conceded
          goalDifference
          points
        }
      }
    }
    `

    response = await get(`/graphql?query=${query}`)
  } catch (error) {
    dispatch({ type: FETCHING_TABLE_FAILURE, error })
    return
  }

  dispatch({
    type: FETCHING_TABLE_SUCCESS,
    table: { ...response.data.table }
  })
}
