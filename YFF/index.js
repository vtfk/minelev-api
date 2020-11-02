const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { add, edit, get, remove } = require('../lib/yff-handler')

function resolveAction (method) {
  switch (method) {
    case 'GET':
      return get
    case 'POST':
      return add
    case 'PUT':
      return edit
    case 'DELETE':
      return remove
  }
}

const handleYFF = async (context, req) => {
  const payload = req.params
  const { student, type, id } = payload
  const { method } = req
  const user = req.token.upn

  context.log(['handle-yff', 'method', method, 'student', student, 'user', user, 'type', type, 'id', `${id || 'alle'}`])

  try {
    const action = resolveAction(method)
    const result = action(payload)
    context.log(['handle-yff', 'method', method, 'student', student, 'user', user, 'type', type, 'id', `${id || 'alle'}`, 'result', result.length])
    return getResponse(result)
  } catch (error) {
    context.log.error(['handle-yff', 'method', method, 'student', student, 'user', user, 'id', `${id || 'alle'}`, 'err', error.message])
    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleYFF)