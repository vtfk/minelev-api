const { logger } = require('@vtfk/logger')
const axios = require('axios').default
const generateSystemJwt = require('./generate-system-jwt')
const { encode } = require('../lib/encode-uri-id')
const config = require('../config')
const HTTPError = require('./http-error')

const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 }) // 600 = 10 min

const getData = async (user, endpoint) => {
  const cacheKey = `${user}+${endpoint}`
  if (cache.has(cacheKey)) {
    logger('info', ['get-pifu-data', 'user', user, 'cache', 'return cached data for endpoint', endpoint])
    return cache.get(cacheKey)
  }

  const pifuToken = generateSystemJwt(config.PIFU_API_JWT, user)
  axios.defaults.headers.common.Authorization = `Bearer ${pifuToken}`

  const { data } = await axios.get(`${config.PIFU_API_URL}${endpoint}`)
  cache.set(cacheKey, data)
  logger('info', ['get-pifu-data', 'user', user, 'cache', 'cached data for endpoint', endpoint])
  return data
}

exports.getMyUser = async (caller) => {
  try {
    return await getData(caller, '/me')
  } catch (error) {
    const { status, data } = error.response
    if (status === 401 && /teacher not found/i.exec(data)) return false
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}

exports.getMyStudents = async (caller, contactStudents = false) => {
  try {
    const students = await getData(caller, '/me/students')
    if (contactStudents) return students.filter(student => student.contactTeacher === true)
    return students
  } catch (error) {
    const { status, data } = error.response
    if (status === 403 && /teacher not found/i.exec(data)) return false
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}

exports.getStudent = async (caller, id) => {
  try {
    const student = await getData(caller, `/students/${id}`)
    const classes = await this.getStudentClasses(caller, id)
    return student.map(student => { return { ...student, groups: classes } })
  } catch (error) {
    const { status, data } = error.response
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}

exports.getStudentClasses = async (caller, id) => {
  try {
    return await getData(caller, `/students/${id}/classes`)
  } catch (error) {
    const { status, data } = error.response
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}

exports.getStudentTeachers = async (caller, id) => {
  try {
    return await getData(caller, `/students/${id}/teachers`)
  } catch (error) {
    const { status, data } = error.response
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}

exports.getMyClasses = async (caller) => {
  try {
    return await getData(caller, '/me/classes')
  } catch (error) {
    const { status, data } = error.response
    if (status === 403 && /teacher not found/i.exec(data)) return false
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}

exports.getClass = async (caller, id) => {
  try {
    const groups = await getData(caller, `/classes/${encode(id)}`)
    const students = await this.getClassStudents(caller, id)
    const teachers = await this.getClassTeachers(caller, id)
    return groups.map(group => { return { ...group, students, teachers } })
  } catch (error) {
    const { status, data } = error.response
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}

exports.getClassStudents = async (caller, id) => {
  try {
    const students = await getData(caller, `/classes/${encode(id)}/students`)
    return students
  } catch (error) {
    const { status, data } = error.response
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}

exports.getClassTeachers = async (caller, id) => {
  try {
    return await getData(caller, `/classes/${encode(id)}/teachers`)
  } catch (error) {
    const { status, data } = error.response
    throw new HTTPError(status || 500, data || 'Unknown error occured')
  }
}
