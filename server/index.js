const express = require('express')
// const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
// expressWs 사용
const expressWs = require('express-ws')

const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// WebSocket 용 엔드포인트 추가
expressWs(app)
app.ws('/ws', function(ws, req) {
  ws.on('message', function(msg) {
    console.log('from server :' + msg)
    ws.send('답장!')
  })
})

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on ' + host + ":" + port)
  // consola.ready({
  //   message: `Server listening on http://${host}:${port}`,
  //   badge: true
  // })
}
start()
