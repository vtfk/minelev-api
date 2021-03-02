const { logConfig, logger } = require('@vtfk/logger')
const getResponseObject = require('../lib/get-response-object')

module.exports = async function (context, req) {
  logConfig({ azure: { context } })
  logger('verbose', ['ping', req.headers.host])

  return getResponseObject({
    ping: 'pong',
    timestamp: new Date().getTime()
  })
}
