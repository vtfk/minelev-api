module.exports.encode = (id) => encodeURIComponent(encodeURIComponent(id))
module.exports.decode = (id) => decodeURIComponent(decodeURIComponent(id))
