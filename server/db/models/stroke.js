const db = require('../index')
const createTable = require('./utils/createTable')
const { createModelCamelCaser } = require('./utils/camelCaseModel')
const hole = require('./hole')
const player = require('./player')

const tableName = (exports.tableName = 'stroke')

const tableColumnDefinitions = [
  'id SERIAL PRIMARY KEY',
  `holeId INTEGER REFERENCES "${hole.tableName}"`,
  `playerId INTEGER REFERENCES "${player.tableName}"`,
  'strokes INTEGER'
]

const { camelCaseAll } = createModelCamelCaser(tableColumnDefinitions)

exports.setup = () => createTable(db, tableName, tableColumnDefinitions)

exports.addStroke = (holeId, playerId, strokes) => {
  const columns = ['holeId', 'playerId', 'strokes']
  const values = [holeId, playerId, strokes]

  return db.insert(tableName, columns, values)
}

exports.getHoleStrokes = holeId => {
  const query = `SELECT * from ${tableName} WHERE holeId = $1`
  const values = [holeId]
  return db.all(query, values).then(camelCaseAll)
}
