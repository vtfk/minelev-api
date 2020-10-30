const repackUtdprogData = require('./repack-utdprog-data')
const getBirthdate = require('birthdate-from-id')
const shortenSchoolName = require('./shorten-school-name')

module.exports = (student, removeGroups) => {
  const birthdate = new Date(getBirthdate(student.personalIdNumber))
  const programomraade = student.programomraade.map(repackUtdprogData)[0]
  const utdanningsprogram = student.utdanningsprogram.map(repackUtdprogData)[0]

  return {
    id: student.userName,
    firstName: student.firstName,
    lastName: student.lastName,
    fullName: student.fullName,
    birthdate: birthdate.toISOString(),
    username: student.userName,
    mail: student.mail,
    mobile: student.mobilePhone,

    schoolId: student.unitId,
    schoolName: student.unitName,
    schoolShortName: shortenSchoolName(student.unitName),
    classId: student.mainGroupName,
    classShortId: student.mainGroupName.split(':')[1],

    programomraade,
    utdanningsprogram,

    groups: removeGroups ? null : student.groups
  }
}
