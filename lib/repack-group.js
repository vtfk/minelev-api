const shortenSchoolName = require('./shorten-school-name')

module.exports = (group) => {
  const { grep, id, type, groupId, name, description, schoolId, schoolName } = group

  const groupInfo = {
    id,
    type,
    name,
    groupId,
    schoolId,
    schoolName,
    schoolShortName: shortenSchoolName(schoolName)
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
        tittel: {
          default: tittel.default,
          nob: tittel.nob,
          nno: tittel.nno
        },
        kortform: {
          default: kortform.default,
          nob: kortform.nob,
          nno: kortform.nno
        }
      }
    }
  }

  // 7_HSF1008_TESVS@38099 => HSF1008
  const kode = id.split('_')[1]

  // Return Extens-group
  return {
    ...groupInfo,
    grep: {
      kode,
      kortform: {
        default: description,
        nob: description
      }
    }
  }
}
