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
    }
  }
`
export { cardListQry }
