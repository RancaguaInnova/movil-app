import React from 'react'
import { Text, View } from '@shoutem/ui'
import NewsListItem from './NewsListItem/index'
import gql from 'graphql-tag'
import { WebView } from 'react-native'
import { Constants, WebBrowser } from 'expo'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import autobind from 'autobind-decorator'
import { client } from '/App/Root/client'
import Retry from '/App/Root/Retry'
import Loading from '/App/Root/Loading'

export default class NewsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: {
        list: [],
        status: 'loading',
      },
    }
  }

  componentDidMount() {
    this.loadNews()
  }

  @autobind
  async loadNews() {
    try {
      const newsQry = gql`
        {
          newsList {
            _id
            title
            date
            subtitle
            imageUrl
            externalUrl
          }
        }
      `
      const result = await client.query({
        query: newsQry,
      })

      const {
        data: { newsList },
      } = result

      const news = this.state.news
      news.list = newsList
      news.status = ''

      this.setState({
        ...news,
      })
    } catch (error) {
      console.log('error loadingNews', error)
      const news = this.state.news
      news.list = []
      news.status = 'error'
      this.setState({
        ...news,
      })
    }
  }

  onClickNews = async news => {
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
    const news = this.state.news

    return (
      <View>
        {news.status === 'loading' ? (
          <Loading />
        ) : news.status === 'error' ? (
          <Retry callback={this.loadNews} color='gray' />
        ) : (
          news.list.map(n => <NewsListItem key={n._id} data={n} onClickNews={this.onClickNews} />)
        )}
      </View>
    )
  }
}
