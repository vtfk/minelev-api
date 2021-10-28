module.exports = (error) => {
  const { keyword, params, instancePath, message } = error

  if (keyword === 'required') return `Missing required property '${params.missingProperty}'`
  if (keyword === 'type') return `Property ${instancePath} should be of type ${params.type}`
  return message
}
