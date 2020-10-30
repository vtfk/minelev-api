module.exports = (utdprog) => {
  const { grep, id, name } = utdprog

  // If we got a GREP from UDIR, use that instead of Extens-datas
  if (grep) {
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

  // 6_BLABL1----TESVS@38099 => BLABL1----
  // 5_PB_TESVS@38099 => PB
  const kode = id.split('_')[1]

  // Return Extens-group
  return {
    kode,
    type: 'Ukjent',
    kortform: {
      default: name,
      nob: name
    }
  }
}
