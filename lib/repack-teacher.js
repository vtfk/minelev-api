
module.exports = (teacher, removeGroups) => {
  return {
    id: teacher.username,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    fullName: teacher.fullName,
    username: teacher.username,
    mail: teacher.email,
    mobile: teacher.phone,

    contactTeacher: teacher.contactTeacher !== null ? teacher.contactTeacher : undefined,

    relatedGroupIds: removeGroups === true ? undefined : teacher.relatedGroupIds || undefined
  }
}
