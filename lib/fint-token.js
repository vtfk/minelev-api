const ClientOAuth2 = require('client-oauth2')
const { FINT } = require('../config')
const { logger } = require('@vtfk/logger')
const Cache = require('file-system-cache').default

const tokenCache = Cache({
  basePath: './.token-cache'
})

module.exports = async (authConfig, forceNew = false) => {
  const cacheKey = `fintToken-${authConfig.clientId}`

  const cachedToken = tokenCache.getSync(cacheKey)
  if (!forceNew && cachedToken) {
    logger('info', ['getFintToken', 'found valid token in cache, will use that instead of fetching new'])
    return cachedToken.substring(0, cachedToken.length - 2)
  }
  const clientOptions = {
    accessTokenUri: FINT.TOKEN_URL,
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    scopes: [FINT.SCOPE]
  }
  logger('info', ['getFintToken', 'no token in cache, fetching new from FINT'])
  const { accessToken, data } = await new ClientOAuth2(clientOptions).owner.getToken(authConfig.username, authConfig.password)
  logger('info', ['getFintToken', 'token fetched from FINT'])
  tokenCache.setSync(cacheKey, `${accessToken}==`, data.expires_in) // Haha, just to make the cached token not directly usable
  logger('info', ['getFintToken', 'token cached for further use', `Token expires in ${data.expires_in} seconds`])
  return accessToken
}
