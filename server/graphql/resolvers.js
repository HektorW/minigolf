const holeModel = require('../db/models/hole')
const matchModel = require('../db/models/match')
const playerModel = require('../db/models/player')
const playerMatchModel = require('../db/models/playerMatch')
const strokeModel = require('../db/models/stroke')

const log = (...args) => console.log('graphql.resolvers', ...args)

const findPlayer = (players, id) => players.find(player => player.id === id)

const getMatch = async (matchId, match = null, players = null) => {
  if (!match) {
    match = await matchModel.getMatch(matchId)
  }

  if (!players) {
    players = await playerModel.getAllPlayers()
  }

  const _findPlayer = findPlayer.bind(null, players)

  const matchPlayerIds = await playerMatchModel.getMatchPlayerIds(matchId)
  const matchPlayers = matchPlayerIds.map(_findPlayer)

  const matchHoles = (await holeModel.getMatchHoles(matchId)).map(
    async hole => {
      const holeId = hole.id
      const holeStrokes = await strokeModel.getHoleStrokes(holeId)

      return {
        ...hole,
        strokes: holeStrokes.map(stroke => ({
          id: stroke.id,
          player: _findPlayer(stroke.playerId),
          strokes: stroke.strokes
        }))
      }
    }
  )

  return {
    ...match,
    players: matchPlayers,
    holes: matchHoles
  }
}

module.exports = {
  Query: {
    players: () => playerModel.getAllPlayers(),

    matches: async () => {
      const players = await playerModel.getAllPlayers()
      const matches = await matchModel.getAllMatches()

      return Promise.all(
        matches.map(async match => getMatch(match.id, match, players))
      )
    }
  },

  Mutation: {
    addPlayer: async (_, { name, color }) => {
      log('creating new player', { name, color })

      const playerId = await playerModel.addPlayer(name, color)
      log('created new player', { name, playerId })

      return playerModel.getPlayer(playerId)
    },

    addMatch: async (_, { match: matchInput }) => {
      try {
        const { date, playerIds, holes } = matchInput
        log('creating new match', { date, playerIds, holes })

        const matchId = await matchModel.addMatch(date)
        log('created match', { matchId })

        const playerMatchIds = await Promise.all(
          playerIds.map(playerId =>
            playerMatchModel.addPlayerMatch(matchId, playerId)
          )
        )
        log('created player matches', { matchId, playerMatchIds })

        const holeIds = await Promise.all(
          holes.map(async hole => {
            const { number, strokes } = hole

            const holeId = await holeModel.addHole(matchId, number)

            const strokeIds = await Promise.all(
              strokes.map((strokesCount, playerIndex) => {
                const playerId = playerIds[playerIndex]
                return strokeModel.addStroke(holeId, playerId, strokesCount)
              })
            )
            log('created hole strokes', { matchId, holeId, strokeIds })

            return holeId
          })
        )
        log('created match holes', { matchId, holeIds })

        return getMatch(matchId)
      } catch (error) {
        log(error)
        throw error
      }
    }
  }
}
