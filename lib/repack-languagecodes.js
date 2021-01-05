/**
 * Takes an input object with language codes and returns it with correct codes following the ISO-639-1 standard.
 * If a `default` value is passed, this is used whenever a value is missing from the input.
 *
 * @example
 *  Input: {
 *    nob: 'Hei!',
 *    eng: 'Hello!',
 *    default: 'Standard hallo!'
 *  }
 *
 *  Outputs: {
 *    nb: 'Hei!',
 *    nn: 'Standard hallo!',
 *    en: 'Hello!'
 *  }
 *
 * @param {Object} input The object that should be repacked and returned with correct language codes
 */
module.exports = (input) => ({
  nb: input.nb || input.nob || input.default || null,
  nn: input.nn || input.nno || input.default || null,
  en: input.en || input.eng || input.default || null
})
