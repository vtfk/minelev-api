const withTokenAuth = require('../lib/with-token-auth')
const HTTPError = require('../lib/http-error')
const getResponse = require('../lib/get-response-object')
const { maal, utplasseringer, tilbakemeldinger, maalmaler } = require('../mock/yff')

const handleYFF = async (context, req) => {
  const { student, type, id } = req.params
  const { method } = req
  const user = req.token.upn

  context.log(['handle-yff', 'student', student, 'user', user])

  try {
    // GET: /:student/maal
    if (method === 'GET' && type === 'maal' && !id) {
      context.log(['handle-yff', 'get-maal-for-student', 'student', student, 'user', user])
      /*
      const maal = await getMaal({
        student,
        user
      })
      */
      context.log(['handle-yff', 'get-maal-for-student', 'student', student, 'user', user, 'maal', maal.length])
      return getResponse(maal)
    }
    // GET: /:student/utplasseringer
    if (method === 'GET' && type === 'utplasseringer' && !id) {
      context.log(['handle-yff', 'get-utplasseringer-for-student', 'student', student, 'user', user])
      /*
      const utplasseringer = await getUtplasseringer({
        student,
        user
      })
      */
      context.log(['handle-yff', 'get-utplasseringer-for-student', 'student', student, 'user', user, 'utplasseringer', utplasseringer.length])
      return getResponse(utplasseringer)
    }
    // GET: /:student/tilbakemeldinger
    if (method === 'GET' && type === 'tilbakemeldinger' && !id) {
      context.log(['handle-yff', 'get-tilbakemeldinger-for-student', 'student', student, 'user', user])
      /*
      const tilbakemeldinger = await getTilbakemeldinger({
        student,
        user
      })
      */
      context.log(['handle-yff', 'get-tilbakemeldinger-for-student', 'student', student, 'user', user, 'tilbakemeldinger', tilbakemeldinger.length])
      return getResponse(tilbakemeldinger)
    }
    // GET: /:user/maalmaler
    if (method === 'GET' && type === 'maalmaler' && !id) {
      context.log(['handle-yff', 'get-maalmaler', 'user', user])
      /*
      const maler = await getMaler({
        user
      })
      */
      context.log(['handle-yff', 'get-maalmaler', 'user', user, 'tilbakemeldinger', maalmaler.length])
      return getResponse(maalmaler)
    }
  } catch (error) {
    context.log.error(['handle-yff', 'student', student, 'user', user, 'id', id, 'err', error.message])
    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error)
  }
}

module.exports = (context, request) => withTokenAuth(context, request, handleYFF)
