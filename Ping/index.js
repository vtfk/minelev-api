const { logConfig, logger } = require('@vtfk/logger')

module.exports = async function (context, req) {
  logConfig({ azure: { context }})
  logger('verbose', ['ping', req.headers.host])

  return {
    body: {
      ping: 'pong'
    }
  }
}
