import React from 'react'
import SessionContext from 'App/helpers/auth/SessionContext'

export default function(ComposedComponent) {
  class WithSession extends React.Component {
    render() {
      return (
        <SessionContext.Consumer>
          {session => <ComposedComponent {...this.props} session={session} />}
        </SessionContext.Consumer>
      )
    }
  }

  return WithSession
}
