import gql from 'graphql-tag'
const cardListQry = gql`
  {
    cardsList {
      datum
      measurementUnit
      icon
      color
      title
      subtitle
      iconUrl
      imageUrl
      type
      targetUrl
    }
  }
`
export { cardListQry }
