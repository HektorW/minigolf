const { gql } = require('apollo-server-koa')

module.exports = gql`
  type Player {
    id: Int
    name: String
    color: String
  }

  type Match {
    id: Int
    date: String
    players: [Player]
    holes: [Hole]
  }

  type Hole {
    id: Int
    strokes: [Stroke]
  }

  type Stroke {
    id: Int
    player: Player
    strokes: Int
  }

  type Query {
    players: [Player]
    matches: [Match]
  }

  type Mutation {
    addPlayer(name: String!, color: String = ""): Player
    addMatch(match: MatchInput): Match
  }

  input MatchInput {
    date: String
    playerIds: [Int]!
    holes: [HoleInput]!
  }

  input HoleInput {
    number: Int!
    strokes: [Int]!
  }
`
