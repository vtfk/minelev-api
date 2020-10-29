module.exports = async function (context, req) {
  context.log(['ping', req.headers.host])

  return {
    body: {
      ping: 'pong'
    }
  }
}
