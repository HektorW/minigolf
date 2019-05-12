import {
  FETCHING_TABLE_REQUEST,
  FETCHING_TABLE_SUCCESS,
  FETCHING_TABLE_FAILURE
} from './tables.actions'

const initialState = {
  isFetching: false,
  fetchError: null,
  tableRows: []
}

export default function tablesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_TABLE_REQUEST:
      return { ...state, isFetching: true, fetchError: null }

    case FETCHING_TABLE_SUCCESS:
      return { ...state, isFetching: false, tableRows: action.table.rows }

    case FETCHING_TABLE_FAILURE:
      return { ...state, isFetching: false, fetchError: action.error }

    default:
      return state
  }
}
