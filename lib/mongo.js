const MongoClient = require('mongodb').MongoClient

let client = null

module.exports = function getMongoDb (context, fn) {
  if (!process.env.MONGODB_CONNECTION) {
    context.log(['mongo', 'missing MONGODB_CONNECTION'])
    throw new Error('Missing env MONGODB_CONNECTION')
  }

  if (client && !client.isConnected) {
    client = null
    context.log(['mongo', 'discard client'])
  }

  if (client === null) {
    client = new MongoClient(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    context.log(['mongo', 'new client init'])
  } else if (client.isConnected) {
    context.log(['mongo', 'client connected', 'quick return'])
    return client.db(process.env.MONGODB_DATABASE)
  }

  return new Promise((resolve, reject) => {
    client.connect(error => {
      if (error) {
        client = null
        context.log.error(['mongo', 'client error', error])
        return reject(error)
      } else {
        context.log(['mongo', 'new client connected'])
        resolve(client.db(process.env.MONGODB_DATABASE))
      }
    })
  })
}
