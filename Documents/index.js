const { logger } = require('@vtfk/logger')
const { getMyStudents, getMyUser } = require('../lib/get-pifu-data')
const withTokenAuth = require('../lib/with-token-auth')
const getResponse = require('../lib/get-response-object')
const HTTPError = require('../lib/http-error')
const { getDocuments, newDocument } = require('./handle-documents')

const handleDocuments = async (context, req) => {
  const { id } = req.params
  const { type } = req.query
  const { method, token, body } = req
  const user = token.upn

  try {
    // Get current user
    logger('info', ['handle-documents', 'user', user, 'get-user'])
    const teacherObj = await getMyUser(user)
    logger('info', ['handle-documents', 'user', user, 'get-user', 'type', teacherObj.type])

    // Retreive all students
    logger('info', ['handle-documents', 'user', user, 'get-students'])
    const students = await getMyStudents(user)
    logger('info', ['handle-documents', 'user', user, 'get-students', students.length, 'students'])

    // GET: /documents/?id
    if (method === 'GET') {
      logger('info', ['handle-documents', 'user', user, 'get-documents'])
      const documents = await getDocuments(teacherObj, students, type, id)
      logger('info', ['handle-documents', 'user', user, 'get-documents', documents.length, 'documents'])

      return getResponse(documents)
    }

    // POST: /documents
    if (method === 'POST' && !id) {
      logger('info', ['handle-documents', 'user', user, 'new-document'])
      const document = await newDocument(teacherObj, null, body)
      logger('info', ['handle-documents', 'user', user, 'new-document', 'document created', document._id])

      return getResponse(document)
    }

    // If some other method from this point, return an error as this shouldn't happen
    if (method !== 'POST') throw new HTTPError(405, `Method ${method} is not allowed for this endpoint!`)
  } catch (error) {
    logger('error', ['handle-documents', 'method', method, 'user', user, 'id', `${id || 'alle'}`, 'err', error.message])
    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleDocuments)
