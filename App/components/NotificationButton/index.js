import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default class NotificationButton extends React.Component {
  static defaultProps = {
    color: 'white',
  }

  render() {
    return (
      <Ionicons
        name='ios-notifications-outline'
        style={{ paddingRight: 10, color: this.props.color }}
        size={25}
      />
    )
  }
}
