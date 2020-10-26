const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { getStudent } = require('../lib/get-pifu-data')
const repackStudent = require('./repack-student')

const { DEMO, DEMO_USER } = require('../config')

const returnStudent = async (context, req) => {
  const user = DEMO ? DEMO_USER : req.token.upn
  const { id } = req.params

  context.log(['get-student', 'user', user, 'id', id])

  try {
    const student = await getStudent(user, id)
    context.log(['get-student', 'user', user, 'id', id, 'student', student.length])

    const repackedStudent = student.map(repackStudent)
    return getResponse(repackedStudent[0])
  } catch (error) {
    context.log.error(['get-student', 'user', user, 'id', id, 'err', error.message])

    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, returnStudent)
