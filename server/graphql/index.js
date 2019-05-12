const { ApolloServer, gql } = require('apollo-server-koa')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})

module.exports = apolloServer
