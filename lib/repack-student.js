const repackGrepData = require('./repack-grep-data')

module.exports = (student, removeGroups) => {
  delete student.personalIdNumber
  if (removeGroups) delete student.groups

  student.programomraade = student.programomraade.map(repackGrepData)
  student.utdanningsprogram = student.utdanningsprogram.map(repackGrepData)

  return student
}
