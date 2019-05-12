const db = require('../index')
const createTable = require('./utils/createTable')
const { createModelCamelCaser } = require('./utils/camelCaseModel')
const match = require('./match')

const tableName = (exports.tableName = 'hole')

const tableColumnDefinitions = [
  'id SERIAL PRIMARY KEY',
  `matchId INTEGER REFERENCES "${match.tableName}"`,
  'number INTEGER'
]

const { camelCaseAll } = createModelCamelCaser(tableColumnDefinitions)

exports.setup = () => createTable(db, tableName, tableColumnDefinitions)

exports.addHole = (matchId, number) => {
  const columns = ['matchId', 'number']
  const values = [matchId, number]

  return db.insert(tableName, columns, values)
}

exports.getMatchHoles = matchId => {
  const query = `SELECT * from ${tableName} WHERE matchId = $1`
  const values = [matchId]
  return db.all(query, values).then(camelCaseAll)
}
