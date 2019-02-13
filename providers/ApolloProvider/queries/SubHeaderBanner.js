import gql from 'graphql-tag'

const bannerBySectionQry = section => gql`
  {
  bannerBySection (section: "${section}") {
    _id
    targetUrl
    imageUrl
  }
}
`

export { bannerBySectionQry }
