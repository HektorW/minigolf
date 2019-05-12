const db = require('../index')
const createTable = require('./utils/createTable')
const { createModelCamelCaser } = require('./utils/camelCaseModel')
const match = require('./match')
const player = require('./player')

const tableName = (exports.tableName = 'player_match')

const tableColumnDefinitions = [
  'id SERIAL PRIMARY KEY',
  `matchId INTEGER REFERENCES "${match.tableName}"`,
  `playerId INTEGER REFERENCES "${player.tableName}"`
]

const { camelCaseAll } = createModelCamelCaser(tableColumnDefinitions)

exports.setup = () => createTable(db, tableName, tableColumnDefinitions)

exports.addPlayerMatch = (matchId, playerId) => {
  const columns = ['matchId', 'playerId']
  const values = [matchId, playerId]

  return db.insert(tableName, columns, values)
}

exports.getMatchPlayerIds = matchId => {
  const query = `SELECT * from ${tableName} WHERE matchId = $1`
  const values = [matchId]
  return db
    .all(query, values)
    .then(camelCaseAll)
    .then(playerMatches =>
      playerMatches.map(playerMatch => playerMatch.playerId)
    )
}
