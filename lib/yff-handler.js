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
const mongo = require('./mongo')
const config = require('../config')
const { maal, utplasseringer, tilbakemeldinger, maalmaler } = require('../mock/yff')

function dataModificationsAdd (user) {
  const now = new Date().getTime()
  return {
    created: {
      timeStamp: now,
      createdBy: user
    },
    modified: [
      {
        timeStamp: now,
        modifiedBy: user
      }
    ]
  }
}

// Kompetansemål

module.exports.addMaal = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { caller: user } = params
  const modifications = dataModificationsAdd(user)
  const payload = { ...modifications, ...params }
  return await yff.insertOne(payload)
}

exports.deleteMaal = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id } = params
  return await yff.remove({ _id }, { justOne: true })
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
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { caller: user } = params
  const modifications = dataModificationsAdd(user)
  const payload = { ...modifications, ...params }
  return await yff.insertOne(payload)
}

exports.deleteMal = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id } = params
  return await yff.remove({ _id }, { justOne: true })
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
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { caller: user } = params
  const modifications = dataModificationsAdd(user)
  const payload = { ...modifications, ...params }
  return await yff.insertOne(payload)
}

exports.deleteUtplassering = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id } = params
  return await yff.remove({ _id }, { justOne: true })
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
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { caller: user } = params
  const modifications = dataModificationsAdd(user)
  const payload = { ...modifications, ...params }
  return await yff.insertOne(payload)
}

exports.deleteTilbakemelding = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id } = params
  return await yff.remove({ _id }, { justOne: true })
}

exports.editTilbakemelding = async (params) => {
  // TODO: implementere koden
  return tilbakemeldinger
}

exports.getTilbakemeldinger = async (params) => {
  // TODO: implementere koden
  return tilbakemeldinger
}
