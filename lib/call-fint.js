const axios = require('axios')
const { FINT_VFK, FINT_TFK, FINT } = require('../config')
const getFintToken = require('./fint-token')

/**
 * @param {string} payload - body of https request
 * @param {('VFK'|'TFK')} county - VFK or TFK
 * @returns {object} result of request
 */
const fintGraph = async (payload, county) => {
  if (!payload) throw new Error('Missing required parameter "payload"')
  if (!county || ['VFK', 'TFK'].includes(county)) throw new Error('Parameter "county" must be either "VFK" or "TFK"')
  const vfkConfig = {
    clientId: FINT_VFK.CLIENT_ID,
    clientSecret: FINT_VFK.CLIENT_SECRET,
    username: FINT_VFK.USERNAME,
    password: FINT_VFK.PASSWORD
  }
  const tfkConfig = {
    clientId: FINT_TFK.CLIENT_ID,
    clientSecret: FINT_TFK.CLIENT_SECRET,
    username: FINT_TFK.USERNAME,
    password: FINT_TFK.PASSWORD
  }
  let token
  if (county === 'VFK') {
    token = await getFintToken(vfkConfig)
  } else if (county === 'TFK') {
    token = await getFintToken(tfkConfig)
  }
  const { data } = await axios.post(`${FINT.URL}/graphql/graphql`, payload, { headers: { Authorization: `Bearer ${token}` } })
  if (data.errors && data.errors.length > 0) throw new Error(typeof data.errors === 'object' ? JSON.stringify(data.errors, null, 2) : data.errors.toString())
  return data
}

module.exports = { fintGraph, fintRest }
