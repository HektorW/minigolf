const db = require('../index')
const createTable = require('./utils/createTable')
const { createModelCamelCaser } = require('./utils/camelCaseModel')

const tableName = (exports.tableName = 'player')

const tableColumnDefinitions = [
  'id SERIAL PRIMARY KEY',
  'name TEXT',
  'color TEXT'
]

const { camelCaseAll, camelCaseModel } = createModelCamelCaser(
  tableColumnDefinitions
)

exports.setup = () => createTable(db, tableName, tableColumnDefinitions)

exports.addPlayer = (name, color) => {
  const columns = ['name', 'color']
  const values = [name, color]

  return db.insert(tableName, columns, values)
}

exports.getAllPlayers = () => {
  const query = `SELECT * from ${tableName}`
  return db.all(query).then(camelCaseAll)
}

exports.getPlayer = async playerId => {
  const query = `SELECT * from ${tableName} WHERE id = $1`
  const values = [playerId]
  return db.get(query, values).then(camelCaseModel)
}
