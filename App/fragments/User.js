import gql from 'graphql-tag'

export default {
  FullUser: gql`
    fragment FullUser on User {
      _id
      email
      profile {
        firstName
        lastName
        identifier
        address {
          streetName
          streetNumber
          departmentNumber
          city
        }
        phone {
          areaCode
          number
          mobilePhone
        }
        educationalLevel
      }
      active
      roles
    }
  `,
  Profile: gql`
    fragment Profile on User {
      _id
      profile {
        firstName
        lastName
        identifier
        address {
          streetName
          streetNumber
          departmentNumber
          city
        }
        phone {
          areaCode
          number
          mobilePhone
        }
        educationalLevel
      }
    }
  `
}
