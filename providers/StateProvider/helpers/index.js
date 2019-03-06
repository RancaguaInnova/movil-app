import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'

// TODO: Test this func

/**
 * Recursively remove "__typename" key, value pairs from objects.
 * Used to clean GraphQL query results to be used as GraphQL Input types
 *
 * @param {Object} obj Graphql object to be used as Input
 * @returns {Object} Object without "__typename" key, value pairs
 */
export const removeTypenameDeep = function (obj) {
  let newObj = Object.assign({}, obj)
  Object.entries(newObj).forEach(entrie => {
    if (entrie[0] === '__typename') {
      delete obj.__typename
    } else if (isPlainObject(entrie[1])) {
      removeTypenameDeep(entrie[1])
    } else if (isArray(entrie[1])) {
      entrie[1].forEach(v => removeTypenameDeep(v))
    }
  })
  return obj
}
