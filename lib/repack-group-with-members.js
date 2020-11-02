const { getClassStudents, getClassTeachers } = require('./get-pifu-data')
const repackGroup = require('./repack-group')
const repackStudent = require('./repack-student')
const repackTeacher = require('./repack-teacher')

module.exports = async (group, caller) => {
  group = repackGroup(group)

  const students = await getClassStudents(caller, group.groupId)
  group.students = students.map(student => repackStudent(student, true, true))

  const teachers = await getClassTeachers(caller, group.groupId)
  group.teachers = teachers.map(teacher => repackTeacher(teacher, true))

  return group
}
