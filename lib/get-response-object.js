module.exports = (data, status = 200, rawBody = false) => {
  return {
    status,
    headers: {
      'Content-Type': 'application/json'
    },
    body: rawBody
      ? data
      : {
          data,
          count: data.length
        }
  }
}
