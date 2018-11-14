import React from 'react'
import PropTypes from 'prop-types'
import withUserId from './withUserId'

export default function(ComposedComponent) {
  @withUserId
  class ForceLogin extends React.Component {
    static propTypes = {
      history: PropTypes.object,
      userId: PropTypes.string
    }

    awaitLogin() {
      return null
    }

    render() {
      if (!this.props.userId) return this.awaitLogin()
      return <ComposedComponent {...this.props} />
    }
  }

  return ForceLogin
}
