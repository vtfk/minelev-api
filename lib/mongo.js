const { logger } = require('@vtfk/logger')
const MongoClient = require('mongodb').MongoClient

let client = null

module.exports = function getMongoDb (context, fn) {
  if (!process.env.MONGODB_CONNECTION) {
    logger('info', ['mongo', 'missing MONGODB_CONNECTION'])
    throw new Error('Missing env MONGODB_CONNECTION')
  }

  if (client && !client.isConnected) {
    client = null
    logger('info', ['mongo', 'discard client'])
  }

  if (client === null) {
    client = new MongoClient(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    logger('info', ['mongo', 'new client init'])
  } else if (client.isConnected) {
    logger('info', ['mongo', 'client connected', 'quick return'])
    return client.db(process.env.MONGODB_DATABASE)
  }

  return new Promise((resolve, reject) => {
    client.connect(error => {
      if (error) {
        client = null
        logger('error', ['mongo', 'client error', error])
        return reject(error)
      } else {
        logger('info', ['mongo', 'new client connected'])
        resolve(client.db(process.env.MONGODB_DATABASE))
      }
    })
  })
}
