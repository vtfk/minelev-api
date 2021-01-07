const { logger } = require('@vtfk/logger')
const axios = require('axios').default
const config = require('../config')
const HTTPError = require('./http-error')
const repackDocument = require('./repack-document')

exports.getPreview = async (document, lang = 'nb') => {
  try {
    const payload = {
      system: 'minelev',
      template: `${document.type}/${document.variant}`,
      language: lang,
      data: document
    }

    const { data: { data } } = await axios.post(`${config.PREVIEW_API_URL}`, payload)

    return {
      ...data,
      data: repackDocument(data.data)
    }
  } catch (err) {
    const { status, data: { error } } = err.response
    logger('error', ['get-preview', 'unable to get preview', error.message])
    throw new HTTPError(status || 500, error.message || 'Unknown error occured', error.innerError)
  }
}
