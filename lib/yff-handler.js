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

const { maal, utplasseringer, tilbakemeldinger, maalmaler } = require('../mock/yff')

// Kompetansemål

exports.addMaal = async (params) => {
  // TODO: implementere koden
  return maal
}

exports.deleteMaal = async (params) => {
  // TODO: implementere koden
  return maal
}

exports.editMaal = async (params) => {
  // TODO: implementere koden
  return maal
}

exports.getMaal = async (params) => {
  // TODO: implementere koden
  return maal
}

// Målmaler - samlinger av kompetansemål som skal kunne kopieres ut

exports.addMal = async (params) => {
  // TODO: implementere koden
  return maalmaler
}

exports.deleteMal = async (params) => {
  // TODO: implementere koden
  return maalmaler
}

exports.editMal = async (params) => {
  // TODO: implementere koden
  return maalmaler
}

exports.getMaler = async (params) => {
  // TODO: implementere koden
  return maalmaler
}

// Utplasseringer - kan være bedrift | skole | ub

exports.addUtplassering = async (params) => {
  // TODO: implementere koden
  return utplasseringer
}

exports.deleteUtplassering = async (params) => {
  // TODO: implementere koden
  return utplasseringer
}

exports.editUtplassering = async (params) => {
  // TODO: implementere koden
  return utplasseringer
}

exports.getUtplasseringer = async (params) => {
  // TODO: implementere koden
  return utplasseringer
}

// Tilbakemelding - er koblet til utplassering

exports.addTilbakemelding = async (params) => {
  // TODO: implementere koden
  return tilbakemeldinger
}

exports.deleteTilbakemelding = async (params) => {
  // TODO: implementere koden
  return tilbakemeldinger
}

exports.editTilbakemelding = async (params) => {
  // TODO: implementere koden
  return tilbakemeldinger
}

exports.getTilbakemeldinger = async (params) => {
  // TODO: implementere koden
  return tilbakemeldinger
}