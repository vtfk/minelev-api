const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { getMyStudents } = require('../lib/get-pifu-data')
const repackStudents = require('./repack-students')

const { DEMO, DEMO_USER } = require('../config')

const returnStudents = async (context, req) => {
  const user = DEMO ? DEMO_USER : req.token.upn

  context.log(['get-students', 'user', user])

  try {
    const students = await getMyStudents(user)
    context.log(['get-students', 'user', user, 'students', students.length])

    const repackedStudents = students.map(repackStudents)
    return getResponse(repackedStudents)
  } catch (error) {
    context.log.error(['get-students', 'user', user, 'err', error.message])

    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, returnStudents)
