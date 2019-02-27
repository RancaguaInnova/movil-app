import React from 'react'
import { View } from '@shoutem/ui'
import NewsListItem from './NewsListItem/index'
import { WebBrowser } from 'expo'
import autobind from 'autobind-decorator'
import WebView from 'components/WebView'
import { client } from '../../../providers/ApolloProvider/client'
import Retry from '../../../providers/ApolloProvider/Retry'
import Loading from '../../../providers/ApolloProvider/Loading'
import { newsListQry } from 'providers/ApolloProvider/queries'
import { Query } from 'react-apollo'
import { event } from '/helpers/analytics'

export default class NewsList extends React.Component {
  state = {
    currentNews: '',
  }

  onClickNews = async news => {
    try {
      if (news.externalUrl && news.externalUrl.trim() !== '') {
        this.setState({ currentNews: news.externalUrl })
        //let result = await WebBrowser.openBrowserAsync(news.externalUrl)
        //this.setState({ result })
        event('click_news', news.externalUrl)
      }
    } catch (error) {
      this.setState({ currentNews: '' })
      //this.setState({ result: null })
    }
  }

  onCloseNews = () => {
    this.setState({ currentNews: '' })
  }

  renderNews() {
    const pollInterval = 100 * 60 * 30 // 30 min
    return (
      <Query query={newsListQry} pollInterval={pollInterval}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Loading />
          if (error) return <Retry callback={refetch} />

          return data.newsList.map(news => (
            <NewsListItem key={news._id} data={news} onClickNews={this.onClickNews} />
          ))
        }}
      </Query>
    )
  }

  render() {
    return (
      <View>
        {this.renderNews()}
        <WebView url={this.state.currentNews} onClose={this.onCloseNews} />
      </View>
    )
  }
}
