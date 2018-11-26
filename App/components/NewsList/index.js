import React from 'react'
import { View, Text } from '@shoutem/ui'
import NewsListItem from './NewsListItem/index'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'

@withGraphQL(gql`
  query getNews {
    getNewsFeed {
      items {
        _id
        title
      }
    }
  }
`)
export default class NewsList extends React.Component {
  static propTypes = {
    news: PropTypes.array,
    limit: PropTypes.number
  }

  constructor(props) {
    super(props)
    console.log('!!!!!PRROOOPS', props)
  }

  render() {
    console.log('this.props!!!!!!!!!!', this.props)
    return (
      <View>
        <NewsListItem />
      </View>
    )
  }
}
