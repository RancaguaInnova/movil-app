const getGraphQLErrorMessage = function(error) {
  if (error.error === 'validationError') {
    return Object.keys(error.validationErrors)
      .map(key => {
        const message = error.validationErrors[key]
        return `${key}: ${message}`
      })
      .join(', ')
  } else {
    return error.message
  }
}

export default function(error) {
  if (error.graphQLErrors) {
    const graphQLError = error.graphQLErrors[0]
    return getGraphQLErrorMessage(graphQLError)
  }
  return error.message.replace('GraphQL error: ', '')
}
