const { logConfig, logger } = require('@vtfk/logger')

module.exports = async function (context, req) {
  logConfig({ prefix: context.invocationId, localLogger: context.log })

  logger('info', ['ping', req.headers.host])

  return {
    body: {
      ping: 'pong'
    }
  }
}
