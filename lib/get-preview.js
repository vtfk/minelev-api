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
    if (document.county.countyNumber === '39') {
      const { data: { data } } = await axios.post(`${config.VFK_PREVIEW_API_URL}`, payload, { headers: { 'x-functions-key': config.VFK_PREVIEW_API_KEY } })
      return {
        ...data,
        data: repackDocument(data.data)
      }
    } else if (document.county.countyNumber === '40') {
      const { data: { data } } = await axios.post(`${config.TFK_PREVIEW_API_URL}`, payload, { headers: { 'x-functions-key': config.TFK_PREVIEW_API_KEY } })
      return {
        ...data,
        data: repackDocument(data.data)
      }
    }
    throw new HTTPError(400, 'CountyNumber was not "39" or "40", cannot create preview')
  } catch (err) {
    const { status, data: { error } } = err.response
    logger('error', ['get-preview', 'unable to get preview', err.message])
    throw new HTTPError(status || 500, error.message || 'Unknown error occured', error.innerError)
  }
}
