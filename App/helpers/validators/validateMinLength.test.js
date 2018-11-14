import validateMinLength from './validateMinLength'

const mockedForm = {
  fieldName: 'testValue'
}

test('validates that field value has same length as minLength argument', () => {
  // Passes validation test
  let minLength = 8
  let passedValidation = validateMinLength('fieldName', minLength)
  expect(passedValidation(mockedForm)).toBe(undefined)

  // Fails validation test
  minLength = 12
  let failedValidation = validateMinLength('fieldName', minLength)
  expect(failedValidation(mockedForm))
    .toEqual(`El campo fieldName debe tener al menos ${minLength} caracteres`)
})
