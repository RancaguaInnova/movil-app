import gql from 'graphql-tag'

const newsListQry = (qry = gql`
  {
    newsList {
      _id
      title
      date
      subtitle
      imageUrl
      externalUrl
    }
  }
`)

export { newsListQry }
