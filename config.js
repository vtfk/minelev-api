const TENANT_ID = process.env.TENANT_ID || '08f3813c-9f29-482f-9aec-16ef7cbf477a'
const CLIENT_ID = process.env.CLIENT_ID

module.exports = {
  TOKEN_AUTH: {
    jwksUri: process.env.TOKEN_AUTH_JWK_URI || `https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`,
    issuer: process.env.TOKEN_AUTH_ISS || undefined,
    audience: process.env.TOKEN_AUTH_AUD || CLIENT_ID || undefined // Application Client ID
  },
  DEMO: process.env.DEMO === 'true',
  DEMO_USER: process.env.DEMO_USER,
  PIFU_API_URL: process.env.PIFU_API_URL || 'https://pifu.api.no',
  PIFU_API_JWT: process.env.PIFU_API_JWT || 'Super secret jwt secret',
  YFF_API_URL: process.env.YFF_API_URL || 'https://yff.api.no',
  YFF_API_JWT: process.env.YFF_API_JWT || 'Super secret jwt secret',
  GREP_API_URL: process.env.GREP_API_URL || 'https://api.vtfk.no/grep/v1/utdanningsprogrammer',
  PREVIEW_API_URL: process.env.PREVIEW_API_URL || 'https://api.vtfk.no/pdf/v1/generate',
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION || 'mongodb://localhost:27017',
  MONGODB_DATABASE: process.env.MONGODB_DATABASE || 'minelev',
  MONGODB_COLLECTION_YFF: process.env.MONGODB_COLLECTION_YFF || 'yff',
  MONGODB_COLLECTION_DOCUMENTS: process.env.MONGODB_COLLECTION_DOCUMENTS || 'documents',
  ENCRYPTED_DOCUMENT_TYPES: process.env.ENCRYPTED_DOCUMENT_TYPES ? process.env.ENCRYPTED_DOCUMENT_TYPES.split(',') : ['notat'],
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'Super secret secret',
  FINT_API_URL: process.env.FINT_API_URL || '',
  FINT_BETA: (process.env.FINT_BETA && process.env.FINT_BETA === 'true') || false,
  FINT_JWT_SECRET: process.env.FINT_JWT_SECRET || false,
  FINT_TIMEOUT: (process.env.FINT_TIMEOUT && Number.parseInt(process.env.FINT_TIMEOUT)) || 0
}
