import get from 'lodash/get'

export default function validateEmail(field, message) {
  message = message ? message : 'Debes ingresar un email valido'
  return form => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(get(form, field, '').toLowerCase())) return message
  }
}
