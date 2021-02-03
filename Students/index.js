const withTokenAuth = require('../lib/with-token-auth')
const { getMyStudents, getStudent, getStudentClasses, getStudentTeachers, getMyUser } = require('../lib/get-pifu-data')
const { logger } = require('@vtfk/logger')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const repackStudent = require('../lib/repack-student')
const repackGroup = require('../lib/repack-group')
const repackTeacher = require('../lib/repack-teacher')
const repackDocument = require('../lib/repack-document')
const { getDocuments, newDocument } = require('../Documents/handle-documents')

const handleStudents = async (context, req) => {
  const { id, action } = req.params
  const { type } = req.query
  const { method, body } = req
  const user = req.token.upn

  try {
    logger('info', ['handle-students', 'user', user, 'get-students'])
    const students = await getMyStudents(user)
    if (students === false) {
      logger('info', ['handle-students', 'user', user, 'get-students', 'teacher not found'])
      return getResponse([])
    }

    logger('info', ['handle-students', 'user', user, 'get-students', students.length, 'students'])

    // If an ID was specified, verify that the teacher has access to this student before proceeding
    if (id && students.filter(student => student.id === id || student.userName === id).length === 0) {
      throw new HTTPError(403, 'You don\'t have access to this student!', { id })
    }

    // GET: /students
    if (method === 'GET' && !id && !action) {
      logger('info', ['handle-students', 'get-students', 'user', user, 'students', students.length])
      return getResponse(students.map(student => repackStudent(student, true)))
    }

    // Get student
    logger('info', ['handle-students', 'user', user, 'get-student', 'id', id])
    const studentObj = await getStudent(user, id)
    const student = repackStudent(studentObj[0])

    // GET: /students/{id}
    if (method === 'GET' && id && !action) {
      logger('info', ['handle-students', 'get-student', 'user', user, 'id', id, 'student', studentObj.length])
      return getResponse(student)
    }

    // GET: /students/{id}/classes
    if (method === 'GET' && id && action === 'classes') {
      logger('info', ['handle-students', 'get-student-classes', 'user', user, 'id', id])

      const classes = await getStudentClasses(user, id)
      logger('info', ['handle-students', 'get-student-classes', 'user', user, 'id', id, 'classes', classes.length])

      return getResponse(classes.map(repackGroup))
    }

    // GET: /students/{id}/teachers
    if (method === 'GET' && id && action === 'teachers') {
      logger('info', ['handle-students', 'get-student-teachers', 'user', user, 'id', id])

      const teachers = await getStudentTeachers(user, id)
      logger('info', ['handle-students', 'get-student-teachers', 'user', user, 'id', id, 'teachers', teachers.length])

      return getResponse(teachers.map(repackTeacher))
    }

    // Get current user
    logger('info', ['handle-students', 'user', user, 'get-user'])
    const teacher = await getMyUser(user)
    logger('info', ['handle-students', 'user', user, 'get-user'])

    // GET: /students/{id}/documents/{type?}
    if (method === 'GET' && id && action === 'documents') {
      logger('info', ['handle-students', 'get-student-documents', 'user', user, 'id', id, 'type', (type || 'all')])

      const documents = await getDocuments(teacher, student, type)
      logger('info', ['handle-students', 'get-student-documents', 'user', user, 'id', id, 'documents', documents.length])

      return getResponse(documents)
    }

    // POST: /students/{id}/documents
    if (method === 'POST' && id && action === 'documents') {
      logger('info', ['handle-students', 'user', user, 'new-document'])
      const document = await newDocument(teacher, studentObj[0], body)
      logger('info', ['handle-students', 'user', user, 'new-document', 'document created', document._id])

      return getResponse(repackDocument(document))
    }

    // No matching method found
    throw new HTTPError(404, 'Method not found', { method, id, action })
  } catch (error) {
    const level = error.message && error.message.includes('access to this') ? 'warn' : 'error'
    logger(level, ['handle-students', 'user', user, 'id', (id || 'all'), 'err', error.message])

    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error).toJSON()
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleStudents)
