const repackStudent = require('./repack-student')

module.exports = (student) => {
  const repacked = repackStudent(student, true, true)
  const { username, fullName: name, firstName, lastName } = repacked

  return {
    username,
    name,
    firstName,
    lastName
  }
}
