/**
 * Removes these properties from the object, so it can be
 *  returned to the frontend without exposing secrets:
 * - student.personalIdNumber
 *
 * @param {Object} document The document that should be sanitized
 */
module.exports = (document) => {
  if (document.student) delete document.student.personalIdNumber
  return document
}
