const NodeCache = require('node-cache')
const axios = require('axios').default
const generateSystemJwt = require('./generate-system-jwt')
const config = require('../config')
const HTTPError = require('./http-error')
const cache = new NodeCache({ stdTTL: 600 })

const getData = async (caller, endpoint) => {
  const cacheKey = `${caller}-${endpoint}`
  const cachedData = cache.get(cacheKey)
  if (cachedData) {
    return cachedData
  } else {
    const pifuToken = generateSystemJwt(config.PIFU_API_JWT, caller)
    axios.defaults.headers.common.Authorization = `Bearer ${pifuToken}`
    const { data } = await axios.get(`${config.PIFU_API_URL}${endpoint}`)
    cache.set(cacheKey, data)
    return data
  }
}

exports.getMyStudents = async (caller) => {
  try {
    return await getData(caller, '/me/students')
  } catch (error) {
    const { status, data } = error.response
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}

exports.getStudent = async (caller, id) => {
  try {
    return await getData(caller, `/students/${id}`)
  } catch (error) {
    const { status, data } = error.response
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}

exports.getStudentClasses = async (caller, id) => {
  try {
    return await getData(caller, `/students/${id}/classes`)
  } catch (error) {
    const { status, data } = error.response
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}

exports.getStudentTeachers = async (caller, id) => {
  try {
    return await getData(caller, `/students/${id}/teachers`)
  } catch (error) {
    const { status, data } = error.response
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}
