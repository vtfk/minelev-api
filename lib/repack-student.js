const getBirthdate = require('birthdate-from-id')
const repackUtdprogData = require('./repack-student-utdprog')
const shortenSchoolName = require('./shorten-school-name')
const repackGroups = require('./repack-group')

module.exports = (student, removeGroups, removeUtdProg) => {
  const birthdate = new Date(getBirthdate(student.personalIdNumber))

  const programomraade = removeUtdProg === true ? undefined : student.programomraade.map(repackUtdprogData)[0]
  const utdanningsprogram = removeUtdProg === true ? undefined : student.utdanningsprogram.map(repackUtdprogData)[0]
  const groups = removeGroups === true ? undefined : student.groups.map(repackGroups)

  return {
    id: student.userName,
    firstName: student.firstName,
    lastName: student.lastName,
    fullName: student.fullName,
    birthdate: birthdate.toISOString(),
    username: student.userName,
    mail: student.mail,
    mobile: student.mobilePhone,

    isContactTeacher: student.contactTeacher || false,

    schoolId: student.unitId,
    schoolName: student.unitName,
    schoolShortName: shortenSchoolName(student.unitName),
    classId: student.mainGroupName,
    classShortId: student.mainGroupName.split(':')[1],
    level: student.level,

    programomraade,
    utdanningsprogram,
    groups
  }
}
