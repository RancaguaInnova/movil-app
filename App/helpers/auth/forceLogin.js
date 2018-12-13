import React from 'react'
import PropTypes from 'prop-types'
import withUserId from './withUserId'
import { NavigationActions } from 'react-navigation'
import isLoggedIn from 'App/helpers/auth/isLoggedIn'

export default function (ComposedComponent) {
  class ForceLogin extends React.Component {
    static propTypes = {
      navigation: PropTypes.object
    }

    async componentWillMount () {
      try {
        let userIsLoggedIn = await isLoggedIn()
        if (!userIsLoggedIn) return this.awaitLogin()
      } catch (error) {
        console.log('Error on componentWillMount:', error)
      }
    }

    awaitLogin () {
      this.props.navigation.navigate(
        'Auth',
        {},
        NavigationActions.navigate({ routeName: 'Login' })
      )
    }

    render () {
      return <ComposedComponent {...this.props} />
    }
  }

  return ForceLogin
}
