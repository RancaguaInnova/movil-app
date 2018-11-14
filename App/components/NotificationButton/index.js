import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default class NotificationButton extends React.Component {
  render() {
    return <Ionicons name='ios-notifications-outline' style={{ paddingRight: 10 }} size={25} />
  }
}
