import get from 'lodash/get'

/**
 * Validates that field value is at least minLength caracters long
 *
 * @param {String} field Form field name
 * @param {Number} minLength Minimum length to check for
 * @param {String} message Error message to display
 * @returns {String/undefined} Returns the error message if validation fails.
 *                             Returns undefined if validation passes
 */
export default function(field, minLength, message) {
  message = message ? message : `El campo ${field} debe tener al menos ${minLength} caracteres`
  return form => {
    let value = get(form, field, '')
    if (value.length < minLength) return message
  }
}
