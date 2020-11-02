const log = console.log

module.exports = async payload => {
  const { method, type, student } = payload
  log(['student', student])
  if (method === 'GET') {
    delete payload.id
    return payload
  }
  if (method === 'POST' && type === 'utplassering-bekreftelse') {
    // må hente info om elev og utplassering
    return payload
  }
  if (method === 'POST' && type === 'lokal-laereplan') {
    // må hente info om elev, maal og utplasseringer
    return payload
  }
  if (method === 'POST' && type === 'utplassering-tilbakemelding') {
    // må hente info om elev, utplassering, maal og tilbakemelding
    return payload
  }
}
