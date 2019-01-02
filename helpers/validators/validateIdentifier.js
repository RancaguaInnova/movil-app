import get from 'lodash/get'

// Add real RUT validation

export default function validateIdentifier(field, message) {
  message = message ? message : 'El Rut ingresado no es válido'
  return form => {
    const re = /^[0-9]{1,2}[\.][0-9]{3,3}[\.][0-9]{3,3}-[0-9|k]$/
    if (!re.test(get(form, field, '').toLowerCase())) return message
  }
}
