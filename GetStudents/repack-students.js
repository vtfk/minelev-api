module.exports = student => {
  delete student.personalIdNumber
  delete student.groups

  return student
}
