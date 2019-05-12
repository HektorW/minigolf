import { createSelector } from 'reselect'

const matchesState = state => state.matches

export const isFetchingMatches = state =>
  matchesState(state).isFetching === true

export const getMatches = createSelector(
  matchesState,
  _matchesState => _matchesState.matches
)

export const getUpcomingMatches = createSelector(getMatches, matches =>
  matches.filter(match => !match.result)
)

export const getPlayedMatches = createSelector(getMatches, matches =>
  matches.filter(match => Boolean(match.result))
)

export const getNextMatch = createSelector(getMatches, matches => {
  const now = Date.now()
  return matches.find(match => match.date > now)
})
