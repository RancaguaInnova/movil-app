import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'simple-react-form'
import { View, Text } from 'react-native'
import Toggle from 'components/fields/Toggle'
import styles from './styles'
import { Permissions, Notifications } from 'expo'

export default class Subscriptions extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    registerDevice: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.registerForPushNotificationsAsync()
  }

  async registerForPushNotificationsAsync () {
    try {
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
      if (finalStatus !== 'granted') return

      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync()
      let userId = this.props.userId
      // Call the GraphQL API to save the users device push token.
      await this.props.registerDevice({ userId, token })
    } catch(error) {
      console.log('Error registering device token:', error)
    }
  }

  render () {
    if (this.props.active) {
      return (
        <View style={styles.container}>
          <Field fieldName='profile.subscriptions.absence' type={Toggle} label='Ausencia escolar' />
        </View>
      )
    }
    return null
  }
}
