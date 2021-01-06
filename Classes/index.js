const { logger } = require('@vtfk/logger')
const { getMyClasses, getClass, getClassStudents, getClassTeachers, getMyUser } = require('../lib/get-pifu-data')
const { getDocuments } = require('../Documents/handle-documents')
const { decode } = require('../lib/encode-uri-id')
const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const repackStudent = require('../lib/repack-student')
const repackTeacher = require('../lib/repack-teacher')
const repackGroup = require('../lib/repack-group')

const handleClasses = async (context, req) => {
  const { id: rawId, action } = req.params
  const { type } = req.query
  const { method } = req
  const id = rawId ? decode(rawId) : null
  const user = req.token.upn

  try {
    logger('info', ['handle-classes', 'user', user, 'get-classes'])
    const classes = await getMyClasses(user)
    logger('info', ['handle-classes', 'user', user, 'get-classes', 'classes', classes.length])

    // If an ID was specified, verify that the teacher has access to this class before proceeding
    if (id && classes.filter(group => group.id === id || group.groupId === id).length === 0) {
      throw new HTTPError(403, 'You don\'t have access to this class!', { id })
    }

    // GET: /classes
    if (method === 'GET' && !id && !action) {
      logger('info', ['handle-classes', 'get-classes', 'user', user, 'classes', classes.length])
      return getResponse(classes.map(repackGroup))
    }

    // GET: /classes/{id}
    if (method === 'GET' && id && !action) {
      logger('info', ['handle-classes', 'get-class', 'user', user, 'id', id])

      const group = await getClass(user, id)
      logger('info', ['handle-classes', 'get-class', 'user', user, 'id', id, 'classes', group.length])

      return getResponse(group.map(repackGroup))
    }

    // GET: /classes/{id}/students
    if (method === 'GET' && id && action === 'students') {
      logger('info', ['handle-classes', 'get-classes-students', 'user', user, 'id', id])

      const students = await getClassStudents(user, id)
      logger('info', ['handle-classes', 'get-classes-students', 'user', user, 'id', id, 'students', students.length])

      return getResponse(students.map(student => repackStudent(student, true)))
    }

    // GET: /classes/{id}/teachers
    if (method === 'GET' && id && action === 'teachers') {
      logger('info', ['handle-classes', 'get-classes-teachers', 'user', user, 'id', id])

      const teachers = await getClassTeachers(user, id)
      logger('info', ['handle-classes', 'get-classes-teachers', 'user', user, 'id', id, 'teachers', teachers.length])

      return getResponse(teachers.map(repackTeacher))
    }

    // GET: /classes/{id}/documents
    if (method === 'GET' && id && action === 'documents') {
      logger('info', ['handle-classes', 'get-classes-documents', 'user', user, 'id', id])

      logger('info', ['handle-classes', 'get-classes-documents', user, 'get-user'])
      const teacher = repackTeacher(await getMyUser(user))
      logger('info', ['handle-classes', 'get-classes-documents', user, 'get-user', teacher.username])

      const students = await getClassStudents(user, id)
      logger('info', ['handle-classes', 'get-classes-documents', 'user', user, 'id', id, 'students', students.length])

      let documents = await getDocuments(teacher, students, type)
      logger('info', ['handle-classes', 'get-classes-documents', 'user', user, 'id', id, 'documents', documents.length])

      // Only return warnings in the specified group if undervisningsgruppe
      const group = classes.filter(group => group.id === id || group.groupId === id)[0]
      if (['undervisningsgruppe'].includes(group.type)) {
        logger('info', ['handle-classes', 'get-classes-documents', user, 'filtering documents for undervisningsgruppe'])
        documents = documents.filter(document => {
          if ((document.type !== 'varsel' && document.variant !== 'fag') || !document.content.classes) return false

          const documentClasses = [...document.content.classes]
          const filteredClasses = documentClasses.filter(documentGroup => documentGroup.id.toLowerCase() === group.id.toLowerCase())
          return filteredClasses.length > 0 // No matching classes
        })
        logger('info', ['handle-classes', 'get-classes-documents', user, 'filtered documents', documents.length])
      }

      return getResponse(documents)
    }

    // No matching method found
    throw new HTTPError(404, 'Method not found', { method, id, action })
  } catch (error) {
    logger('error', ['handle-classes', 'user', user, 'id', id, 'err', error.message])

    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error).toJSON()
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleClasses)
