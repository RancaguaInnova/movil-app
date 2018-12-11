import React from 'react'
import PropTypes from 'prop-types'
import withUserId from './withUserId'
import { NavigationActions } from 'react-navigation'

export default function (ComposedComponent) {
  @withUserId
  class ForceLogin extends React.Component {
    static propTypes = {
      navigation: PropTypes.object,
      userId: PropTypes.string
    }

    awaitLogin () {
      this.props.navigation.navigate(
        'Auth',
        {},
        NavigationActions.navigate({ routeName: 'Login' })
      )
    }
    componentWillMount () {
      if (!this.props.userId) return this.awaitLogin()
    }

    render () {
      return <ComposedComponent {...this.props} />
    }
  }

  return ForceLogin
}
