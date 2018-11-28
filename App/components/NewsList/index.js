import React from 'react'
import { View, Text } from '@shoutem/ui'
import NewsListItem from './NewsListItem/index'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'

@withGraphQL(gql`
  query {
    newsList {
      _id
      title
      date
      subtitle
      imageUrl
    }
  }
`)
export default class NewsList extends React.Component {
  static propTypes = {
    newsList: PropTypes.array,
    limit: PropTypes.number,
  }

  render() {
    console.log('this.props.newsList', this.props.newsList)
    const news = this.props.newsList || []
    return (
      <View>
        {news.map(n => (
          <NewsListItem key={n._id} data={n} />
        ))}
      </View>
    )
  }
}
