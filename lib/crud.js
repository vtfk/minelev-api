const { ObjectId } = require('mongodb')
const mongo = require('./mongo')

function dataModificationsAdd (user) {
  const now = new Date().getTime()
  return {
    created: {
      timestamp: now,
      createdBy: user
    },
    modified: [
      {
        timestamp: now,
        modifiedBy: user
      }
    ]
  }
}

function dataModificationsEdit (user) {
  const now = new Date().getTime()
  return {
    $push: { modified: { timestamp: now, modifiedBy: user } }
  }
}

module.exports.add = async (collection, params = {}, body = {}, user) => {
  const modifications = dataModificationsAdd(user || params.user)
  if (params.user) delete params.user

  const payload = { ...modifications, ...body, ...params }

  const db = await mongo()
  const dbCollection = db.collection(collection)
  const result = await dbCollection.insertOne(payload)
  return result.ops[0]
}

module.exports.edit = async (collection, params = {}, body = {}, user) => {
  const { _id } = params
  const modifications = dataModificationsEdit(user || params.user)
  if (params.id) delete params.id
  if (params.user) delete params.user

  const payload = { $set: { ...body, ...params }, ...modifications }

  const db = await mongo()
  const dbCollection = db.collection(collection)
  return await dbCollection.updateOne({ _id: new ObjectId(_id) }, payload)
}

module.exports.get = async (collection, params) => {
  const db = await mongo()
  const dbCollection = db.collection(collection)
  const result = await dbCollection.find(params)
  return result.toArray()
}

module.exports.remove = async (collection, params) => {
  const db = await mongo()
  const dbCollection = db.collection(collection)
  const { _id } = params
  return await dbCollection.remove({ _id: new ObjectId(_id) }, { justOne: true })
}

module.exports.aggregate = async (collection, query) => {
  const db = await mongo()
  const dbCollection = db.collection(collection)
  return await dbCollection.aggregate(query).toArray()
}

module.exports.dataModificationsAdd = dataModificationsAdd
module.exports.dataModificationsEdit = dataModificationsEdit
