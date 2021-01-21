const repackStudent = require('./repack-student')

module.exports = (student) => {
  const repacked = student.username ? student : repackStudent(student, true, true)
  const { username, fullName: name, firstName, lastName, personalIdNumber, mobile, mail, classId } = repacked

  return {
    username,
    name,
    firstName,
    lastName,
    personalIdNumber: personalIdNumber || student.personalIdNumber || student.ssn || null,
    mobile: mobile || '',
    mail: mail || '',
    classId
  }
}
