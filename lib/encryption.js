const CryptoJS = require('crypto-js')
const { ENCRYPTION_KEY } = require('../config')

/**
 * Takes a object, transforms it to JSON and encrypts it using AES. The key is hashed to a SHA256 before use.
 *
 * @param {object} content The object that should be encrypted. The object is JSON.stringified before encryption
 * @param {string} key Encryption key
 * @returns {string} Encrypted object as a string
 */
const encrypt = (content, key) => {
  const json = JSON.stringify(content)
  const hashedKey = CryptoJS.SHA256(key)
  const encrypted = CryptoJS.AES.encrypt(json, hashedKey.toString())
  return encrypted.toString()
}

/**
 * Decrypts the content of the string using provided key and returns the object (JSON.parse()).
 *
 * @param {string} content The encrypted object
 * @param {string} key Key used to decrypt object
 * @returns {object} The decrypted object
 */
const decrypt = (content, key) => {
  const hashedKey = CryptoJS.SHA256(key)
  const decrypted = CryptoJS.AES.decrypt(content, hashedKey.toString())
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
}

/**
 * Takes a object and encrypts its values using the given secret.
 *
 * @param {object} content The object where the values should be encrypted
 * @param {string=} secret Encryption key. Defaults to config value: ENCRYPTION_KEY
 * @returns {object} Object with encrypted values
 */
const encryptContent = (content, secret) => {
  const encrypted = {}
  for (const key in content) {
    encrypted[key] = encrypt(content[key], (secret || ENCRYPTION_KEY))
  }

  return encrypted
}

/**
 * Takes the encrypted object and decrypts its values
 *
 * @param {object} content The object containing encrypted values (from encryptContent())
 * @param {string=} secret Encryption key to decrypt the values. Defaults to config valye: ENCRYPTION_KEY
 * @returns {object} Object with decrypted values
 */
const decryptContent = (content, secret) => {
  const decrypted = {}
  for (const key in content) {
    decrypted[key] = decrypt(content[key], (secret || ENCRYPTION_KEY))
  }

  return decrypted
}

module.exports = {
  encryptContent,
  decryptContent,
  encrypt,
  decrypt
}
