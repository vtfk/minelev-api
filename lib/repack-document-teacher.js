const repackTeacher = require('./repack-teacher')

module.exports = (teacher) => {
  const repacked = teacher.mail ? teacher : repackTeacher(teacher, true)
  const { username, fullName: name, firstName, lastName, mobile, mail } = repacked

  return {
    username,
    name,
    firstName,
    lastName,
    mobile,
    mail
  }
}
