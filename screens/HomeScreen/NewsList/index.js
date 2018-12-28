import React from 'react'
import { View } from '@shoutem/ui'
import NewsListItem from './NewsListItem/index'
import { WebBrowser } from 'expo'
import autobind from 'autobind-decorator'
import { client } from '../../../providers/ApolloProvider/client'
import Retry from '../../../providers/ApolloProvider/Retry'
import Loading from '../../../providers/ApolloProvider/Loading'
import { newsListQry } from '../../../queries'

export default class NewsList extends React.Component {
  state = {
    news: {
      list: [],
      status: 'loading',
    },
  }

  componentDidMount() {
    this.loadNews()
  }

  @autobind
  async loadNews() {
    try {
      const result = await client.query({
        query: newsListQry,
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
