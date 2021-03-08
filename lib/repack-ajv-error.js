module.exports = (error) => {
  const { keyword, params, dataPath, message } = error

  if (keyword === 'required') return `Missing required property '${params.missingProperty}'`
  if (keyword === 'type') return `Property ${dataPath} should be of type ${params.type}`
  return message
}
