import React from 'react'
import PropTypes from 'prop-types'
import withUserId from './withUserId'
import { withNavigation, NavigationActions } from 'react-navigation'

export default function (ComposedComponent) {
  @withUserId
  @withNavigation
  class ForceRegistration extends React.Component {
    static propTypes = {
      navigation: PropTypes.object,
      userId: PropTypes.string
    }

    redirect () {
      this.props.navigation.navigate(
        'Auth',
        {},
        NavigationActions.navigate({
          routeName: 'Register'
        })
      )
      return null
    }

    render () {
      if (!this.props.userId) return this.redirect()
      return <ComposedComponent {...this.props} />
    }
  }

  return ForceRegistration
}
