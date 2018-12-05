import React from 'react'
import PropTypes from 'prop-types'
import Login from './Main'
import {
  client,
  getSession,
  getIntroVisualization,
  setIntroVisualization,
  resetIntroVisualization,
} from 'App/Root/client'
import autobind from 'autobind-decorator'
import SessionContext from 'App/helpers/auth/SessionContext'
import Intro from 'App/Views/Intro'

export default class Auth extends React.Component {
  static propTypes = {
    app: PropTypes.any,
  }

  constructor(props) {
    super(props)
    const session = getSession() || {}
    const introVisualization = getIntroVisualization() || false
    this.state = { session, introVisualization }
    this.initialUserId = session.userId
    this.skipIntro = this.skipIntro.bind(this)
  }

  componentDidMount() {
    client.onResetStore(this.onResetStore)
  }

  @autobind
  onResetStore() {
    try {
      const session = getSession() || {}
      const introVisualization = session.user.userId
        ? getIntroVisualization()
        : resetIntroVisualization()
      this.setState({ session, introVisualization })
    } catch (error) {
      console.log('Error getting user session:', error)
    }
  }

  publicKey() {
    return this.state.session.userId ? this.state.session.publicKey : 'public'
  }

  async skipIntro() {
    try {
      await setIntroVisualization('false')
      const introVisualization = await getIntroVisualization()
      this.setState({ introVisualization })
    } catch (error) {
      console.log('[skipIntro]:', error)
    }
  }

  render() {
    const App = this.props.app
    return (
      <SessionContext.Provider value={this.state.session}>
        {this.state.introVisualization ? (
          <App key={this.publicKey} />
        ) : (
          <Intro skip={this.skipIntro} />
        )}
      </SessionContext.Provider>
    )
  }
}
