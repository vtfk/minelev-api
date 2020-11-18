const { logger } = require('@vtfk/logger')
const { ObjectId } = require('mongodb')
const { encryptContent } = require('../lib/encryption')
const HTTPError = require('../lib/http-error')
const repackDocumentSchool = require('../lib/repack-document-school')
const repackDocumentStudent = require('../lib/repack-document-student')
const repackDocumentTeacher = require('../lib/repack-document-teacher')
const config = require('../config')

module.exports.getStudentDocumentsQuery = (students, type, id) => {
  const query = {}

  const studentUsernames = students.map(student => student.username || student.userName) // repacked vs. not repacked students
  query['student.username'] = { $in: studentUsernames }

  // Only add types thats present
  if (type) query.type = type
  if (id) {
    try {
      query._id = new ObjectId(id)
    } catch (error) {
      throw new HTTPError(400, `The provided id is invalid: ${error.message}`)
    }
  }

  return query
}

module.exports.getNewDocumentQuery = ({ user, body, student, teacher }) => {
  const query = { ...body }

  query.user = user // User is used to set created + last modified date, but is removed before insertion
  query.student = repackDocumentStudent(student)
  query.teacher = repackDocumentTeacher(teacher)
  query.school = repackDocumentSchool(student)
  query.isEncrypted = body.isEncrypted || false

  // TODO: Append additional content data for YFF

  // Encrypt content if type should be encrypted and it isn't already
  if (!query.isEncrypted && config.ENCRYPTED_DOCUMENT_TYPES.includes(query.type)) {
    logger('verbose', ['new-document-query', 'type', query.type, 'content of this type should be encypted'])
    query.content = encryptContent(query.content)
    query.isEncrypted = true
  }

  // Queue and add status array with initial queued status
  query.status = [{ status: 'queued', timestamp: new Date().getTime() }]
  query.isQueued = true

  return query
}
