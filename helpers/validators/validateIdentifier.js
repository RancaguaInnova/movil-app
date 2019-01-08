import get from 'lodash/get'
import { validate } from 'rut.js'
// Add real RUT validation

export default function validateIdentifier(field, message) {
  message = message ? message : 'El Rut ingresado no es válido'

  return form => {
    const val = get(form, field, '')
    const result = validate(val)
    if (!result) return message
  }
}
