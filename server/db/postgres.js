const { Pool } = require('pg')
const { parse } = require('url')
const { databaseSsl, databaseUrl } = require('../../config')

let pool

exports.setup = () => {
  const { hostname: host, port, auth, pathname } = parse(databaseUrl)
  const [user, password] = auth.split(':')
  const [, database] = pathname.split('/')

  const config = {
    user,
    password,
    host,
    port,
    database,
    ssl: databaseSsl,
    max: 10
  }

  pool = new Pool(config)

  pool.on('error', error => {
    console.error('PostgreSQL pool error', error)
  })

  return Promise.resolve()
}

exports.run = async (query, values) => {
  try {
    const result = await pool.query(query, values)
    return result
  } catch (error) {
    console.error(error)
  }
}

exports.get = (query, values) =>
  pool.query(query, values).then(({ rows }) => rows[0])

exports.all = (query, values) =>
  pool.query(query, values).then(({ rows }) => rows)

exports.insert = (tableName, columns, values) => {
  const queryColumns = columns
    .map(column => `"${column.toLowerCase()}"`)
    .join(', ')

  let defaultCount = 0
  const queryValues = columns
    .slice()
    .map((_, index) => {
      const value = values[index]

      const isDefault = String(value).toLowerCase() === 'default'
      if (isDefault) {
        defaultCount += 1
        values.splice(index, 1)
        return 'DEFAULT'
      }

      return `$${index - defaultCount + 1}`
    })
    .join(', ')

  const query = `INSERT INTO "${tableName}" (${queryColumns}) VALUES (${queryValues}) RETURNING id`

  return pool.query(query, values).then(({ rows }) => rows[0].id)
}
