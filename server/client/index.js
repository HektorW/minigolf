const fs = require('fs')
const { promisify } = require('util')
const { join } = require('path')
const serve = require('koa-static')

const stat = promisify(fs.stat)

const shouldRedirectToDevServer = process.env.NODE_ENV === 'development'

function redirectToDevServer(ctx) {
  ctx.body = `
    <p>Client is not served in DEVELOPMENT mode</p>
    <p>Try <a href="http://localhost:4000">http://localhost:4000</a></p>
  `
}

const clientFolder = join(__dirname, '../../client/dist')

const serveClientFiles = serve(clientFolder)

const serveClient = async (ctx, next) => {
  await serveClientFiles(ctx, async () => {
    if (
      ctx.response.status === 404 &&
      ctx.method === 'GET' &&
      ctx.accepts('html') &&
      ctx.url.includes('.') !== true
    ) {
      const indexHtmlPath = join(clientFolder, 'index.html')
      const stats = await stat(indexHtmlPath)

      ctx.response.status = 200
      ctx.response.lastModified = stats.mtime
      ctx.response.length = stats.size
      ctx.response.type = 'html'

      ctx.body = fs.createReadStream(indexHtmlPath)
    } else {
      await next()
    }
  })
}

module.exports.createClientServeRoute = function createClientServeRoute() {
  if (shouldRedirectToDevServer) {
    console.log('create client')
    return redirectToDevServer
  } else {
    return serveClient
  }
}

// const { createReadStream } = require('fs')
// const { join } = require('path')
// const serve = require('koa-static')
// const Router = require('koa-router')

// const shouldRedirectToDevServer = process.env.NODE_ENV === 'development'

// module.exports.createClientServeRoute = function createClientServeRoute() {
//   if (shouldRedirectToDevServer) {
//     return (req, res) => res.redirect('http://localhost:4000')
//   }

//   const router = new Router()

//   const clientFolder = join(__dirname, '../../client/dist')

//   router.use(serve(clientFolder))
//   router.use((ctx, next) => {
//     if (
//       ctx.method === 'GET' &&
//       ctx.accepts('html') &&
//       ctx.url.includes('.') !== true
//     ) {
//       ctx.body = createReadStream(join(clientFolder, 'index.html'))
//     }

//     next()
//   })

//   return router
// }
