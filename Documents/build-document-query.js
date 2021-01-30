const { logger } = require('@vtfk/logger')
const { encryptContent } = require('@vtfk/encryption')
const { ObjectId } = require('mongodb')
const { dataModificationsAdd } = require('../lib/crud')
const repackDocumentSchool = require('../lib/repack-document-school')
const repackDocumentStudent = require('../lib/repack-document-student')
const repackDocumentTeacher = require('../lib/repack-document-teacher')
const config = require('../config')

module.exports.getStudentDocumentsQuery = (students, type, id, teacher) => {
  let query = { $or: [] }

  const contactStudents = students.filter(student => student.isContactTeacher || student.contactTeacher).map(student => student.username || student.userName)
  const courseStudents = students.filter(student => !(student.isContactTeacher || student.contactTeacher)).map(student => student.username || student.userName)

  if (contactStudents.length > 0) query.$or.push({ 'student.username': { $in: contactStudents } })
  if (courseStudents.length > 0) query.$or.push({ 'student.username': { $in: courseStudents }, type: 'varsel', variant: 'fag', 'content.classes.id': { $in: teacher.groupIds } })

  if (id || type) {
    query = { $and: [query] }
    if (id) query.$and.push({ _id: new ObjectId(id) })
    if (type) query.$and.push({ type })
  }

  return query
}

module.exports.getNewDocumentQuery = ({ user, body, student, teacher }) => {
  const query = { ...dataModificationsAdd(user), ...body }

  query.student = repackDocumentStudent(student)
  query.teacher = repackDocumentTeacher(teacher)
  query.school = repackDocumentSchool(student)
  query.isEncrypted = body.isEncrypted || false

  // TODO: Append additional content data for YFF

  // Encrypt content if type should be encrypted and it isn't already
  if (!query.isEncrypted && config.ENCRYPTED_DOCUMENT_TYPES.includes(query.type)) {
    logger('verbose', ['new-document-query', 'type', query.type, 'content of this type should be encypted'])
    query.content = encryptContent(query.content, config.ENCRYPTION_KEY)
    query.isEncrypted = true
  }

  // Queue and add status array with initial queued status
  query.status = [{ status: 'queued', timestamp: new Date().getTime() }]
  query.isQueued = true

  // User is used to set created + last modified date, but is removed before insertion
  query.user = teacher.username || user

  return query
}
