import React from 'react'
import { View } from '@shoutem/ui'
import NewsListItem from './NewsListItem/index'
import { WebBrowser } from 'expo'
import autobind from 'autobind-decorator'
import { client } from '../../../providers/ApolloProvider/client'
import Retry from '../../../providers/ApolloProvider/Retry'
import Loading from '../../../providers/ApolloProvider/Loading'
import { newsListQry } from '../../../queries'
import { Query } from 'react-apollo'

export default class NewsList extends React.Component {
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
    return <View>{this.renderNews()}</View>
  }
}
