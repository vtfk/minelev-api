const repackTeacher = require('./repack-teacher')
const shortenSchoolName = require('./shorten-school-name')
const repackLanguage = require('./repack-languagecodes')

module.exports = (group) => {
  const { grep, id, type, groupId, name, description, schoolId, schoolName, students, teachers } = group

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

  // If we got a GREP from UDIR, use that instead of Extens-datas
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

  // 7_HSF1008_TESVS@38099 => HSF1008
  const kode = id.split('_')[1]

  // Extract name and return Extens-group
  const descriptionMatch = `${description}`.match(`Undervisningsgruppa ${name} i (.*) ved .*`)
  const descriptionName = descriptionMatch ? descriptionMatch[1] : description

  return {
    ...groupInfo,
    grep: {
      kode,
      tittel: repackLanguage({ default: descriptionName }),
      kortform: repackLanguage({ default: descriptionName })
    }
  }
}
