import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'simple-react-form'
import { View, Text } from 'react-native'
import Toggle from 'components/fields/Toggle'
import styles from './styles'
import { Permissions, Notifications } from 'expo';

export default class Notifications extends React.Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    active: PropTypes.bool,
  }


  static PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

  async registerForPushNotificationsAsync () {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        user: {
          username: 'Brent',
        },
      }),
    });
  }

  render () {
    if (this.props.active) {
      return (
        <View style={styles.container}>
          <Field fieldName='profile.notifications.absence' type={Toggle} label='Ausencia escolar' />
        </View>
      )
    }
    return null
  }
}
