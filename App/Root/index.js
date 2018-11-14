import React from 'react'
import PropTypes from 'prop-types'
import {ApolloProvider} from 'react-apollo'
import {client, recoverSession} from './client'
import {AppLoading} from 'expo'
import './decorators'
import loadData from '../loadData'

export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = {loaded: false}

  async load() {
    await recoverSession()
    await loadData()
  }

  renderLoading() {
    return (
      <AppLoading
        startAsync={this.load}
        onFinish={() => this.setState({loaded: true})}
        onError={console.warn}
      />
    )
  }

  render() {
    if (!this.state.loaded) return this.renderLoading()
    return <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
  }
}
