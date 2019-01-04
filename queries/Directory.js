import gql from 'graphql-tag'

const directoryListQry = gql`
  {
    departmentsList(limit: 100, page: 1) {
      items {
        _id
        name
        imageUrl
        contactInformation {
          address {
            streetName
            streetNumber
            city
          }
        }
        businessHours
      }
    }
  }
`

const officialsByDepartmentQry = gql`
  query officialsByDepartment($department: ID!) {
    officialsByDepartment(department: $department) {
      _id
      firstname
      lastname
      contactInformation {
        phone {
          areaCode
          number
          mobilePhone
        }
        email
      }
      position
      imageUrl
    }
  }
`
export { directoryListQry, officialsByDepartmentQry }
