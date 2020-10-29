module.exports = (grep) => {
  const { kode, type_utdanningsprogram: typeUtd, tittel, kortform } = grep
  const typesplit = typeUtd.split('_')
  const type = typesplit[typesplit.length - 1]

  return {
    kode,
    type,
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
