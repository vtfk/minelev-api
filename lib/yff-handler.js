/*
const axios = require('axios').default
const generateSystemJwt = require('./generate-system-jwt')
const config = require('../config')
const HTTPError = require('./http-error')

const getData = async (caller, endpoint) => {
  const yffToken = generateSystemJwt(config.PIFU_API_JWT, caller)
  axios.defaults.headers.common.Authorization = `Bearer ${yffToken}`
  const { data } = await axios.get(`${config.YFF_API_URL}${endpoint}`)
  return data
}

const postData = async (caller, endpoint, payload) => {
  const yffToken = generateSystemJwt(config.PIFU_API_JWT, caller)
  axios.defaults.headers.common.Authorization = `Bearer ${yffToken}`
  const { data } = await axios.post(`${config.YFF_API_URL}${endpoint}`, payload)
  return data
}

const putData = async (caller, endpoint, payload) => {
  const yffToken = generateSystemJwt(config.PIFU_API_JWT, caller)
  axios.defaults.headers.common.Authorization = `Bearer ${yffToken}`
  const { data } = await axios.put(`${config.YFF_API_URL}${endpoint}`, payload)
  return data
}
*/

exports.getMyYffs = async (caller) => {
  return [{
    id: '123'
  }]
}
