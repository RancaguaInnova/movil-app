import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from 'react-apollo'
import {
  client,
  recoverSession,
  resetIntroVisualization,
  recoverIntroVisualization,
} from './client'
import { AppLoading } from 'expo'
import './decorators'
import loadData from '../loadData'

export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  state = { loaded: false }

  async load() {
    try {
      await recoverSession()
      await loadData()
      await recoverIntroVisualization()
      //await resetIntroVisualization()
    } catch (error) {
      console.log('[load]:', error)
    }
  }

  renderLoading() {
    return (
      <AppLoading
        startAsync={this.load}
        onFinish={() => this.setState({ loaded: true })}
        onError={console.warn}
      />
    )
  }

  render() {
    if (!this.state.loaded) return this.renderLoading()
    return <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
  }
}
