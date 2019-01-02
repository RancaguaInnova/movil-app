import validateCoincidence from './validateCoincidence'

const mockedForm = {
  firstField: 'someTestValue',
  secondField: 'someTestValue',
  failureField: 'differentValue'
}

test('Should validate that firstField value is equal to secondField value', () => {
  // Passes validation test
  let passedValidation = validateCoincidence('firstField', 'secondField')
  expect(passedValidation(mockedForm)).toBe(undefined)

  // Fails validation test
  let failedValidation = validateCoincidence('firstField', 'failureField')
  expect(failedValidation(mockedForm))
    .toEqual(`Los campos firstField y failureField deben coincidir`)
})
