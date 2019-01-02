import get from 'lodash/get'

/**
 * Validates that firstField value equals secondField value
 *
 * @param {Object} firstField Object with field name and label to show on error message
 * @param {Object} secondField Object with name and label to show on error message
 * @param {String} message Optional error message to show if validation fails
 * @returns {String} The error message if validation fails. undefined otherwise
 */
export default function(firstField, secondField, message) {
  message = message ? message : `Los campos ${firstField.label} y ${secondField.label} deben coincidir`
  return form => {
    const firstValue = get(form, firstField.name)
    const secondValue = get(form, secondField.name)
    if (firstValue !== secondValue) return message
  }
}
