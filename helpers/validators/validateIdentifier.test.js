import get from 'lodash/get'
import validateIdentifier from './validateIdentifier'

// Mocked form need to be improved to avoid having one key for each format
const mockedForm = {
  validFormatA: '14.653.763-k',
  validFormatB: '8.237.914-0',
  invalidFormatA: '2',
  invalidFormatB: '342',
  invalidFormatC: 'sdf',
  invalidFormatD: '1d.fas.23-t',
  invalidFormatE: '2.343.456-p',
  invalidFormatF: '234.537.921-k',
  invalidFormatG: 'k'
}

test('Validates that identifier (RUT) has valid format', () => {
  // Passes validation test
  let passesValidation = validateIdentifier('validFormatA')
  expect(passesValidation(mockedForm)).toBe(undefined)

  passesValidation = validateIdentifier('validFormatB')
  expect(passesValidation(mockedForm)).toBe(undefined)

  // Failes validaton test
  const errorMessage = 'El Rut debe ingresarse con puntos y guión: 11.222.333-k'
  let failsValidation = validateIdentifier('invalidFormatA')
  expect(failsValidation(mockedForm))
    .toEqual(errorMessage)

  failsValidation = validateIdentifier('invalidFormatB')
  expect(failsValidation(mockedForm))
    .toEqual(errorMessage)

  failsValidation = validateIdentifier('invalidFormatC')
  expect(failsValidation(mockedForm))
    .toEqual(errorMessage)


  failsValidation = validateIdentifier('invalidFormatD')
  expect(failsValidation(mockedForm))
    .toEqual(errorMessage)

  failsValidation = validateIdentifier('invalidFormatE')
  expect(failsValidation(mockedForm))
    .toEqual(errorMessage)

  failsValidation = validateIdentifier('invalidFormatF')
  expect(failsValidation(mockedForm))
    .toEqual(errorMessage)

  failsValidation = validateIdentifier('invalidFormatG')
  expect(failsValidation(mockedForm))
    .toEqual(errorMessage)
})

