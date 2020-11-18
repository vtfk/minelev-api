const { logger } = require('@vtfk/logger')
const HTTPError = require('./http-error')

const Ajv = require('ajv')
const repackAjvError = require('./repack-ajv-error')
const documentSchema = require('../models/document.json')

const ajv = new Ajv({ allErrors: true, jsonPointers: true })
const validate = ajv.compile(documentSchema)

module.exports = (body) => {
  const valid = validate(body)
  if (!valid) {
    logger('warn', ['validate-document-schema', 'schema validation failed', validate.errors.map(repackAjvError)])
    throw new HTTPError(400, 'Invalid request body', { summary: validate.errors.map(repackAjvError), schemaErrors: validate.errors })
  }

  return true
}
