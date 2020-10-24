const TENANT_ID = process.env.TENANT_ID || '08f3813c-9f29-482f-9aec-16ef7cbf477a'
const CLIENT_ID = process.env.CLIENT_ID

module.exports = {
  TOKEN_AUTH: {
    JWK_URI: process.env.TOKEN_AUTH_JWK_URI || `https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`,
    ISS: process.env.TOKEN_AUTH_ISS || undefined,
    AUD: process.env.TOKEN_AUTH_AUD || CLIENT_ID || undefined // Application Client ID
  }
}
