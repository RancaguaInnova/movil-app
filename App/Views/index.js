import React from 'react'
import PropTypes from 'prop-types'
import Routes from './Routes'
import { Permissions, Notifications } from 'expo'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import { View } from 'react-native'

@withGraphQL(gql`
  query {
    me {
      _id
    }
  }
`)
export default class App extends React.Component {
  static propTypes = {
    me: PropTypes.object
  }

  state = {
    notification: ''
  }

  static componentDidMount(props, state) {
    const { me } = props
    if (!me && props.me) {
      this.registerDevice()
    }
    if (me && !props.me) {
      this.remove()
    }
    if (me && props.me) {
      Notifications.addListener(this.handleNotification)
    }
  }

  handleNotification = notification => {
    this.setState({ notification: notification })
    const badgeNumber = Notifications.getBadgeNumberAsync() || 0
    Notifications.setBadgeNumberAsync(badgeNumber + 1)
  }

  async remove() {
    // Delete pushToken when user logout
    const { pushToken } = this.state
    if (!pushToken) return
    try {
      this.props.removeDevice({ pushToken })
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({ pushToken: null })
    }
  }

  async registerDevice() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return
    }
    // Get the token that uniquely identifies this device in login
    let pushToken = await Notifications.getExpoPushTokenAsync()
    if (pushToken) {
      this.setState({ pushToken })
      try {
        this.props.registerDevice({ pushToken })
      } catch (e) {
        console.log(e)
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 0 }}>
        <Routes />
      </View>
    )
  }
}
