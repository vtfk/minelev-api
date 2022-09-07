const brreg = require('brreg')
const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { logger } = require('@vtfk/logger')

const handleBrreg = async (context, req) => {
  const { query } = req.params
  const user = req.token.upn
  const options = {
    query
  }

  logger('info', ['handle-brreg', 'query', query, 'user', user])

  try {
    const data = await brreg(options)
    const results = [...data.enhetsregisteret.data.entries, ...data.underenheter.data.entries]
    logger('info', ['handle-brreg', 'query', query, 'user', user, 'result', results.length])
    return getResponse(results)
  } catch (error) {
    logger('error', ['handle-brreg', 'query', query, 'user', user, 'error', error.message])
    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleBrreg)
