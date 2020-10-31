const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { getMyYffs } = require('../lib/yff-handler')

const handleYFF = async (context, req) => {
  const { student, type, id } = req.params
  const { method } = req
  const user = req.token.upn

  context.log(['handle-yff', 'student', student, 'user', user])

  try {
    // GET: /student
    if (method === 'GET' && !type && !id) {
      context.log(['handle-yff-for-student', 'get-yff-for-student', 'student', student, 'user', user])
      const yffs = await getMyYffs(student)
      context.log(['handle-yff-for-student', 'get-yff-for-student', 'student', student, 'user', user, 'yffs', yffs.length])

      return getResponse(yffs)
    }
  } catch (error) {
    context.log.error(['handle-students', 'user', user, 'id', id, 'err', error.message])
    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleYFF)
