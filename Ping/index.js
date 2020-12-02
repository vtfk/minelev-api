const { logConfig, logger } = require('@vtfk/logger')

module.exports = async function (context, req) {
  logConfig({ azure: { context }, prefix: 'ping' })
  logger('info', req.headers.host)

  return {
    body: {
      ping: 'pong'
    }
  }
}
