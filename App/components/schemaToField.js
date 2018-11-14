import TableTextInput from 'App/components/fields/TableTextInput'
import ObjectField from 'App/components/fields/ObjectField'
import isArray from 'lodash/isArray'

const singleFieldMap = {
  string: TableTextInput,
  ID: TableTextInput,
  plainObject: ObjectField
}

const arrayFieldMap = {}

export default function(type) {
  const fieldMap = isArray(type) ? arrayFieldMap : singleFieldMap
  const typeId = isArray(type) ? type[0] : type
  const fieldType = fieldMap[type]
  if (!fieldType) {
    const text = isArray(type) ? `[${typeId}]` : typeId
    throw new Error('No field component for type: ' + text)
  }
  return fieldType
}
