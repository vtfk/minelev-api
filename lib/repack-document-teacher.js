const repackTeacher = require('./repack-teacher')

module.exports = (teacher) => {
  const repacked = repackTeacher(teacher, true)
  const { username, fullName: name } = repacked

  return {
    username,
    name
  }
}
