import get from 'lodash/get'

export default function validatePresenceOfFields(fields) {
  return form => {
    for (let field of fields) {
      let errorMessage = field.message || `Debes completar el campo ${field.label}`
      if (!get(form, field.name)) return field.message
    }
  }
}
