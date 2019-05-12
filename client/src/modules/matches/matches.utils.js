import compareTeamName from '../../utils/compareTeamName'

export const getOppositionName = match =>
  compareTeamName(match.teamA.name, 'Partiet') ? match.teamB : match.teamA
