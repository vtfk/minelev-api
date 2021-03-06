const { logger } = require('@vtfk/logger')
const { getStudentDocumentsQuery, getNewDocumentQuery } = require('./build-document-query')
const { get, add } = require('../lib/crud')
const config = require('../config')
const HTTPError = require('../lib/http-error')
const validateTeacherStudentRelation = require('../lib/validate-teacher-student-relation')
const validateDocumentSchema = require('../lib/validate-document-schema')

const collection = config.MONGODB_COLLECTION_DOCUMENTS

module.exports.getDocuments = async (teacher, students, type, id) => {
  const teacherUsername = teacher.username || teacher.userName
  if (!Array.isArray(students)) students = [students]

  logger('info', ['handle-documents', 'user', teacherUsername, 'get-documents', (students.length), 'students', 'build query'])
  const query = getStudentDocumentsQuery(students, type, id, teacher)

  logger('info', ['handle-documents', 'user', teacherUsername, 'get-documents', (students.length), 'students', 'get documents'])
  const documents = await get(collection, query)
  logger('info', ['handle-documents', 'user', teacherUsername, 'get-documents', (students.length), 'students', `got ${documents.length} documents`])

  return documents
}

module.exports.newDocument = async (teacher, student, body, preview = false) => {
  const teacherUsername = teacher.username || teacher.userName // support both repacked and not repacked objects
  const studentUsername = student ? (student.userName || student.username) : body.student.username

  // Verify that we got a body
  if (!body) throw new HTTPError(400, 'No body was provided!')

  // Append student to body if provided in query param and verify that the values match
  if (student && !body.student) body.student = { username: studentUsername }
  if (student && studentUsername !== body.student.username) throw new HTTPError(400, 'The student provided in query and body doesn\'t match!', { query: studentUsername, body: body.student.username })

  // Get the student from body if we don't have it already
  student = student || await validateTeacherStudentRelation(teacherUsername, body.student.username)

  // Validate that the posted data matches the schema
  const valid = validateDocumentSchema(body)
  logger('info', ['handle-documents', 'user', teacherUsername, 'new-document', 'schema validated', valid ? 'successful' : 'unsuccessful'])

  // Build document query
  logger('info', ['handle-documents', 'user', teacherUsername, 'new-document', 'build query'])
  const newDocumentQuery = getNewDocumentQuery({ user: teacherUsername, body, teacher, student })

  if (preview) {
    newDocumentQuery.preview = true
    logger('info', ['handle-documents', 'user', teacherUsername, 'new-document', 'returning preview query'])
    return newDocumentQuery
  }

  logger('info', ['handle-documents', 'user', teacherUsername, 'new-documents', 'create document'])
  const { _id, ...newDocument } = await add(collection, newDocumentQuery)
  logger('info', ['handle-documents', 'user', teacherUsername, 'new-documents', 'created document with _id', _id])

  return { _id, ...newDocument }
}
