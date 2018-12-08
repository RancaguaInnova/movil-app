import React from 'react'
import PropTypes from 'prop-types'
import withUserId from './withUserId'

export default function (ComposedComponent) {
  @withUserId
  class ForceRegistration extends React.Component {
    static propTypes = {
      navigation: PropTypes.object,
      userId: PropTypes.string
    }

    redirect () {
      this.props.navigation.navigate('Registration')
    }

    render () {
      if (!this.props.userId) return this.redirect()
      return <ComposedComponent {...this.props} />
    }
  }

  return ForceRegistration
}
