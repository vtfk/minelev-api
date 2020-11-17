const { logger } = require('@vtfk/logger')
const { ObjectId } = require('mongodb')
const { getMyUser, getMyStudents } = require('../lib/get-pifu-data')
const Ajv = require('ajv')
const config = require('../config')
const HTTPError = require('../lib/http-error')
const validateTeacherStudentRelation = require('../lib/validate-teacher-student-relation')
const repackDocumentStudent = require('../lib/repack-document-student')
const repackDocumentTeacher = require('../lib/repack-document-teacher')
const repackAjvError = require('../lib/repack-ajv-error')
const documentSchema = require('../models/document.json')
const repackDocumentSchool = require('../lib/repack-document-school')
const { encryptContent } = require('../lib/encryption')

const ajv = new Ajv({ allErrors: true, jsonPointers: true })
const validate = ajv.compile(documentSchema)

module.exports = async payload => {
  const { method, id, type, student, user, body } = payload
  const logPrefix = ['build-document', 'user', user, 'student', student || 'all', method]

  // Get document with specified student, id and/or type
  if (method === 'GET') {
    payload = {}
    if (type) payload.type = type
    if (id) {
      try {
        payload._id = new ObjectId(id)
      } catch (error) {
        throw new HTTPError(400, `The provided id is invalid: ${error.message}`)
      }
    }

    // Get specific student, or if no specific student was passed, get documents for all my students
    if (student) {
      const studentObj = await validateTeacherStudentRelation(user, student)
      payload['student.username'] = studentObj.userName
    } else {
      const myStudents = await getMyStudents(user)
      const myStudentsUsernames = myStudents.map(student => student.userName)
      payload['student.username'] = { $in: myStudentsUsernames }
    }

    logger('verbose', [...logPrefix, payload])
    return payload
  }

  // If some other method than POST from this point, return an error
  if (method !== 'POST') throw new HTTPError(405, `Method ${method} is not allowed for this endpoint!`)

  // Verify that we got a body
  if (!body) throw new HTTPError(400, 'No body was provided!', { method, student, type, id })

  // Append student to body if provided in query param and verify that the values match
  if (student && !body.student) body.student = { username: student }
  if (student && student !== body.student.username) throw new HTTPError(400, 'The student provided in query and body doesn\'t match!', { query: student, body: body.student.username })

  // Validate that the posted data matches the schema
  const valid = validate(body)
  if (!valid) {
    logger('warn', [...logPrefix, 'schema validation failed', validate.errors.map(repackAjvError)])
    throw new HTTPError(400, 'Invalid request body', { summary: validate.errors.map(repackAjvError), schemaErrors: validate.errors })
  }

  // Get current user / teacher thats making the request
  const teacherObj = await getMyUser(user)
  if (!teacherObj) {
    logger('error', [...logPrefix, 'no teacher found for current user'])
    throw new HTTPError(403, 'No teacher found', { user })
  }

  body.teacher = repackDocumentTeacher(teacherObj)
  body.user = body.teacher.username || teacherObj.userName

  // Make sure that the teacher have access to the student
  const studentObj = await validateTeacherStudentRelation(user, body.student.username)
  if (!studentObj) {
    logger('error', [...logPrefix, 'no student found'])
    throw new HTTPError(403, 'No student found', { student: body.student.username })
  }

  body.student = repackDocumentStudent(studentObj)

  // Get school from student props
  body.school = repackDocumentSchool(studentObj)

  body.isEncrypted = body.isEncrypted || false

  // Encrypt content if type should be encrypted and it isn't already
  if (!body.isEncrypted && config.ENCRYPTED_DOCUMENT_TYPES.includes(body.type)) {
    logger('info', '')
    body.content = encryptContent(body.content)
    body.isEncrypted = true
  }

  // Queue and add queued status
  body.isQueued = true
  body.status = [{ status: 'queued', timestamp: new Date().getTime() }]

  return body
}

/*
  if (method === 'POST' && type === 'yff-utplassering-bekreftelse') {
    // TODO: må hente info om elev og utplassering
    return payload
  }
  if (method === 'POST' && type === 'yff-lokal-laereplan') {
    // TODO: må hente info om elev, maal og utplasseringer
    return payload
  }
  if (method === 'POST' && type === 'yff-utplassering-tilbakemelding') {
    // TODO: må hente info om elev, utplassering, maal og tilbakemelding
    return payload
  }
  if (method === 'POST' && type === 'varsel') {
    // TODO: må hente info om elev
    return payload
  }
  if (method === 'POST' && type === 'notat') {
    // TODO: må hente info om elev
    return payload
  }
  if (method === 'POST' && type === 'samtale') {
    // TODO: må hente info om elev
    return payload
  }
*/
