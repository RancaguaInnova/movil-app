import React from 'react'
import { Text, View } from '@shoutem/ui'
import NewsListItem from './NewsListItem/index'
import gql from 'graphql-tag'
import { WebView } from 'react-native'
import { Constants, WebBrowser } from 'expo'
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
      externalUrl
    }
  }
`)
export default class NewsList extends React.Component {
  static propTypes = {
    newsList: PropTypes.array,
    limit: PropTypes.number,
  }

  state = {
    result: null,
  }

  _onClicKNews = async news => {
    try {
      if (news.externalUrl && news.externalUrl.trim() !== '') {
        let result = await WebBrowser.openBrowserAsync(news.externalUrl)
        this.setState({ result })
      }
    } catch (error) {
      this.setState({ result: null })
    }
  }

  render() {
    const news = this.props.newsList || []

    return (
      <View>
        {news.map(n => (
          <NewsListItem key={n._id} data={n} onClickNews={this._onClicKNews} />
        ))}
      </View>
    )
  }
}
