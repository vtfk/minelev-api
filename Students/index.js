const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { getMyStudents, getStudent, getStudentClasses } = require('../lib/get-pifu-data')
const repackStudent = require('../lib/repack-student')
const repackStudentGroups = require('../lib/repack-student-groups')

const handleStudents = async (context, req) => {
  const { id, action } = req.params
  const { method } = req
  const user = req.token.upn

  try {
    context.log(['handle-students', 'user', user, 'get-students'])
    const students = await getMyStudents(user)
    context.log(['handle-students', 'user', user, 'get-students', students.length, 'students'])

    // If an ID was specified, verify that the teacher has access to this student before proceeding
    if (id && students.filter(student => student.id === id || student.userName === id).length === 0) {
      throw new HTTPError(403, 'You don\'t have access to this student!', { id })
    }

    // GET: /students
    if (method === 'GET' && !id && !action) {
      context.log(['handle-students', 'get-students', 'user', user, 'students', students.length])
      return getResponse(students.map(student => repackStudent(student, true)))
    }

    // GET: /students/{id}
    if (method === 'GET' && id && !action) {
      context.log(['handle-students', 'get-student', 'user', user, 'id', id])

      const student = await getStudent(user, id)
      context.log(['handle-students', 'get-student', 'user', user, 'id', id, 'student', student.length])

      return getResponse(student.map(student => repackStudent(student, true))[0])
    }

    // GET: /students/{id}/classes
    if (method === 'GET' && id && action === 'classes') {
      context.log(['handle-students', 'get-student-classes', 'user', user, 'id', id])

      const classes = await getStudentClasses(user, id)
      context.log(['handle-students', 'get-student-classes', 'user', user, 'id', id, 'classes', classes.length])

      return getResponse(classes.map(repackStudentGroups))
    }

    // GET: /students/{id}/teachers
    if (method === 'GET' && id && action === 'teachers') {
      throw new HTTPError(501, 'Not implemented yet')
    }

    // GET: /students/{id}/documents
    if (method === 'GET' && id && action === 'documents') {
      throw new HTTPError(501, 'Not implemented yet')
    }

    // POST: /students/{id}/documents
    if (method === 'POST' && id && action === 'documents') {
      throw new HTTPError(501, 'Not implemented yet')
    }

    // No matching method found
    throw new HTTPError(404, 'Method not found', { method, id, action })
  } catch (error) {
    context.log.error(['handle-students', 'user', user, 'id', id, 'err', error.message])

    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error).toJSON()
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleStudents)
