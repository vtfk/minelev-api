const { logger } = require('@vtfk/logger')
const { add, get } = require('../lib/crud')
const { getMyStudents } = require('../lib/get-pifu-data')
const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const buildDocument = require('./build-document')
const config = require('../config')

function resolveAction (method) {
  const collection = config.MONGODB_COLLECTION_DOCUMENTS
  switch (method) {
    case 'GET':
      return (params) => get(collection, params)
    case 'POST':
      return (params) => add(collection, params)
  }
}

const handleDocuments = async (context, req) => {
  const payload = req.params
  const { student, type, id } = payload
  const { method, token, body } = req
  const user = token.upn
  payload.user = user
  payload._id = id
  payload.method = method
  payload.body = body

  logger('info', ['handle-documents', 'method', method, 'student', student, 'user', user, 'type', type, 'id', `${id || 'alle'}`])

  try {
    // Retreive all students
    const students = await getMyStudents(user)
    // If a student was specified, verify that the teacher has access to this student before proceeding
    if (student && students.filter(s => s.userName === student).length === 0) {
      throw new HTTPError(403, 'You don\'t have access to this student!', { student })
    }

    const document = await buildDocument(payload)
    const action = resolveAction(method)
    const result = await action(document)
    logger('info', ['handle-documents', 'method', method, 'student', student, 'user', user, 'type', type, 'id', `${id || 'alle'}`, 'result', result.length])
    return getResponse(result)
  } catch (error) {
    context.log.error(['handle-documents', 'method', method, 'student', student, 'user', user, 'id', `${id || 'alle'}`, 'err', error.message])
    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleDocuments)
