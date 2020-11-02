const log = console.log

module.exports = async payload => {
  const { method, type, student } = payload
  log(['student', student])
  if (method === 'GET') {
    delete payload.id
    return payload
  }
  if (method === 'POST' && type === 'yff-utplassering-bekreftelse') {
    // TODO: må hente info om elev og utplassering
    return payload
  }
  if (method === 'POST' && type === 'yff-lokal-laereplan') {
    // TODO: må hente info om elev, maal og utplasseringer
    return payload
  }
  if (method === 'POST' && type === 'yff-utplassering-tilbakemelding') {
    // TODO: må hente info om elev, utplassering, maal og tilbakemelding
    return payload
  }
  if (method === 'POST' && type === 'elev-varsel') {
    // TODO: må hente info om elev
    return payload
  }
  if (method === 'POST' && type === 'elev-notat') {
    // TODO: må hente info om elev
    return payload
  }
  if (method === 'POST' && type === 'elev-samtale') {
    // TODO: må hente info om elev
    return payload
  }
}
