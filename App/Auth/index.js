import React from 'react'
import PropTypes from 'prop-types'
import Login from './Main'
import {client, getSession} from 'App/Root/client'
import autobind from 'autobind-decorator'
import SessionContext from 'App/helpers/auth/SessionContext'

export default class Auth extends React.Component {
  static propTypes = {
    app: PropTypes.any
  }

  constructor(props) {
    super(props)
    const session = getSession() || {}
    this.state = {session}
    this.initialUserId = session.userId
  }

  componentDidMount() {
    client.onResetStore(this.onResetStore)
  }

  @autobind
  onResetStore() {
    try {
      const session = getSession() || {}
      this.setState({session})
    } catch (error) {
      console.log('Error getting user session:', error)
    }
  }

  render() {
    const App = this.props.app
    return (
      <SessionContext.Provider value={this.state.session}>
        {this.state.session.userId
          ? <App key={this.state.session.publicKey || 'loggedout'} />
          : <Login />
        }
      </SessionContext.Provider>
    )
  }
}
