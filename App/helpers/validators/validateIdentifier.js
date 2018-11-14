import get from 'lodash/get'

export default function validateIdentifier(field, message) {
  message = message ? message : 'El Rut debe ingresarse con puntos y guión: 11.222.333-k'
  return form => {
    const re = /^[0-9]{1,2}[\.][0-9]{3,3}[\.][0-9]{3,3}-[0-9|k]$/
    if (!re.test(get(form, field, '').toLowerCase())) return message
  }
}
