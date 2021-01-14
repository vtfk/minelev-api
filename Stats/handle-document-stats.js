const { logger } = require('@vtfk/logger')
const { aggregate } = require('../lib/crud')
const config = require('../config')

const collection = config.MONGODB_COLLECTION_DOCUMENTS

module.exports.getTotalStats = async () => {
  const query = [
    { $count: 'count' }
  ]

  logger('info', ['handle-document-stats', 'querying'])
  const types = await aggregate(collection, query)
  logger('info', ['handle-document-stats', `got ${types.length} types`])

  return types[0]
}

module.exports.getTypeStats = async () => {
  const query = [
    {
      $group: {
        _id: { type: '$type', variant: '$variant' },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: '$_id.type',
        count: { $sum: 1 },
        variants: { $push: { variant: '$_id.variant', count: '$count' } }
      }
    },
    { $project: { _id: 0, type: '$_id', variants: 1, count: 1 } },
    { $project: { type: '$type', variants: '$variants' } },
    { $sort: { type: 1 } }
  ]

  logger('info', ['handle-document-stats', 'querying'])
  const types = await aggregate(collection, query)
  logger('info', ['handle-document-stats', `got ${types.length} types`])

  return types
}

module.exports.getTypeSchoolStats = async () => {
  const query = [
    {
      $group: {
        _id: { type: '$type', school: '$school.id', schoolName: '$school.name' },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: '$_id.type',
        count: { $sum: 1 },
        schools: { $push: { id: '$_id.school', name: '$_id.schoolName', count: '$count' } }
      }
    },
    { $project: { _id: 0, type: '$_id', schools: 1 } },
    { $project: { type: '$type', schools: '$schools' } },
    { $sort: { type: 1 } }
  ]

  logger('info', ['handle-document-stats', 'querying'])
  const types = await aggregate(collection, query)
  logger('info', ['handle-document-stats', `got ${types.length} types`])

  return types
}

module.exports.getSchoolStats = async () => {
  const query = [
    {
      $group: {
        _id: { school: '$school.id', name: '$school.name', type: '$type' },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: { school: '$_id.school', name: '$_id.name' },
        count: { $sum: 1 },
        types: { $push: { type: '$_id.type', count: '$count' } }
      }
    },
    { $project: { _id: 0, school: '$_id.school', name: '$_id.name', types: 1, count: 1 } },
    { $project: { id: '$school', name: '$name', types: '$types' } },
    { $sort: { name: -1 } }
  ]

  logger('info', ['handle-document-stats', 'querying'])
  const types = await aggregate(collection, query)
  logger('info', ['handle-document-stats', `got ${types.length} types`])

  return types
}
