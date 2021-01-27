const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { add, edit, get, remove } = require('../lib/crud')
const { getMyStudents } = require('../lib/get-pifu-data')
const { logger } = require('@vtfk/logger')
const config = require('../config')

function resolveAction (method) {
  const collection = config.MONGODB_COLLECTION_YFF
  switch (method) {
    case 'GET':
      return (params) => get(collection, params)
    case 'POST':
      return (params, body) => add(collection, params, body)
    case 'PUT':
      return (params, body) => edit(collection, params, body)
    case 'DELETE':
      return (params) => remove(collection, params)
  }
}

const handleYFF = async (context, req) => {
  const payload = req.params
  const { student, type, id } = payload
  const { method, body } = req
  const user = req.token.upn
  payload.user = user
  payload._id = id

  logger('info', ['handle-yff', 'method', method, 'student', student, 'user', user, 'type', type, 'id', `${id || 'alle'}`])

  try {
    // Retreive all students
    const isMe = student === user
    if (!isMe) {
      const students = await getMyStudents(user)
      // If an ID was specified, verify that the teacher has access to this student before proceeding
      if (student && students.filter(s => s.userName === student).length === 0) {
        throw new HTTPError(403, 'You don\'t have access to this student!', { student })
      }
    }

    delete payload.id
    const action = resolveAction(method)
    const result = await action(payload, body)

    logger('info', ['handle-yff', 'method', method, 'student', student, 'user', user, 'type', type, 'id', `${id || 'alle'}`, 'result', result.length])
    return getResponse(result)
  } catch (error) {
    logger('error', ['handle-yff', 'method', method, 'student', student, 'user', user, 'id', `${id || 'alle'}`, 'err', error.message])
    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleYFF)
