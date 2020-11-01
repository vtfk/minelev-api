const mongo = require('./mongo')
const config = require('../config')

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

function dataModificationsEdit (user) {
  const now = new Date().getTime()
  return {
    $push: { modified: { timeStamp: now, modifiedBy: user } }
  }
}

// Kompetansemål

module.exports.addMaal = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { user } = params
  const modifications = dataModificationsAdd(user)
  const payload = { ...modifications, ...params }
  return await yff.insertOne(payload)
}

module.exports.deleteMaal = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id } = params
  return await yff.remove({ _id }, { justOne: true })
}

module.exports.editMaal = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id, user } = params
  const modifications = dataModificationsEdit(user)
  const payload = { $set: { ...params }, ...modifications }
  return await yff.updateOne({ _id }, payload)
}

module.exports.getMaal = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  return await yff.find(params)
}

// Målmaler - samlinger av kompetansemål som skal kunne kopieres ut

module.exports.addMal = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { user } = params
  const modifications = dataModificationsAdd(user)
  const payload = { ...modifications, ...params }
  return await yff.insertOne(payload)
}

module.exports.deleteMal = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id } = params
  return await yff.remove({ _id }, { justOne: true })
}

module.exports.editMal = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id, user } = params
  const modifications = dataModificationsEdit(user)
  const payload = { $set: { ...params }, ...modifications }
  return await yff.updateOne({ _id }, payload)
}

module.exports.getMaler = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  return await yff.find(params)
}

// Utplasseringer - kan være bedrift | skole | ub

module.exports.addUtplassering = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { user } = params
  const modifications = dataModificationsAdd(user)
  const payload = { ...modifications, ...params }
  return await yff.insertOne(payload)
}

module.module.exports.deleteUtplassering = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id } = params
  return await yff.remove({ _id }, { justOne: true })
}

module.exports.editUtplassering = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id, user } = params
  const modifications = dataModificationsEdit(user)
  const payload = { $set: { ...params }, ...modifications }
  return await yff.updateOne({ _id }, payload)
}

module.exports.getUtplasseringer = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  return await yff.find(params)
}

// Tilbakemelding - er koblet til utplassering

module.exports.addTilbakemelding = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { user } = params
  const modifications = dataModificationsAdd(user)
  const payload = { ...modifications, ...params }
  return await yff.insertOne(payload)
}

module.exports.deleteTilbakemelding = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id } = params
  return await yff.remove({ _id }, { justOne: true })
}

module.exports.editTilbakemelding = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id, user } = params
  const modifications = dataModificationsEdit(user)
  const payload = { $set: { ...params }, ...modifications }
  return await yff.updateOne({ _id }, payload)
}

module.exports.getTilbakemeldinger = async (params) => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  return await yff.find(params)
}
