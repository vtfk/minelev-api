const repackLanguage = require('./repack-languagecodes')

module.exports = (utdprog) => {
  const { grep, id, name } = utdprog

  // If we got a GREP from UDIR, use that instead of ViS-datas
  if (grep) {
    const { kode, type_utdanningsprogram: typeUtd, tittel, kortform } = grep
    const typesplit = typeUtd.split('_')
    const type = typesplit[typesplit.length - 1]

    return {
      kode,
      type,
      tittel: repackLanguage(tittel),
      kortform: repackLanguage(kortform)
    }
  }

  // Return ViS-group
  return {
    kode: id,
    type: 'Ukjent',
    tittel: repackLanguage({ default: name }),
    kortform: repackLanguage({ default: name })
  }
}
