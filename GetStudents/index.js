const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { getMyStudents, getStudent } = require('../lib/get-pifu-data')
const repackStudent = require('../lib/repack-student')

const handleStudents = async (context, req) => {
  const { id, action } = req.params
  const user = req.token.upn

  context.log(['handle-students', 'user', user])

  try {
    // GET: /students
    if (!id && !action) {
      context.log(['handle-students', 'get-students', 'user', user])

      const students = await getMyStudents(user)
      context.log(['handle-students', 'get-students', 'user', user, 'students', students.length])

      return getResponse(students.map(student => repackStudent(student, true)))
    }

    // GET: /students/{id}
    if (id && !action) {
      context.log(['handle-students', 'get-student', 'user', user, 'id', id])

      const student = await getStudent(user, id)
      context.log(['handle-students', 'get-student', 'user', user, 'id', id, 'student', student.length])

      return getResponse(student.map(repackStudent)[0])
    }

    // GET: /students/{id}/classes
    if (id && action === 'classes') {

    }
  } catch (error) {
    context.log.error(['handle-students', 'user', user, 'id', id, 'err', error.message])

    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleStudents)
