import React from 'react'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Select from '../Select'
import PropTypes from 'prop-types'
import Loading from './Loading'

@withGraphQL(
  gql`
    query getFieldOptions($dataName: ID!) {
      options: fieldOptions(data: $dataName) {
        label
        value
      }
    }
  `,
  {
    loading: <Loading />
  }
)
class GraphQLSelect extends React.Component {
  render() {
    return <Select {...this.props} />
  }
}

GraphQLSelect.propTypes = {
  dataName: PropTypes.string,
  ...Select.propTypes
}

export default GraphQLSelect
