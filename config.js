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
  VFK_PREVIEW_API_URL: process.env.VFK_PREVIEW_API_URL || 'https://api.vtfk.no/pdf/v1/generate',
  VFK_PREVIEW_API_KEY: process.env.VFK_PREVIEW_API_KEY || 'tublkk',
  TFK_PREVIEW_API_URL: process.env.TFK_PREVIEW_API_URL || 'https://api.vtfk.no/pdf/v1/generate',
  TFK_PREVIEW_API_KEY: process.env.TFK_PREVIEW_API_KEY || 'tublkk',
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION || 'mongodb://localhost:27017',
  MONGODB_DATABASE: process.env.MONGODB_DATABASE || 'minelev',
  MONGODB_COLLECTION_YFF: process.env.MONGODB_COLLECTION_YFF || 'yff',
  MONGODB_COLLECTION_DOCUMENTS: process.env.MONGODB_COLLECTION_DOCUMENTS || 'documents',
  ENCRYPTED_DOCUMENT_TYPES: process.env.ENCRYPTED_DOCUMENT_TYPES ? process.env.ENCRYPTED_DOCUMENT_TYPES.split(',') : ['notat'],
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'Super secret secret',
  FINT: {
    URL: process.env.FINT_URL,
    SCOPE: process.env.FINT_SCOPE,
    TOKEN_URL: process.env.FINT_TOKEN_URL
  },
  FINT_VFK: {
    CLIENT_ID: process.env.FINT_VFK_CLIENT_ID,
    CLIENT_SECRET: process.env.FINT_VFK_CLIENT_SECRET,
    USERNAME: process.env.FINT_VFK_USERNAME,
    PASSWORD: process.env.FINT_VFK_PASSWORD
  },
  FINT_TFK: {
    CLIENT_ID: process.env.FINT_TFK_CLIENT_ID,
    CLIENT_SECRET: process.env.FINT_TFK_CLIENT_SECRET,
    USERNAME: process.env.FINT_TFK_USERNAME,
    PASSWORD: process.env.FINT_TFK_PASSWORD
  },
  TEST_FEIDENAVN: process.env.TEST_FEIDENAVN ? process.env.TEST_FEIDENAVN.split(',') : []
}
