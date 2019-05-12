import compareTeamName from '../../utils/compareTeamName'

export const getTeamLeagueStats = (leagueTable, teamName) =>
  leagueTable.find(team => compareTeamName(team.name, teamName)) || null
