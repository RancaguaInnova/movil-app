import gql from 'graphql-tag'

const bannersBySectionQry = section => gql`
  {
  bannersBySection (section: "${section}") {
    _id
    targetUrl
    imageUrl
  }
}
`

export { bannersBySectionQry }
