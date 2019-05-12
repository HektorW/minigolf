const db = require('../index')
const createTable = require('./utils/createTable')
const { createModelCamelCaser } = require('./utils/camelCaseModel')

const tableName = (exports.tableName = 'match')

const tableColumnDefinitions = [
  'id SERIAL PRIMARY KEY',
  'date TIMESTAMP DEFAULT now()'
]

const { camelCaseAll, camelCaseModel } = createModelCamelCaser(
  tableColumnDefinitions
)

exports.setup = () => createTable(db, tableName, tableColumnDefinitions)

exports.addMatch = (date = null) => {
  if (!date) {
    date = 'DEFAULT'
  }

  const columns = ['date']
  const values = [date]

  return db.insert(tableName, columns, values)
}

exports.getAllMatches = async () => {
  const query = `SELECT * from "${tableName}"`
  return db.all(query).then(camelCaseAll)
}

exports.getMatch = async matchId => {
  const query = `SELECT * from "${tableName}" WHERE id = $1`
  const values = [matchId]
  return db.get(query, values).then(camelCaseModel)
}
