const axios = require('axios')
const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { logger } = require('@vtfk/logger')

const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 })

const { GREP_API_URL } = require('../config')

const handleGrep = async (context, req) => {
  const { kode } = req.params
  const user = req.token.upn
  const cacheKey = `grep-${kode}`

  logger('info', ['handle-grep', 'kode', `${kode || 'utdanningsprogrammer'}`, 'user', user])

  if (cache.has(cacheKey)) {
    logger('info', ['handle-grep', 'kode', `${kode || 'utdanningsprogrammer'}`, 'user', user, 'serving from cache'])
    return getResponse(cache.get(cacheKey))
  }

  try {
    const url = `${GREP_API_URL}/${kode || ''}`
    const { data: { data: results } } = await axios(url)
    logger('info', ['handle-grep', 'kode', `${kode || 'utdanningsprogrammer'}`, 'user', user], 'results', results.length)
    cache.set(cacheKey, results)
    return getResponse(results)
  } catch (error) {
    logger('error', ['handle-grep', 'kode', `${kode || 'utdanningsprogrammer'}`, 'user', user, 'error', error.message])
    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleGrep)
