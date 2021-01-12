const withTokenAuth = require('../lib/with-token-auth')
const { logger } = require('@vtfk/logger')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { getTypeStats, getTotalStats, getSchoolStats } = require('./handle-document-stats')

const handleStats = async (context, req) => {
  const { type } = req.params
  const { method } = req
  const user = req.token.upn

  try {
    // GET: /stats
    if (method === 'GET' && !type) {
      logger('info', ['handle-stats', 'user', user, 'total'])
      const documentCount = await getTotalStats()
      logger('info', ['handle-stats', 'user', user, 'total', documentCount, 'documents'])

      return getResponse(documentCount, 200, true)
    }

    // GET: /stats/type
    if (method === 'GET' && type === 'type') {
      logger('info', ['handle-stats', 'user', user, 'type'])
      const documentCount = await getTypeStats()
      logger('info', ['handle-stats', 'user', user, 'type', documentCount.length, 'types'])

      return getResponse(documentCount, 200, true)
    }

    // GET: /stats/school
    if (method === 'GET' && type === 'school') {
      logger('info', ['handle-stats', 'user', user, 'school'])
      const documentCount = await getSchoolStats()
      logger('info', ['handle-stats', 'user', user, 'school', documentCount.length, 'schools'])

      return getResponse(documentCount, 200, true)
    }

    // No matching method found
    throw new HTTPError(404, 'Method not found', { method })
  } catch (error) {
    logger('error', ['handle-stats', 'user', user, 'err', error.message])

    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error).toJSON()
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleStats)
