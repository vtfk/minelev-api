const { verify } = require('azure-jwt-verify')
const { TOKEN_AUTH } = require('../config')
const HTTPError = require('./http-error')

module.exports = async (context, request, next) => {
  const bearerToken = request.headers.authorization
  if (!bearerToken) {
    context.log.warn(['with-token-auth', 'no-authorization-header'])
    return new HTTPError(400, 'Authorization header is missing').toJSON()
  }

  try {
    const token = bearerToken.replace('Bearer ', '')
    const validatedToken = await verify(token, TOKEN_AUTH)
    request.token = validatedToken

    return next(context, request)
  } catch (error) {
    context.log.error(['with-token-auth', 'invalid-token', error])
    return new HTTPError(401, 'Authorization token is invalid').toJSON()
  }
}
