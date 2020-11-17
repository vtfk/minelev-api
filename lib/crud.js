const { ObjectId } = require('mongodb')
const mongo = require('./mongo')

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

module.exports.add = async (collection, params) => {
  const db = await mongo()
  const yff = db.collection(collection)
  const { user } = params
  const modifications = dataModificationsAdd(user)
  const payload = { ...modifications, ...params }
  return await yff.insertOne(payload)
}

module.exports.edit = async (collection, params) => {
  const db = await mongo()
  const yff = db.collection(collection)
  const { _id, user } = params
  const modifications = dataModificationsEdit(user)
  delete params.id
  const payload = { $set: { ...params }, ...modifications }
  return await yff.updateOne({ _id: ObjectId(_id) }, payload)
}

module.exports.get = async (collection, params) => {
  const db = await mongo()
  const yff = db.collection(collection)
  return await yff.find(params)
}

module.exports.remove = async (collection, params) => {
  const db = await mongo()
  const yff = db.collection(collection)
  const { _id } = params
  return await yff.remove({ _id: ObjectId(_id) }, { justOne: true })
}
