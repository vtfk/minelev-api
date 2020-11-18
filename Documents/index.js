const { logger } = require('@vtfk/logger')
const { add, get } = require('../lib/crud')
const { getMyStudents, getMyUser } = require('../lib/get-pifu-data')
const { getStudentDocumentsQuery, getNewDocumentQuery } = require('./build-document-query')
const withTokenAuth = require('../lib/with-token-auth')
const getResponse = require('../lib/get-response-object')
const HTTPError = require('../lib/http-error')
const validateTeacherStudentRelation = require('../lib/validate-teacher-student-relation')
const validateDocumentSchema = require('../lib/validate-document-schema')
const config = require('../config')

const collection = config.MONGODB_COLLECTION_DOCUMENTS

const handleDocuments = async (context, req) => {
  const { student, type, id } = req.params
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

    // Get student and verify relation before continuing
    const studentObj = student ? await validateTeacherStudentRelation(user, student, students) : null
    logger('info', ['handle-documents', 'user', user, 'student', studentObj ? 'student related to teacher' : 'no specific student, returning documents for all'])

    // GET: /documents/?student/?type/?id
    if (method === 'GET') {
      logger('info', ['handle-documents', 'user', user, 'get-documents', 'build query'])
      const query = getStudentDocumentsQuery(studentObj ? [studentObj] : students, type, id)

      logger('info', ['handle-documents', 'user', user, 'get-documents', 'get documents'])
      const documents = await get(collection, query)
      logger('info', ['handle-documents', 'user', user, 'get-documents', `got ${documents.length} documents`])

      return getResponse(documents)
    }

    // POST: /documents/?student
    if (method === 'POST') {
      logger('info', ['handle-documents', 'user', user, 'new-document'])

      // Verify that we got a body
      if (!body) throw new HTTPError(400, 'No body was provided!', { method, student, type, id })

      // Append student to body if provided in query param and verify that the values match
      if (student && !body.student) body.student = { username: student }
      if (student && student !== body.student.username) throw new HTTPError(400, 'The student provided in query and body doesn\'t match!', { query: student, body: body.student.username })

      // Get the student from body if we don't have it already
      const bodyStudentObj = studentObj || await validateTeacherStudentRelation(user, body.student.username, students)

      // Validate that the posted data matches the schema
      const valid = validateDocumentSchema(body)
      logger('info', ['handle-documents', 'user', user, 'new-document', 'schema validated', valid ? 'successful' : 'unsuccessful'])

      // Build document query
      logger('info', ['handle-documents', 'user', user, 'new-document', 'build query'])
      const newDocumentQuery = getNewDocumentQuery({ user, body, teacher: teacherObj, student: bodyStudentObj })

      logger('info', ['handle-documents', 'user', user, 'new-documents', 'create document'])
      const newDocument = await add(collection, newDocumentQuery)
      logger('info', ['handle-documents', 'user', user, 'new-documents', 'created document with _id', newDocument._id])

      return getResponse(newDocument)
    }

    // If some other method from this point, return an error as this shouldn't happen
    if (method !== 'POST') throw new HTTPError(405, `Method ${method} is not allowed for this endpoint!`)
  } catch (error) {
    logger('error', ['handle-documents', 'method', method, 'user', user, 'student', `${student || 'alle'}`, 'type', `${type || 'alle'}`, 'id', `${id || 'alle'}`, 'err', error.message])
    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleDocuments)
