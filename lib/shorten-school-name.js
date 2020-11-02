module.exports = (name) => {
  if (!name) {
    return name
  }

  return name.replace(/vid[e|a]regå[e|a]nde sk[o|u]le/g, 'vgs')
}
