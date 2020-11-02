const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { getMyClasses, getClass, getClassStudents, getClassTeachers } = require('../lib/get-pifu-data')
const repackStudent = require('../lib/repack-student')
const repackTeacher = require('../lib/repack-teacher')
const repackGroup = require('../lib/repack-group')
const repackGroupWithMembers = require('../lib/repack-group-with-members')

const handleStudents = async (context, req) => {
  const { id: rawId, action } = req.params
  const { method } = req
  const id = rawId ? decodeURIComponent(rawId) : null
  const user = req.token.upn

  try {
    context.log(['handle-classes', 'user', user, 'get-classes'])
    const classes = await getMyClasses(user)
    context.log(['handle-classes', 'user', user, 'get-classes', 'classes', classes.length])

    // If an ID was specified, verify that the teacher has access to this class before proceeding
    if (id && classes.filter(group => group.id === id || group.groupId === id).length === 0) {
      throw new HTTPError(403, 'You don\'t have access to this class!', { id })
    }

    // GET: /classes
    if (method === 'GET' && !id && !action) {
      context.log(['handle-classes', 'get-classes', 'user', user, 'classes', classes.length])
      return getResponse(classes.map(repackGroup))
    }

    // GET: /classes/{id}
    if (method === 'GET' && id && !action) {
      context.log(['handle-classes', 'get-class', 'user', user, 'id', id])

      const classes = await getClass(user, id)
      context.log(['handle-classes', 'get-class', 'user', user, 'id', id, 'classes', classes.length])

      const repackedWithMembers = await Promise.all(classes.map(group => repackGroupWithMembers(group, user)))
      return getResponse(repackedWithMembers[0])
    }

    // GET: /classes/{id}/students
    if (method === 'GET' && id && action === 'students') {
      context.log(['handle-classes', 'get-classes-students', 'user', user, 'id', id])

      const students = await getClassStudents(user, id)
      context.log(['handle-classes', 'get-classes-students', 'user', user, 'id', id, 'students', students.length])

      return getResponse(students.map(student => repackStudent(student, true)))
    }

    // GET: /classes/{id}/teachers
    if (method === 'GET' && id && action === 'teachers') {
      context.log(['handle-classes', 'get-classes-teachers', 'user', user, 'id', id])

      const teachers = await getClassTeachers(user, id)
      context.log(['handle-classes', 'get-classes-teachers', 'user', user, 'id', id, 'teachers', teachers.length])

      return getResponse(teachers.map(repackTeacher))
    }

    // No matching method found
    throw new HTTPError(404, 'Method not found', { method, id, action })
  } catch (error) {
    context.log.error(['handle-classes', 'user', user, 'id', id, 'err', error.message])

    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error).toJSON()
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleStudents)
