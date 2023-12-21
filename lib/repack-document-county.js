const HTTPError = require('./http-error')
const repackStudent = require('./repack-student')
const getSchools = require('vtfk-schools-info')

module.exports = (student) => {
  const repacked = student.username ? student : repackStudent(student, true, true)
  const { schoolId: id } = repacked
  {
    // First try to find school with schoolId
    const schools = getSchools({ schoolId: id })
    if (schools.length === 1) {
      const { county, countyNumber } = schools[0]
      if (!(county && countyNumber)) throw new HTTPError(500, `Could not find county and countyNumber for school with schoolId equal to ${id} `)
      return {
        county,
        countyNumber
      }
    }
  }
  {
    // If not found we try with schoolNumber
    const schools = getSchools({ schoolNumber: id })
    if (schools.length === 1) {
      const { county, countyNumber } = schools[0]
      if (!(county && countyNumber)) throw new HTTPError(500, `Could not find county and countyNumber for school with schoolId equal to ${id} `)
      return {
        county,
        countyNumber
      }
    }
  }
  throw new HTTPError(500, `Could not find any unique school in vtfk-schools-info with schoolId or schoolNumber equal to ${id} `)
}
