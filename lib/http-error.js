const { STATUS_CODES } = require('http')

class HTTPError extends Error {
  constructor (code, message, innerError) {
    super(message || STATUS_CODES[code])

    this.name = toName(code)
    this.statusCode = code
    this.innerError = innerError
  }

  toJSON () {
    return {
      statusCode: this.statusCode,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        error: {
          statusCode: this.statusCode,
          message: this.message,
          innerError: this.innerError || undefined
        }
      }
    }
  }
}

/**
 * Converts an HTTP status code to an Error `name`.
 * Ex:
 *   302 => "Found"
 *   404 => "NotFoundError"
 *   500 => "InternalServerError"
 */
const toName = (code) => {
  const suffix = (code / 100 | 0) === 4 || (code / 100 | 0) === 5 ? 'Error' : ''
  const statusName = STATUS_CODES[code].replace(/error$/i, '').replace(/ /g, '')
  return `${statusName}${suffix}`
}

module.exports = HTTPError
