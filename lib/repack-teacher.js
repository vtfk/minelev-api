module.exports = (teacher, removeGroups) => {
  return {
    id: teacher.username,
    firstName: teacher.firstName || teacher.givenName,
    lastName: teacher.lastName || teacher.familyName,
    fullName: teacher.fullName,
    username: teacher.username,
    mail: teacher.email || '',
    mobile: `${teacher.phone || ''}`,

    isContactTeacher: teacher.contactTeacher !== null ? teacher.contactTeacher : undefined,

    relatedGroupIds: removeGroups === true ? undefined : teacher.relatedGroupIds || undefined
  }
}
