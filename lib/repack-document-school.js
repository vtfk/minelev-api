const repackStudent = require('./repack-student')

module.exports = (student) => {
  const repacked = repackStudent(student, true, true)
  const { schoolId: id, schoolName: name, schoolShortName: shortName } = repacked

  return {
    id,
    name,
    shortName
  }
}
