const { ObjectId } = require('mongodb')
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

module.exports.add = async params => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { user } = params
  const modifications = dataModificationsAdd(user)
  const payload = { ...modifications, ...params }
  return await yff.insertOne(payload)
}

module.exports.edit = async params => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF) // TODO: kunne switche collection utfra type
  const { _id, user } = params
  const modifications = dataModificationsEdit(user)
  delete params.id
  const payload = { $set: { ...params }, ...modifications }
  return await yff.updateOne({ _id: ObjectId(_id) }, payload)
}

module.exports.get = async params => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  return await yff.find(params)
}

module.exports.remove = async params => {
  const db = await mongo()
  const yff = db.collection(config.MONGODB_COLLECTION_YFF)
  const { _id } = params
  return await yff.remove({ _id: ObjectId(_id) }, { justOne: true })
}
