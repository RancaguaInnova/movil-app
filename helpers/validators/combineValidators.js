export default function combineValidators(...validators) {
  return form => {
    for (let validator of validators) {
      const errorMessage = validator(form)
      if (errorMessage) return errorMessage
    }
  }
}
