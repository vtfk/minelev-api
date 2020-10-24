const axios = require('axios').default
const generateSystemJwt = require('./generate-system-jwt')
const config = require('../config')
const HTTPError = require('./http-error')

const getData = async (caller, endpoint) => {
  const pifuToken = generateSystemJwt(config.PIFU_API_JWT, caller)
  axios.defaults.headers.common.Authorization = `Bearer ${pifuToken}`

  const { data } = await axios.get(`${config.PIFU_API_URL}${endpoint}`)
  return data
}

exports.getStudents = async (caller) => {
  try {
    return await getData(caller, '/students')
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
