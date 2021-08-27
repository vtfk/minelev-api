const repackTeacher = require('./repack-teacher')
const shortenSchoolName = require('./shorten-school-name')
const repackLanguage = require('./repack-languagecodes')

module.exports = (group) => {
  const { grep, id, type, groupId, name, schoolId, schoolName, students, teachers } = group

  // Since the two functions are calling each other, this function has to be declared inside the function for some 🤬 reason.... WTF?! 😡
  const repackStudent = require('./repack-student')

  const repackedStudents = students ? students.map(student => repackStudent(student, true, true)) : null
  const repackedTeachers = teachers ? teachers.map(teacher => repackTeacher(teacher, true)) : null

  const groupInfo = {
    id,
    type,
    name,
    groupId,
    schoolId,
    schoolName,
    schoolShortName: shortenSchoolName(schoolName),
    students: repackedStudents || undefined,
    teachers: repackedTeachers || undefined
  }

  // If the type is basisgruppe, return the groupInfo object
  if (type === 'basisgruppe') {
    return groupInfo
  }

  // If we got a GREP from UDIR, use that instead of ViS-datas
  if (grep) {
    const { kode, tittel, kortform, data_url: dataUrl } = grep

    return {
      ...groupInfo,
      grep: {
        kode,
        dataUrl,
        tittel: repackLanguage(tittel),
        kortform: repackLanguage(kortform)
      }
    }
  }

  // TOPPIDRETT/IDR3013/FOTBALL => IDR3013
  // sometimes there's a space and then some more text instead of a '/', this will produce some weird output if ever encountered: D2/IDR3013 Håndball => IDR3013 Håndball
  const kode = name.split('/')[1]

  return {
    ...groupInfo,
    grep: {
      kode,
      tittel: repackLanguage({ default: null }),
      kortform: repackLanguage({ default: null })
    }
  }
}
