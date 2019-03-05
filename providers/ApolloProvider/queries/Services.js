import gql from 'graphql-tag'

const servicesListQry = gql`
  {
    applications(page: 1, limit: 10) {
      items {
        _id
        name
        description
        departmentId
        approved
        applicationURL
      }
    }
  }
`
export { servicesListQry }
