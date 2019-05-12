import {
  FETCHING_MATCHES_REQUEST,
  FETCHING_MATCHES_SUCCESS,
  FETCHING_MATCHES_FAILURE
} from './matches.actions'

const initialState = {
  isFetching: false,
  fetchError: null,
  matches: []
}

export default function tablesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_MATCHES_REQUEST:
      return { ...state, isFetching: true, fetchError: null }

    case FETCHING_MATCHES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        matches: action.matches.map(match => ({
          ...match,
          date: new Date(match.date.replace(/ /, 'T'))
        }))
      }

    case FETCHING_MATCHES_FAILURE:
      return { ...state, isFetching: false, fetchError: action.error }

    default:
      return state
  }
}
