import gql from 'graphql-tag'

const informationCategoriesListByParentId = gql`
  query informationCategoriesListByParentId($parentID: ID!) {
    informationCategoriesListByParentId(parentID: $parentID) {
      _id
      name
      description
      optionLabel
      tags
      iconURL
      urlRedirect
      imageHeaderUrl
      childIds
      parent {
        _id
        name
      }
    }
  }
`
const informationCategory = gql`
  query informationCategory($informationCategoryId: ID!) {
    informationCategory(informationCategoryId: $informationCategoryId) {
      _id
      childIds
      description
      name
      iconURL
      urlRedirect
      optionLabel
      urlIframe
      imageHeaderUrl
      tags
      parent {
        _id
        name
      }
    }
  }
`

const informationCategoriesParent = gql`
  query informationCategoriesParent {
    informationCategoriesParent {
      _id
      name
      description
      optionLabel
      tags
      childIds
      urlIframe
      url: urlRedirect
      icon: iconURL
      imageHeaderUrl
      parent {
        _id
        name
      }
    }
  }
`
export { informationCategoriesParent, informationCategory, informationCategoriesListByParentId }
