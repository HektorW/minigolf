const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaEtag = require('koa-etag')

const client = require('./client')
const graphqlServer = require('./graphql')

const app = new Koa()

app.use(async (ctx, next) => {
  console.log(`request: "${ctx.path}"`)
  await next()
  console.log(`reponse: ${ctx.status}`)
})

app.use(bodyParser())

graphqlServer.applyMiddleware({ app })

app.use(koaEtag())
app.use(client.createClientServeRoute())

module.exports = app
