import React from 'react'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import TableSelect from '../TableSelect'
import PropTypes from 'prop-types'
import Loading from './Loading'

/*
For Weeshing Only
*/

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
    return <TableSelect {...this.props} />
  }
}

GraphQLSelect.propTypes = {
  dataName: PropTypes.string,
  ...TableSelect.propTypes
}

export default GraphQLSelect
