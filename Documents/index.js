const { logger } = require('@vtfk/logger')
const { getDocuments, newDocument } = require('./handle-documents')
const { getMyStudents, getMyUser } = require('../lib/get-pifu-data')
const { getPreview } = require('../lib/get-preview')
const withTokenAuth = require('../lib/with-token-auth')
const getResponse = require('../lib/get-response-object')
const HTTPError = require('../lib/http-error')
const repackDocument = require('../lib/repack-document')

const handleDocuments = async (context, req) => {
  const { id } = req.params
  const { type, language } = req.query
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

      return getResponse(documents.map(repackDocument))
    }

    // POST: /documents
    if (method === 'POST' && !id) {
      logger('info', ['handle-documents', 'user', user, 'new-document'])
      const document = await newDocument(teacherObj, null, body)
      logger('info', ['handle-documents', 'user', user, 'new-document', 'document created', document._id])

      return getResponse(repackDocument(document))
    }

    // POST: /documents/preview
    if (method === 'POST' && id.toLowerCase() === 'preview') {
      logger('info', ['handle-documents', 'user', user, 'get-preview'])

      const previewDocument = await newDocument(teacherObj, null, body, true)
      logger('info', ['handle-documents', 'user', user, 'get-preview', 'preview document created'])

      const preview = await getPreview(previewDocument, language || 'nb')
      logger('info', ['handle-documents', 'user', user, 'get-preview', 'pdf preview created'])

      return getResponse(preview)
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
