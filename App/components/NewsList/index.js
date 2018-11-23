import React from 'react'
import { View, Text } from '@shoutem/ui'
import NewsListItem from './NewsListItem/index'
import gql from 'graphql-tag'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'

@withGraphQL(
  gql`
    query getNewsFeed($limit: Int!) {
      title
      text
      date
    }
  `,
  {
    limit: 10,
  }
)
export default class NewsList extends React.Component {
  render() {
    console.log('this.props.getNewsFeed!!!!!!!!!!!', this.props.getNewsFeed)
    return (
      <View>
        <NewsListItem />
      </View>
    )
  }
}
