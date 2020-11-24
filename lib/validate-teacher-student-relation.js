const { getMyStudents } = require('./get-pifu-data')
const HTTPError = require('./http-error')

const throwNoAccess = (student) => { throw new HTTPError(403, 'You don\'t have access to this student!', { student }) }

module.exports = async (caller, student, students = null) => {
  if (!student) throwNoAccess(student)

  // Retreive all students if no list was provided
  students = students || await getMyStudents(caller)

  // If a student was specified, verify that the teacher has access to this student before proceeding
  const specifiedStudent = students.filter(s => s.userName === student || s.username === student || s.email === student)
  if (!specifiedStudent || specifiedStudent.length === 0) throwNoAccess(student)

  // Return the student we found
  return specifiedStudent[0]
}
