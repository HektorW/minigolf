const db = require('./postgres')
const holeModel = require('./models/hole')
const matchModel = require('./models/match')
const playerModel = require('./models/player')
const playerMatchModel = require('./models/playerMatch')
const strokeModel = require('./models/stroke')

module.exports = function setupDb() {
  return db
    .setup()
    .then(holeModel.setup)
    .then(matchModel.setup)
    .then(playerModel.setup)
    .then(playerMatchModel.setup)
    .then(strokeModel.setup)
    .then(() => console.log('Database and models setup'))
}
