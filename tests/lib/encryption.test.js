const { encryptContent, decryptContent, encrypt, decrypt } = require('../../lib/encryption')

const secret = 'Æ lik itj at DDE e så dritbra som dem e sjø!'
const object = { secret }
const objectJson = JSON.stringify(object)

const key = 'Detta e mi lille hemmeligheit!'

describe('test encryption', () => {
  const encrypted = encrypt(secret, key)
  const decrypted = decrypt(encrypted, key)

  it('returns different data on encryption', () => {
    expect(encrypted).not.toEqual(secret)
  })

  it('returns correctly decrypted data', () => {
    expect(decrypted).toEqual(secret)
  })

  it('doesn\'t throw on encryption', () => {
    expect(() => encrypt(secret, key)).not.toThrow()
  })

  it('doesn\'t throw on decryption', () => {
    expect(() => decrypt(encrypted, key)).not.toThrow()
  })

  it('throws when decrypting with invalid key', () => {
    expect(() => decrypt(encrypted, 'incorrect')).toThrow()
  })

  it('throws when decrypting data that\'s not encrypted', () => {
    expect(() => decrypt(secret, key)).toThrow()
  })
})

describe('test content encryption', () => {
  const encrypted = encryptContent(object, key)
  const encryptedJson = JSON.stringify(encrypted)

  const decrypted = decryptContent(encrypted, key)
  const decryptedJson = JSON.stringify(decrypted)

  it('returns a object different than what we sent in', () => {
    expect(encryptedJson).not.toEqual(objectJson)
  })

  it('returns correctly decrypted data', () => {
    expect(decryptedJson).toEqual(objectJson)
  })

  it('doesn\'t throw on encryption', () => {
    expect(() => encryptContent({ test: true }, key)).not.toThrow()
  })

  it('doesn\'t throw on decryption', () => {
    expect(() => decryptContent(encrypted, key)).not.toThrow()
  })

  it('throws when decrypting with incorrect secret', () => {
    expect(() => decryptContent(encrypted, 'incorrect')).toThrow()
  })
})
