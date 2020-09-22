import React from 'react'
//import { View } from '@shoutem/ui'
import { View } from 'react-native'
import NewsListItem from './NewsListItem/index'
import { WebBrowser } from 'expo'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { openWebView } from 'providers/StateProvider/WebView/actions'
import { client } from 'providers/ApolloProvider/client'
import Retry from 'providers/ApolloProvider/Retry'
import Loading from 'providers/ApolloProvider/Loading'
import { newsListQry } from 'providers/ApolloProvider/queries'
import { Query } from 'react-apollo'
import { event } from 'helpers/analytics'
import PropTypes from 'prop-types'

class NewsList extends React.Component {
  static propTypes = {
    openWebView: PropTypes.func.isRequired,
  }

  onClickNews = async news => {
    try {
      alert(news.externalUrl)
      if (news.externalUrl && news.externalUrl.trim() !== '') {
        this.props.openWebView(news.externalUrl)
        event('click_news', news.externalUrl)
      }
    } catch (error) {
      alert(error)
      this.setState({ currentNews: '' })
    }
  }

  renderNews() {
    return (
      <Query query={newsListQry} notifyOnNetworkStatusChange>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Loading />
          if (error) {
            return <Retry callback={refetch} />
          }

          return data.newsList.map(news => (
            <View key={news._id}>
              <NewsListItem data={news} onClickNews={this.onClickNews} />
            </View>
          ))
        }}
      </Query>
    )
  }

  render() {
    return <View>{this.renderNews()}</View>
  }
}

// Redux
const mapDispatchToProps = dispatch => {
  return {
    openWebView: url => {
      dispatch(openWebView(url))
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewsList)
